// ps-script-launcher.jsx
// Photoshopのスクリプトフォルダに保存して実行

#target photoshop

// スクリプト本体と同じ階層のscriptsフォルダを指定
var scriptFile = new File($.fileName);
var scriptFolder = scriptFile.parent;
var scriptsFolder = new Folder(scriptFolder + "/scripts");

// scriptsフォルダが存在しない場合は作成
if (!scriptsFolder.exists) {
    scriptsFolder.create();
    alert("スクリプトフォルダを作成しました：\n" + scriptsFolder.fsName);
}

// UIを作成
var win = new Window("dialog", "スクリプト選択");
win.orientation = "column";
win.alignChildren = "fill";

// スクリプトリスト
var scriptsList = win.add("listbox", undefined, [], {multiselect: false});
scriptsList.preferredSize.width = 300;
scriptsList.preferredSize.height = 200;

// ボタンパネル
var btnGroup = win.add("group");
btnGroup.orientation = "row";
btnGroup.alignment = "center";
var runBtn = btnGroup.add("button", undefined, "実行");
var cancelBtn = btnGroup.add("button", undefined, "キャンセル");

// スクリプトリストを更新
function updateScriptsList() {
    scriptsList.removeAll();
    var files = scriptsFolder.getFiles("*.jsx");
    for (var i = 0; i < files.length; i++) {
        var item = scriptsList.add("item", files[i].displayName.replace(/\.jsx$/i, ""));
        item.filePath = files[i].fsName;
    }
    if (files.length > 0) {
        scriptsList.selection = 0;
    } else {
        scriptsList.add("item", "スクリプトがありません。scriptsフォルダにJSXファイルを追加してください。");
    }
}

// 実行ボタンのイベント
runBtn.onClick = function() {
    if (scriptsList.selection && scriptsList.selection.filePath) {
        try {
            win.close();
            $.evalFile(scriptsList.selection.filePath);
        } catch(e) {
            alert("エラー: " + e);
        }
    } else {
        alert("スクリプトを選択してください");
    }
};

// キャンセルボタンのイベント
cancelBtn.onClick = function() {
    win.close();
};

// 初期ロード
updateScriptsList();

// UIを表示
win.center();
win.show();