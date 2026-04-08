# markdown-title README

This VS Code extension provides small text transformation commands for Markdown editing:

- `markdown-title.textToFilename` (Ctrl+Shift+T / Cmd+Shift+T): Converts selected text to a slug suitable for filenames — lowercases, strips accents, and replaces non-alphanumeric characters with dashes.
- `markdown-title.toList` (Ctrl+Shift+L / Cmd+Shift+L): Converts selected text into a Markdown unordered list by trimming lines, filtering empty lines, and prefixing each with `- `.
- `markdown-title.toCommaList` (Ctrl+Shift+K / Cmd+Shift+K): Converts selected text into a comma-separated list by trimming lines, filtering empty lines, and joining items with `, `.

- `markdown-title.sqlToMarkdown`: Convert SQL Management Studio tab-separated query results (TSV) into a Markdown table. Select the TSV text in the editor and run the command from the Command Palette.

## Build & Install

To build and install the extension:

1. Build it:

```bash
npm run compile
```

2. Package it:

```bash
npm install -g vsce
vsce package
```

3. Install the generated `.vsix` file:

```bash
code --install-extension vscode-transform-commands-0.0.1.vsix

## Convert SQL (TSV) results to Markdown table

Select a block of tab-separated query results (headers on the first line) and run the `Convert SQL (TSV) results to Markdown table` command.

Input example (tabs between columns):

```
	ID	Version	PersonPartyID	JsonData
	10877	0x0000000001223096	148173	{"workplace":"Praha"}
	10878	0x0000000001223097	60776	{"workplace":"Není sjednáno"}
```

Output example:

```markdown
| ID | Version | PersonPartyID | JsonData |
| --- | --- | --- | --- |
| 10877 | 0x0000000001223096 | 148173 | {"workplace":"Praha"} |
| 10878 | 0x0000000001223097 | 60776 | {"workplace":"Není sjednáno"} |
```

Key features:

- Preserves `NULL` literal values as-is
- Leaves JSON and other data values unmodified
- Handles standard tab-separated input produced by SQL Management Studio
- Pads rows with empty cells when row lengths are inconsistent

If you'd like a default keybinding for this command, tell me which shortcut you prefer.

```

### Build if vsce is installed:

```bash
npm run compile
vsce package 
```

### Alternatively, install from VS Code:

1. Press Ctrl+Shift+P
2. Run "Extensions: Install from VSIX..."
3. Select the generated `.vsix` file
