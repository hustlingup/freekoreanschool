"""Convert generated originals to WebP and create review sheets; never overwrite originals."""
import argparse, json
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DIR = ROOT / 'docs/learning-visuals'
parser = argparse.ArgumentParser()
parser.add_argument('--review', action='store_true')
args = parser.parse_args()
manifest = json.loads((DIR / 'manifest.json').read_text(encoding='utf-8'))
sources = json.loads((DIR / 'generated-sources.json').read_text(encoding='utf-8'))
by_id = {a['id']: a for a in manifest['assets']}
for source in sources:
    asset = by_id[source['id']]
    if not source.get('source'):
        continue
    target = ROOT / asset['path']
    if not target.exists():
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source['source']) as original:
            im = ImageOps.exif_transpose(original).convert('RGB')
            im.thumbnail((960, 720), Image.Resampling.LANCZOS)
            im.save(target, 'WEBP', quality=86, method=6)
    with Image.open(target) as image:
        asset.update(width=image.width, height=image.height, bytes=target.stat().st_size)
    asset['source'] = source['source']
    if asset['status'] == 'planned': asset['status'] = 'generated'
(DIR / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
ready = [a for a in manifest['assets'] if (ROOT/a['path']).exists()]
if args.review:
    font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 15)
    for offset in range(0, len(ready), 20):
        batch = ready[offset:offset+20]
        sheet = Image.new('RGB', (1440, 5*245), '#ece9e1')
        draw = ImageDraw.Draw(sheet)
        for index, a in enumerate(batch):
            x,y = (index%4)*360,(index//4)*245
            with Image.open(ROOT/a['path']) as image:
                thumb = ImageOps.contain(image, (352, 210))
                sheet.paste(thumb, (x+(360-thumb.width)//2, y))
            draw.text((x+5,y+213), a['id'], fill='#222222', font=font)
        sheet.save(DIR / f'review-{offset//20+1:02d}.jpg', quality=90)
print(json.dumps({'converted':len(ready),'total':len(manifest['assets'])}))
