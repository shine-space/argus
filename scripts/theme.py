"""Recolor the deployed accent without changing original cached resources."""
import re

ACCENT = '#F36A4B'
GREEN_ACCENTS = re.compile(r'#(?:19d98b|2fbf71|58d68d)\b', re.I)

def apply_theme(text):
    text = GREEN_ACCENTS.sub(ACCENT, text)
    for rgb in ((25,217,139),(47,191,113),(88,214,141)):
        pattern=r'(?<!\d)'+r'\s*,\s*'.join(map(str,rgb))+r'(?!\d)'
        text=re.sub(pattern,'243,106,75',text)
    return text
