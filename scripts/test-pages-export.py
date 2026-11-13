import unittest
from urllib.parse import urlsplit
from export_pages import PagesExport


class ExportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.exporter = PagesExport()

    def test_root_paths_and_delimiters(self):
        text = '<a href="/">Home</a><img src="/brand/logo.svg"><script>path.split("/").join("/");let a={href:"/"}</script>'
        result = self.exporter.rewrite(text)
        self.assertIn('href="/argus/"', result)
        self.assertIn('src="/argus/brand/logo.svg"', result)
        self.assertIn('split("/").join("/")', result)
        self.assertIn('href:"/argus/"', result)

    def test_query_assets_and_relative_imports(self):
        url = next(url for url, _, _ in self.exporter.assets if urlsplit(url).query)
        self.assertEqual(self.exporter.rewrite(url), self.exporter.mapping[url])
        module = next(url for url, _, _ in self.exporter.assets if url.endswith('/react.iNMCLRE-.mjs'))
        result = self.exporter.rewrite('import "./react.iNMCLRE-.mjs";', module.replace('react.iNMCLRE-.mjs', 'entry.mjs'))
        self.assertIn(self.exporter.mapping[module], result)

    def test_local_origin_and_rewrite_idempotence(self):
        text = 'http://127.0.0.1:4175/services /process/skills-tools/ /opening-loader.js?v=2'
        result = self.exporter.rewrite(text)
        self.assertIn('https://shine-space.github.io/argus/services', result)
        self.assertIn('/argus/process/skills-tools/', result)
        self.assertEqual(result, self.exporter.rewrite(result))
        self.assertEqual(self.exporter.rewrite('http://localhost:8888/api/v1'), 'http://localhost:8888/api/v1')

    def test_route_regex_remains_valid(self):
        text = r'if (!/^\/services\/?$/.test(location.pathname)) return;'
        self.assertEqual(self.exporter.rewrite(text), r'if (!/^\/argus\/services\/?$/.test(location.pathname)) return;')

    def test_home_mount_guards_use_the_published_root(self):
        text = "if(location.pathname!=='/')return;const home=location.pathname === '/' || location.pathname === '/index.html';path.split('/');"
        result = self.exporter.rewrite(text)
        self.assertIn("if(location.pathname!=='/argus/')return;", result)
        self.assertIn("location.pathname === '/argus/'", result)
        self.assertIn("location.pathname === '/argus/index.html'", result)
        self.assertIn("path.split('/')", result)
        self.assertEqual(result, self.exporter.rewrite(result))


if __name__ == '__main__':
    unittest.main()
