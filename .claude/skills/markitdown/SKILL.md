---
name: markitdown
description: Convert documents to Markdown with Microsoft's markitdown CLI before reading them — PDF, DOCX, XLSX/XLS, PPTX, HTML, CSV/JSON/XML, EPUB, ZIP, images (EXIF), audio (transcript), Outlook .msg, YouTube URLs. Use when you need the text/tables of an Office or PDF file, especially large or scanned-free PDFs, spreadsheets, or slide decks, instead of reading the binary directly.
---

# markitdown

CLI installed globally via pipx (`markitdown 0.1.9`, extras `[all]`).

## Usage

```bash
markitdown "path/to/file.pdf"                 # print Markdown to stdout
markitdown "file.xlsx" -o "$SCRATCH/file.md"  # write to file (preferred for large docs)
cat file.docx | markitdown -x docx            # stdin needs extension hint
```

## Rules

- Large output: write to scratchpad with `-o`, then `grep`/`sed -n` the parts needed. Don't dump whole big docs into context.
- Spreadsheets: each sheet becomes a Markdown table under `## SheetName`.
- Scanned PDFs (image-only) return little/no text — markitdown has no OCR by default; use the `pdf` skill OCR path instead.
- Quote paths: many user folders contain spaces.
- Update: `pipx upgrade markitdown`.
