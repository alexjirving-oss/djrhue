"""Compress public/photos JPEGs toward a target size (default 200 KB)."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PHOTOS_DIR = ROOT / "public" / "photos"
TARGET_KB = 200
MAX_SIDE = 1800
MIN_QUALITY = 50


def compress_file(path: Path) -> None:
    size_kb = path.stat().st_size / 1024
    if size_kb <= TARGET_KB:
        print(f"skip {path.name} ({size_kb:.1f} KB)")
        return

    im = Image.open(path)
    if path.suffix.lower() == ".png":
        im = im.convert("RGBA")
    else:
        im = im.convert("RGB")

    w, h = im.size
    max_side = MAX_SIDE
    quality = 82
    final_kb = size_kb

    for attempt in range(4):
        scale = min(1.0, max_side / max(w, h))
        resized = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS) if scale < 1 else im

        tmp = path.with_suffix(path.suffix + ".tmp")
        for quality in range(85, MIN_QUALITY - 1, -2):
            if resized.mode == "RGBA":
                bg = Image.new("RGB", resized.size, (13, 13, 13))
                bg.paste(resized, mask=resized.split()[-1])
                save_im = bg
            else:
                save_im = resized
            save_im.save(tmp, "JPEG", quality=quality, optimize=True, progressive=True)
            final_kb = tmp.stat().st_size / 1024
            if final_kb <= TARGET_KB:
                break

        if final_kb <= TARGET_KB:
            break
        max_side = int(max_side * 0.88)

    if path.suffix.lower() != ".jpg":
        final_path = path.with_suffix(".jpg")
        if final_path != path:
            path.unlink(missing_ok=True)
            path = final_path
    tmp.replace(path)
    print(f"{path.name}: {size_kb:.1f} -> {final_kb:.1f} KB (q={quality}, side={max_side})")


def main() -> None:
    for path in sorted(PHOTOS_DIR.glob("*")):
        if path.suffix.lower() in {".jpg", ".jpeg", ".png"} and not path.name.endswith(".tmp"):
            compress_file(path)
    print("done")


if __name__ == "__main__":
    main()
