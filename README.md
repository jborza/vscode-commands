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
```

### Build if vsce is installed:

```bash
npm run compile
vsce package 
```

### One-command packaging (recommended)

You can build and package the extension with a single npm script. First install `vsce` as a dev dependency so `npx` can use the local binary:

```bash
npm install --save-dev vsce
```

Then run the combined script (already provided in `package.json`):

```bash
npm run package:vsix
```

This runs the TypeScript compile step and then `npx vsce package`, producing a `.vsix` file in the workspace root.

### Alternatively, install from VS Code:

1. Press Ctrl+Shift+P
2. Run "Extensions: Install from VSIX..."
3. Select the generated `.vsix` file

## Important

- After editing `package.json` (for example adding `activationEvents`) or rebuilding the extension, reload or restart VS Code so the updated activation information is picked up. Use `Developer: Reload Window` from the Command Palette or fully restart the application.
