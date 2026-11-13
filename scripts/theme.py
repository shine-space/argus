"""Recolor the deployed accent without changing original cached resources."""
import re

ACCENT = '#F36A4B'
GREEN_ACCENTS = re.compile(r'#(?:19d98b|2fbf71|58d68d)\b', re.I)
PANEL_CHANNELS = (13, 27, 22)
PANEL_COLOR = '#222222'
PANEL_HEX = re.compile('#' + ''.join(f'{value:02x}' for value in PANEL_CHANNELS) + r'([a-f0-9]{2})?(?![a-f0-9])', re.I)
PANEL_RGB = re.compile(r'(\brgba?\(\s*)13(\s*,\s*|\s+)27(\s*,\s*|\s+)22(?=\s*[,/)])', re.I)

def apply_theme(text):
    text = GREEN_ACCENTS.sub(ACCENT, text)
    text = PANEL_HEX.sub(lambda match: PANEL_COLOR + (match[1] or ''), text)
    text = PANEL_RGB.sub(lambda match: match[1] + '34' + match[2] + '34' + match[3] + '34', text)
    for rgb in ((25,217,139),(47,191,113),(88,214,141)):
        pattern=r'(?<!\d)'+r'\s*,\s*'.join(map(str,rgb))+r'(?!\d)'
        text=re.sub(pattern,'243,106,75',text)
    return text
