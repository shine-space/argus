import http.client
import sys
import threading
import unittest
from pathlib import Path
from http.server import ThreadingHTTPServer

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.runtime' / 'perf-tools'))
import brotli
import gzip
import serve


class ServingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), serve.Handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def request(self, path, headers=None, method='GET'):
        connection = http.client.HTTPConnection('127.0.0.1', self.server.server_port)
        connection.request(method, path, headers=headers or {})
        response = connection.getresponse()
        result = response.status, dict(response.getheaders()), response.read()
        connection.close()
        return result

    def test_encodings_and_revalidation(self):
        original = (serve.SITE / 'process/search-index.json').read_bytes()
        for accepted, expected in [('br, gzip', 'br'), ('br;q=0, gzip', 'gzip'), ('br;q=0,gzip;q=0', None), ('br;q=.5,gzip;q=1', 'gzip')]:
            with self.subTest(accepted=accepted):
                status, headers, body = self.request('/process/search-index.json', {'Accept-Encoding': accepted})
                self.assertEqual(status, 200)
                self.assertEqual(headers.get('Content-Encoding'), expected)
                decoded = brotli.decompress(body) if expected == 'br' else gzip.decompress(body) if expected == 'gzip' else body
                self.assertEqual(decoded, original)
                status, _, body = self.request('/process/search-index.json', {'Accept-Encoding': accepted, 'If-None-Match': headers['ETag']})
                self.assertEqual((status, body), (304, b''))

    def test_ranges_and_head(self):
        original = (serve.SITE / 'process/search-index.json').read_bytes()
        for value, expected in [('bytes=10-29', original[10:30]), ('bytes=-10', original[-10:])]:
            status, headers, body = self.request('/process/search-index.json', {'Accept-Encoding': 'br,gzip', 'Range': value})
            self.assertEqual(status, 206)
            self.assertNotIn('Content-Encoding', headers)
            self.assertEqual(body, expected)
        status, headers, body = self.request('/process/search-index.json', {'Accept-Encoding': 'br'}, 'HEAD')
        self.assertEqual((status, body), (200, b''))
        self.assertEqual(headers['Content-Encoding'], 'br')
        self.assertGreater(int(headers['Content-Length']), 0)

    def test_stale_compression_and_cache_policy(self):
        key = 'process/search-index.json'
        saved = serve.PRECOMPRESSION_INDEX[key]
        try:
            serve.PRECOMPRESSION_INDEX[key] = {**saved, 'mtime_ns': '0'}
            _, headers, body = self.request('/' + key, {'Accept-Encoding': 'br'})
            self.assertNotIn('Content-Encoding', headers)
            self.assertEqual(len(body), saved['size'])
        finally:
            serve.PRECOMPRESSION_INDEX[key] = saved
        chunk = next((serve.SITE / 'process/_next/static').rglob('*.js')).relative_to(serve.SITE).as_posix()
        _, headers, _ = self.request('/' + chunk)
        self.assertIn('immutable', headers['Cache-Control'])
        _, headers, _ = self.request('/process/')
        self.assertEqual(headers['Cache-Control'], 'no-cache')


if __name__ == '__main__':
    unittest.main()
