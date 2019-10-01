/*--------------------------------------------------------------------------
　xキーを押している間メッセージ速度が最速になるがページ送りされなくなる ver 1.0

■作成者
キュウブ

■概要
タイトルの通りxキーを押してもメッセージが最速になるだけで
ページ送りされなくなるので、気軽に押せるようになる

■使い方
導入するだけ

■更新履歴
ver 1.0 (2019/10/1)
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
	var alias = MessageAnalyzer.isMessageDirect;
	MessageAnalyzer.isMessageDirect = function() {
		return Miscellaneous.isGameAcceleration() || alias.call(this);
	};

	MessageAnalyzer._isPageChange = function() {
		if (this._waitChain.isAutoMode()) {
			if (this._waitChain.isPageAutoChange()) {
				// 自動待機が完了したから、ページを切り替える
				return true;
			}
		}
		else if (InputControl.isSelectAction()) {
			// 決定キーが押された場合は、ページを切り替える
			return true;
		}

		return false;
	};


	MessageAnalyzer._movePage = function() {
		// 次のページに進むべきかを調べる
		if (this._isPageChange()) {
			this._changeNextPage();
			return MoveResult.CONTINUE;
		}
		else {
			// 現在のページの処理をしたいが、待機状態に入っているかを先に調べる
			if (this._waitChain.moveWaitChain() === MoveResult.CONTINUE) {
				// 待機状態に入っているため処理を続行しない
				return MoveResult.CONTINUE;
			}
		}
	
		if (this.isMessageDirect()) {
			this.cutPage();
		}
		else if (!DataConfig.isHighPerformance()) {
			// 30FPSの場合は、2文字ずつ処理されることになる
			this._checkCurrentPage(false);
		}

		// 現在のページを処理する
		this._checkCurrentPage(false);
		
		return MoveResult.CONTINUE;
	};
	
})();