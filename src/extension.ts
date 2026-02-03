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

	context.subscriptions.push(textToTitle);
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

// This method is called when your extension is deactivated
export function deactivate() {}
