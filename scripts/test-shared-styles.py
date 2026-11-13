import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import external_styles


class SharedStyleExportTests(unittest.TestCase):
    def test_existing_shared_file_is_preserved(self):
        base = (external_styles.SITE / 'styles/shared/component-base.css').read_text(encoding='utf-8')
        css = base + '\n.example{width:100%}'
        with tempfile.TemporaryDirectory() as temporary:
            site = Path(temporary)
            (site / 'styles/shared').mkdir(parents=True)
            (site / 'styles/shared/component-base.css').write_text(base, encoding='utf-8')
            with patch.object(external_styles, 'SITE', site):
                href = external_styles.write_css(css)
                target = site / href.lstrip('/')
                shared = '@import url("/styles/shared/component-base.css?v=shared-1");\n.example{width:100%}'
                target.write_text(shared, encoding='utf-8')
                self.assertEqual(external_styles.write_css(css), href)
                self.assertEqual(target.read_text(encoding='utf-8'), shared)
                target.write_text(shared.replace('width:100%', 'width:50%'), encoding='utf-8')
                with self.assertRaises(ValueError):
                    external_styles.write_css(css)


if __name__ == '__main__':
    unittest.main()
