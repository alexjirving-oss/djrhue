from PIL import Image, ImageOps
import os

base = r"C:\Users\Alex\Projects\djrhue\public\photos"
for f in sorted(os.listdir(base)):
    if not f.lower().endswith((".jpg", ".jpeg", ".png")):
        continue
    p = os.path.join(base, f)
    im = Image.open(p)
    exif = im.getexif()
    orient = exif.get(274) if exif else None
    print(f"{f:28} {im.size[0]:4}x{im.size[1]:<4} orient={orient}")

src = r"C:\Users\Alex\Projects\djrhue\media-pack\4. PERFORMANCE PHOTOS\2DJ_RHUE_X_DJ_BUNJY.JPG"
im = Image.open(src)
print("source bunjy", im.size, "orient", im.getexif().get(274) if im.getexif() else None)
transposed = ImageOps.exif_transpose(im)
print("transposed bunjy", transposed.size)
