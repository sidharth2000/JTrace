// extension.js
var vscode = require("vscode");
var path = require("path");
var fs = require("fs");
var JTraceViewProvider = class {
  constructor(extensionUri) {
    this.extensionUri = extensionUri;
  }
  resolveWebviewView(webviewView) {
    const webview = webviewView.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.extensionUri, "out")
      ]
    };
    webviewView.webview.html = this.getWebviewContent(webview);
  }
  getWebviewContent(webview) {
    const htmlPath = path.join(this.extensionUri.fsPath, "src", "index.html");
    let html = fs.readFileSync(htmlPath, "utf8");
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "out", "views", "index.js")
    );
    html = html.replace(/\$\{scriptUri\}/g, scriptUri.toString()).replace(/\$\{webview.cspSource\}/g, webview.cspSource);
    return html;
  }
};
function activate(context) {
  console.log("Activating JTrace extension...");
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "jtraceView",
      new JTraceViewProvider(context.extensionUri)
    )
  );
}
function deactivate() {
}
module.exports = { activate, deactivate };
//# sourceMappingURL=extension.js.map
