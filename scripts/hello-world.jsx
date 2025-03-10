// Photoshopで水色のHello Worldテキストを作成するシンプルなスクリプト

#target photoshop

app.displayDialogs = DialogModes.NO;

// スクリプトを実行する関数を作成
function main() {
    if (!documents.length) {
        alert("ドキュメントを開いてから実行してください！");
        return;
    }
    
    // アクティブなドキュメントを取得
    var doc = app.activeDocument;
    
    // テキストレイヤーを作成
    var textLayer = doc.artLayers.add();
    textLayer.kind = LayerKind.TEXT;
    textLayer.name = "Hello World";
    
    // テキストの内容とプロパティを設定
    var textItem = textLayer.textItem;
    textItem.contents = "Hello World";
    textItem.font = "Arial"; // 汎用的な英語フォント
    textItem.size = 48; // ポイントサイズ
    textItem.fauxBold = true; // 太字
    
    // 水色に設定（RGB: 0, 153, 255）
    textItem.color.rgb.red = 0;
    textItem.color.rgb.green = 153;
    textItem.color.rgb.blue = 255;
    
    // テキストをキャンバスの中央に配置
    textItem.justification = Justification.CENTER;
    textItem.position = [doc.width.value / 2, doc.height.value / 2];
    
    app.displayDialogs = DialogModes.ALL;
    alert("水色のHello Worldテキストレイヤーを作成しました！");
}

// スクリプトを実行
main();