from PIL import Image, ImageOps
import os

src_root = r"C:\Users\Alex\Projects\djrhue\media-pack"
out = r"C:\Users\Alex\Projects\djrhue\public\photos"
os.makedirs(out, exist_ok=True)


def save_web(src, dest, max_side=2400, quality=84):
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
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
    print(f"{os.path.basename(dest):28} {im.size[0]:4}x{im.size[1]:<4} {os.path.getsize(dest)//1024}kb")


# Fix mirrored press-side by flipping horizontal after inspect? Skip unless confirmed.
# Re-export everything with correct EXIF transpose.

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
    save_web(os.path.join(src_root, "4. PERFORMANCE PHOTOS", s), os.path.join(out, d), 2400, 84)

press = [
    ("1_DJ_RHUE_HEADPHONES.png", "press-headphones-1.jpg"),
    ("2_DJ_RHUE_GUN.png", "press-gun.jpg"),
    ("3_DJ_RHUE_SIDE.png", "press-side.jpg"),
    ("4_DJ_RHUE_HEADPHONES.png", "press-headphones-2.jpg"),
    ("5_DJ_RHUE_FULL.png", "press-full.jpg"),
]
for s, d in press:
    save_web(os.path.join(src_root, "5. PRESS PHOTOS", s), os.path.join(out, d), 2000, 82)

# Flip press-side if mirrored J
side = Image.open(os.path.join(out, "press-side.jpg"))
side = side.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
side.save(os.path.join(out, "press-side.jpg"), "JPEG", quality=82, optimize=True)
print("flipped press-side.jpg")

print("done")
