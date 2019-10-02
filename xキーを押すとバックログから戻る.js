/*--------------------------------------------------------------------------
　xキーを押すとバッグログから戻れるようになる ver 1.1

■作成者
キュウブ

■概要
バッグログから戻るためには、ログの最下段まで移動して下キーを押さなければなりませんが、
このスクリプトを導入するとxキーを押せばいつでも戻れるようになります。

■使い方
導入するだけ

■更新履歴
ver 1.0 (2019/10/3)
初版作成

■対応バージョン
SRPG Studio Version:1.161

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"キュウブ"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。

--------------------------------------------------------------------------*/
(function(){
	var alias = BacklogWindow.moveWindowContent;
	BacklogWindow.moveWindowContent = function() {
		var result = alias.call(this);

		if (result === MoveResult.CONTINUE && (InputControl.isCancelAction() || InputControl.isCancelState())) {
			result = MoveResult.END;
		}

		return result;
	};
})();