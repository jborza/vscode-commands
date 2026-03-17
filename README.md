# markdown-title README

This adds an action that converts a text to a markdown filename.

## build
 To build and install the extension:

  1. Build it:
  npm run compile

  2. Package it:
  npm install -g vsce
  vsce package

  3. Install the generated .vsix file:
  code --install-extension transform-text-to-filename-0.0.1.vsix

  Alternatively, you can install it directly from VS Code:
  1. Press Ctrl+Shift+P
  2. Run "Extensions: Install from VSIX..."
  3. Select the .vsix file