const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.createReactComponent', function (uri) {
        vscode.window.showInputBox({ prompt: 'Enter the component name:' }).then(name => {
            if (name) {
                const folderPath = uri.fsPath;
                const componentFolderPath = path.join(folderPath, name);

                fs.mkdirSync(componentFolderPath);

                const jsxFilePath = path.join(componentFolderPath, `${name}.jsx`);

                // Calculating the relative path
                const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
                const relativePath = path.relative(workspaceFolder, jsxFilePath);

                const jsxContent = `// ${relativePath}\nimport React, { useState } from "react";\nconst ${name} = ({ props }) => {\n\treturn <></>\n}\n\nexport default ${name}`;
                fs.writeFileSync(jsxFilePath, jsxContent);

                const scssContent = ''; // You can add default SCSS content here
                fs.writeFileSync(path.join(componentFolderPath, `${name}.scss`), scssContent);

                vscode.window.showInformationMessage('Component created successfully!');
            }
        });
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
    activate,
    deactivate
}
