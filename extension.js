const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

class JTraceViewProvider {
  constructor(extensionUri) {
    this.extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView) {
    const webview = webviewView.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.extensionUri, 'out'),
      ],
    };

    webviewView.webview.html = this.getWebviewContent(webview);
  }

  getWebviewContent(webview) {
    // Path to your bundled HTML
    const htmlPath = path.join(this.extensionUri.fsPath, 'src', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Get URI to the bundled JS (React build)
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'out', 'views', 'index.js')
    );

    // Replace placeholders in HTML
    html = html
      .replace(/\$\{scriptUri\}/g, scriptUri.toString())
      .replace(/\$\{webview.cspSource\}/g, webview.cspSource);

    return html;
  }
}

function activate(context) {
  console.log('Activating JTrace extension...');
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'jtraceView',
      new JTraceViewProvider(context.extensionUri)
    )
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
