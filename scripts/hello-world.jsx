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
    
    try {
        // アートボードかどうかを確認
        var hasArtboards = false;
        var targetLayer = null;
        
        // アートボードを検索
        for (var i = 0; i < doc.layers.length; i++) {
            if (doc.layers[i].typename === "LayerSet" && doc.layers[i].artboardEnabled === true) {
                hasArtboards = true;
                // アクティブなアートボードを選択
                if (doc.layers[i].visible) {
                    targetLayer = doc.layers[i];
                    break;
                }
            }
        }
        
        // アクティブなアートボードが見つからない場合は最初のアートボードを使用
        if (hasArtboards && !targetLayer) {
            for (var i = 0; i < doc.layers.length; i++) {
                if (doc.layers[i].typename === "LayerSet" && doc.layers[i].artboardEnabled === true) {
                    targetLayer = doc.layers[i];
                    break;
                }
            }
        }
        
        // アートボードがない場合はドキュメント自体を対象に
        if (!targetLayer) {
            targetLayer = doc;
        }
        
        // 現在のアクティブレイヤーを保存
        var currentActiveLayer = doc.activeLayer;
        
        // ターゲットレイヤーをアクティブに
        if (hasArtboards) {
            doc.activeLayer = targetLayer;
        }
        
        // テキストレイヤーを作成
        var textLayer;
        if (hasArtboards) {
            // アートボード内にテキストレイヤーを作成
            textLayer = targetLayer.artLayers.add();
        } else {
            // 通常のドキュメントにテキストレイヤーを作成
            textLayer = doc.artLayers.add();
        }
        
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
        
        // 位置を設定
        if (hasArtboards) {
            // アートボードの境界を取得
            var bounds = targetLayer.bounds;
            var artboardWidth = bounds[2].value - bounds[0].value;
            var artboardHeight = bounds[3].value - bounds[1].value;
            
            // アートボードの中央に配置
            textItem.position = [bounds[0].value + artboardWidth / 2, bounds[1].value + artboardHeight / 2];
        } else {
            // 通常のドキュメントの中央に配置
            textItem.position = [doc.width.value / 2, doc.height.value / 2];
        }
        
        // 元のアクティブレイヤーを復元
        if (hasArtboards) {
            doc.activeLayer = currentActiveLayer;
        }
        
        app.displayDialogs = DialogModes.ALL;
        alert("水色のHello Worldテキストレイヤーを作成しました！");
    } catch (e) {
        app.displayDialogs = DialogModes.ALL;
        alert("エラーが発生しました: " + e + "\n" + e.line);
    }
}

// スクリプトを実行
main();