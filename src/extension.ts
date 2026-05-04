// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown-title" is now active!');

	const textToTitle = vscode.commands.registerCommand('markdown-title.textToFilename', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor){
			return;
		}
		const selection = editor.selection;

		const originalText = editor.document.getText(selection);
		if(!originalText){
			vscode.window.showInformationMessage('No text selected');
			return;
		}
		const transformedText = transformTextToTitle(originalText);
		editor.edit(editBuilder => {
            editBuilder.replace(selection, transformedText);
        });
	});

	const toList = vscode.commands.registerCommand('markdown-title.toList', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor){
			return;
		}
		const selection = editor.selection;

		const originalText = editor.document.getText(selection);
		if(!originalText){
			vscode.window.showInformationMessage('No text selected');
			return;
		}
		const transformedText = transformToList(originalText);
		editor.edit(editBuilder => {
            editBuilder.replace(selection, transformedText);
        });
	});

	const toCommaList = vscode.commands.registerCommand('markdown-title.toCommaList', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor){
			return;
		}
		const selection = editor.selection;

		const originalText = editor.document.getText(selection);
		if(!originalText){
			vscode.window.showInformationMessage('No text selected');
			return;
		}
		const transformedText = transformToCommaList(originalText);
		editor.edit(editBuilder => {
            editBuilder.replace(selection, transformedText);
        });
	});

	const sqlToMarkdown = vscode.commands.registerCommand('markdown-title.sqlToMarkdown', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor){
			return;
		}
		const selection = editor.selection;

		const originalText = editor.document.getText(selection);
		if(!originalText){
			vscode.window.showInformationMessage('No text selected');
			return;
		}
		const transformedText = transformSqlToMarkdown(originalText);
		editor.edit(editBuilder => {
			editBuilder.replace(selection, transformedText);
		});
	});

	const newlinesToSpace = vscode.commands.registerCommand('markdown-title.newlinesToSpace', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor){
			return;
		}
		const selection = editor.selection;

		const originalText = editor.document.getText(selection);
		if(!originalText){
			vscode.window.showInformationMessage('No text selected');
			return;
		}
		const transformedText = transformNewlinesToSpace(originalText);
		editor.edit(editBuilder => {
			editBuilder.replace(selection, transformedText);
		});
	});

	context.subscriptions.push(textToTitle);
	context.subscriptions.push(toList);
	context.subscriptions.push(toCommaList);
	context.subscriptions.push(sqlToMarkdown);
	context.subscriptions.push(newlinesToSpace);
}


function transformTextToTitle(input: string): string {
    // 1. Trim leading/trailing whitespace
    let text = input.trim();

    // 2. Normalize to "Decomposed" form (splits accents from letters)
    // e.g., "ě" becomes "e" + "ˇ"
    text = text.normalize('NFD');

    // 3. Remove the accent marks (Unicode range for combining diacritics)
    text = text.replace(/[\u0300-\u036f]/g, '');

    // 4. Convert to lowercase
    text = text.toLowerCase();

    // 5. Replace any sequence of non-alphanumeric characters with a single dash
    // [^a-z0-9] means "anything that is NOT a-z or 0-9"
    // + means "one or more of them"
    text = text.replace(/[^a-z0-9]+/g, '-');

    return text;
}

function transformToList(input: string): string {
    // Split by lines, trim leading whitespace from each line, and add "- " prefix
    const lines = input.split('\n');
    const transformed = lines
        .map(line => line.trimLeft())  // Remove leading whitespace
        .filter(line => line.length > 0)  // Skip empty lines
        .map(line => `- ${line}`)  // Add markdown bullet
        .join('\n');
    return transformed;
}

function transformToCommaList(input: string): string {
    // Split by lines, trim whitespace, and add comma to each non-empty line
    const lines = input.split('\n');
    const transformed = lines
        .map(line => line.trim())  // Remove leading/trailing whitespace
        .filter(line => line.length > 0)  // Skip empty lines
        .map(line => `${line},`)  // Add comma
        .join('\n');
    return transformed;
}

function transformSqlToMarkdown(input: string): string {
	const normalized = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
	const rawLines = normalized.split('\n');
	// Keep only lines that are not entirely whitespace
	const lines = rawLines.filter(l => /\S/.test(l));
	if(lines.length === 0) return '';

	const splitLine = (line: string) => {
		const parts = line.split('\t');
		// Remove a single leading empty cell when clipboard includes a leading tab
		if(parts.length > 1 && parts[0] === '') parts.shift();
		if(parts.length > 1 && parts[parts.length-1] === '') parts.pop();
		return parts;
	};

	const headerFields = splitLine(lines[0]);
	const colCount = headerFields.length;

	const rows: string[][] = [];
	for(let i = 1; i < lines.length; i++){
		const parts = splitLine(lines[i]);
		// pad or trim to colCount
		const row = new Array(colCount).fill('');
		for(let c = 0; c < Math.min(parts.length, colCount); c++){
			row[c] = parts[c];
		}
		rows.push(row);
	}

	const escapeCell = (s: string) => {
		if(s === null || s === undefined) return '';
		// preserve NULL literal exactly
		if(s === 'NULL') return 'NULL';
		// Escape pipe characters to avoid breaking the table
		return s.replace(/\|/g, '&#124;');
	};

	const headerRow = '| ' + headerFields.map(h => escapeCell(h)).join(' | ') + ' |';
	const separatorRow = '| ' + headerFields.map(() => '---').join(' | ') + ' |';
	const dataRows = rows.map(r => '| ' + r.map(cell => escapeCell(cell)).join(' | ') + ' |');

	return [headerRow, separatorRow, ...dataRows].join('\n');
}

function transformNewlinesToSpace(input: string): string {
	// Remove all tabs, replace newlines with spaces, then collapse multiple spaces to one
	let text = input.replace(/\t/g, '');          // Remove tabs
	text = text.replace(/\r?\n/g, ' ');          // Replace newlines with spaces
	text = text.replace(/ +/g, ' ');             // Collapse multiple spaces to one
	return text.trim();                          // Trim leading/trailing space
}

// This method is called when your extension is deactivated
export function deactivate() {}
