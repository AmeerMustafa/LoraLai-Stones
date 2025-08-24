import os
import sys
import re
from pathlib import Path

try:
    import fitz  # PyMuPDF
except Exception as exc:
    print("ERROR: PyMuPDF (pymupdf) is not installed. Install with: python -m pip install pymupdf", file=sys.stderr)
    raise


def slugify(value: str) -> str:
    value = re.sub(r"[\s\-]+", "_", value.strip())
    value = re.sub(r"[^A-Za-z0-9_]+", "", value)
    value = re.sub(r"_+", "_", value)
    return value.strip("_")


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def extract_images_from_pdf(pdf_path: Path, out_dir: Path) -> list[Path]:
    extracted: list[Path] = []
    base = slugify(pdf_path.stem)
    doc = fitz.open(pdf_path.as_posix())
    try:
        for page_index in range(len(doc)):
            page = doc[page_index]
            images = page.get_images(full=True)

            # Extract embedded images
            for img_index, img in enumerate(images, start=1):
                xref = img[0]
                image_info = doc.extract_image(xref)
                image_bytes = image_info.get("image")
                ext = image_info.get("ext", "png")
                filename = f"{base}_p{page_index+1}_{img_index}.{ext}"
                filepath = out_dir / filename
                with open(filepath, "wb") as f:
                    f.write(image_bytes)
                extracted.append(filepath)

            # If no embedded images on this page, fall back to rendering the full page
            if not images:
                pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
                filename = f"{base}_p{page_index+1}_page.jpg"
                filepath = out_dir / filename
                pix.save(filepath.as_posix())
                extracted.append(filepath)
    finally:
        doc.close()

    return extracted


def main(argv: list[str]) -> int:
    # Defaults
    default_inputs = [
        Path("assets") / "Loralai Stones Brochure'24.pdf",
        Path("assets") / "CamScanner 18-08-2025 19.19.pdf",
    ]
    output_dir = Path("assets") / "extracted"

    # Parse args (very simple)
    inputs: list[Path] = []
    i = 0
    while i < len(argv):
        arg = argv[i]
        if arg in ("-o", "--out"):
            i += 1
            output_dir = Path(argv[i])
        else:
            inputs.append(Path(arg))
        i += 1

    if not inputs:
        inputs = default_inputs

    ensure_dir(output_dir)

    all_extracted: list[Path] = []
    for pdf in inputs:
        if not pdf.exists():
            print(f"WARN: Missing PDF: {pdf}")
            continue
        try:
            print(f"Extracting from: {pdf}")
            files = extract_images_from_pdf(pdf, output_dir)
            all_extracted.extend(files)
        except Exception as exc:
            print(f"ERROR extracting {pdf}: {exc}")

    if not all_extracted:
        print("No images extracted.")
    else:
        print("Extracted files:")
        for p in all_extracted:
            print(p.as_posix())

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))



