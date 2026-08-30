"""Build lightweight, text-free artwork for the Listen mix cards."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PHOTO_DIR = ROOT / "public" / "photos"
OUTPUT_DIR = ROOT / "public" / "listen"
MAX_SIDE = 1500

# Afrobeats trims the small promotional mark from the source. The other
# controlled photographs contain no baked title or genre typography.
ARTWORKS: dict[str, tuple[str, tuple[int, int, int, int] | None]] = {
    "afrobeats": ("perf-trinidad.jpg", (0, 0, 1536, 1500)),
    "dancehall": ("perf-cdj.jpg", None),
    "amapiano": ("perf-manoel.jpg", None),
    "reggae": ("perf-bunjy.jpg", None),
    "hiphop": ("perf-white-close.jpg", None),
}


def build_artwork(slug: str, source_name: str, crop: tuple[int, int, int, int] | None) -> None:
    source = PHOTO_DIR / source_name
    destination = OUTPUT_DIR / f"{slug}.webp"

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if crop is not None:
            image = image.crop(crop)
        image.thumbnail((MAX_SIDE, MAX_SIDE), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=78, method=6)

    size_kb = destination.stat().st_size / 1024
    print(f"{destination.relative_to(ROOT)}: {image.width}x{image.height}, {size_kb:.1f} KB")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug, (source_name, crop) in ARTWORKS.items():
        build_artwork(slug, source_name, crop)


if __name__ == "__main__":
    main()
