# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VS Code extension that provides text transformation commands for markdown editing:
- `markdown-title.textToFilename` (Ctrl+Shift+T / Cmd+Shift+T): Converts selected text to a slug format suitable for filenames (lowercase, removes accents, replaces non-alphanumeric chars with dashes)
- `markdown-title.toList` (Ctrl+Shift+L / Cmd+Shift+L): Converts selected text to a markdown unordered list (adds `- ` prefix to each non-empty line)

## Commands

### Development
- `npm run compile` - Compile TypeScript to `./out/` directory
- `npm run watch` - Compile TypeScript in watch mode
- `npm run lint` - Run ESLint on `src/`
- `npm run test` - Run tests (compiles first via pretest hook)

### Building and Installing
- `npm install -g vsce` - Install VS Code Extension Manager globally
- `vsce package` - Package extension as `.vsix` file
- `code --install-extension transform-text-to-filename-0.0.1.vsix` - Install the packaged extension

### Debugging
- Use the "Run Extension" configuration in `.vscode/launch.json` (F5 in VS Code)
- This compiles the extension and launches a new VS Code window with the extension loaded

## Architecture

The extension follows VS Code's standard activation model:
- `src/extension.ts` contains all extension code
- `activate(context)` registers commands and pushes them to `context.subscriptions`
- Two command handlers: `textToTitle` and `toList`
- Both follow the same pattern: get active editor, get selection, apply transformation, replace selection text
- `transformTextToTitle()`: Uses Unicode normalization (NFD) to strip accents from text before slugifying
- `transformToList()`: Splits by newlines, trims leading whitespace, filters empty lines, prepends `- `

## TypeScript Configuration

- Module: Node16, Target: ES2022
- Output: `out/` directory
- Strict mode enabled
