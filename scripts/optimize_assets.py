import fitz
from PIL import Image
import os
import shutil

doc = fitz.open(r"C:\Users\Alex\Projects\djrhue\media-pack\6. BRAND ASSETS\DJ_RHUE_BRAND_ASSETS.pdf")
for i, p in enumerate(doc):
    print("--- page", i + 1, "---")
    print(p.get_text())

src_root = r"C:\Users\Alex\Projects\djrhue\media-pack"
out = r"C:\Users\Alex\Projects\djrhue\public"
os.makedirs(os.path.join(out, "photos"), exist_ok=True)
os.makedirs(os.path.join(out, "brand"), exist_ok=True)


def save_web(src, dest, max_side=2400, quality=85):
    im = Image.open(src)
    if src.lower().endswith(".png"):
        im = im.convert("RGBA")
    else:
        im = im.convert("RGB")
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    if dest.lower().endswith((".jpg", ".jpeg")):
        if im.mode == "RGBA":
            bg = Image.new("RGB", im.size, (0, 0, 0))
            bg.paste(im, mask=im.split()[-1])
            im = bg
        im.save(dest, "JPEG", quality=quality, optimize=True)
    else:
        im.save(dest, "PNG", optimize=True)
    print(dest, im.size, os.path.getsize(dest))


shutil.copy(
    os.path.join(src_root, "3. LOGOS", "DJ RHUE Logo - Transparent.PNG"),
    os.path.join(out, "brand", "logo.png"),
)
shutil.copy(
    os.path.join(src_root, "3. LOGOS", "DJ RHUE Signature - Transparent.PNG"),
    os.path.join(out, "brand", "signature.png"),
)
shutil.copy(
    os.path.join(src_root, "6. BRAND ASSETS", "DJ RHUE LINK TREE QR.png"),
    os.path.join(out, "brand", "qr.png"),
)

perf = [
    ("1DJ_RHUE_BLACK_GOLD.JPG", "hero-black-gold.jpg"),
    ("2DJ_RHUE_X_DJ_BUNJY.JPG", "perf-bunjy.jpg"),
    ("3DJ_RHUE_CDJ-3000.JPG", "perf-cdj.jpg"),
    ("4DJ_RHUE_WHITE_SHIRT.JPG", "perf-white.jpg"),
    ("5DJ_RHUE_X_ENZO.PNG", "perf-enzo.jpg"),
    ("6DJ_RHUE_MALTA.PNG", "perf-malta.jpg"),
    ("7DJ_RHUE_WHITE_SHIRT_CLOSE_UP.JPG", "perf-white-close.jpg"),
    ("8DJ_RHUE_TRINIDAD_FLAG.PNG", "perf-trinidad.jpg"),
    ("9DJ_RHUE_MANOEL_ISLAND.PNG", "perf-manoel.jpg"),
]
for s, d in perf:
    save_web(
        os.path.join(src_root, "4. PERFORMANCE PHOTOS", s),
        os.path.join(out, "photos", d),
        2200,
        82,
    )

press = [
    ("1_DJ_RHUE_HEADPHONES.png", "press-headphones-1.jpg"),
    ("2_DJ_RHUE_GUN.png", "press-gun.jpg"),
    ("3_DJ_RHUE_SIDE.png", "press-side.jpg"),
    ("4_DJ_RHUE_HEADPHONES.png", "press-headphones-2.jpg"),
    ("5_DJ_RHUE_FULL.png", "press-full.jpg"),
]
for s, d in press:
    save_web(
        os.path.join(src_root, "5. PRESS PHOTOS", s),
        os.path.join(out, "photos", d),
        1800,
        80,
    )

print("done")
