# markdown-title README

This VS Code extension provides small text transformation commands for Markdown editing:

- `markdown-title.textToFilename` (Ctrl+Shift+T / Cmd+Shift+T): Converts selected text to a slug suitable for filenames — lowercases, strips accents, and replaces non-alphanumeric characters with dashes.
- `markdown-title.toList` (Ctrl+Shift+L / Cmd+Shift+L): Converts selected text into a Markdown unordered list by trimming lines, filtering empty lines, and prefixing each with `- `.
- `markdown-title.toCommaList` (Ctrl+Shift+K / Cmd+Shift+K): Converts selected text into a comma-separated list by trimming lines, filtering empty lines, and joining items with `, `.

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
    code --install-extension transform-text-to-filename-0.0.1.vsix
    ```

Alternatively, install from VS Code:
1. Press Ctrl+Shift+P
2. Run "Extensions: Install from VSIX..."
3. Select the generated `.vsix` file