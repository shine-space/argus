"""Remove retired platform introduction and metric blocks."""
from html.parser import HTMLParser


def remove_retired_sections(source):
    class Regions(HTMLParser):
        def __init__(self):
            super().__init__(convert_charrefs=False)
            self.depth = 0
            self.start = None
            self.ranges = []
            self.lines = source.splitlines(keepends=True)
        def position(self):
            line, column = self.getpos()
            return sum(map(len, self.lines[:line - 1])) + column
        def handle_starttag(self, tag, attrs):
            attrs = dict(attrs)
            void = tag in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr')
            if self.start is not None:
                if not void: self.depth += 1
            elif attrs.get('id') == 'platform' or attrs.get('data-framer-name') == 'Metrics':
                self.start = self.position()
                self.depth = 1
        def handle_startendtag(self, tag, attrs):
            pass
        def handle_endtag(self, tag):
            if self.start is None: return
            self.depth -= 1
            if self.depth == 0:
                self.ranges.append((self.start, source.index('>', self.position()) + 1))
                self.start = None
    parser = Regions()
    parser.feed(source)
    assert len(parser.ranges) == 2, parser.ranges
    for start, end in reversed(parser.ranges):
        source = source[:start] + source[end:]
    return source
