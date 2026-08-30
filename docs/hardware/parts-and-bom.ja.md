# ハードウェア
RLG G1 Neckはそのほとんどが3Dプリントで製作されており、滑らかで剛性のある動作のために
市販の機械部品を使用しています。

日本で設計されたため、主に日本国内で入手可能な部品を使用していますが、特定のブランドや
メーカーへのこだわりはないため、Aliexpressなどの代替手段から必要な部品を調達することも
難しくありません。

現在2種類のカメラタイプに対応していますが、カスタムカメラマウントを作成することで、
他のカメラタイプにも対応させることが可能です。

# 部品表
部品表は[こちら](https://docs.google.com/spreadsheets/d/1gwZNJmtOV1_wQ62z1Mm8VV6fZPQNiGaJnrXC8sGx9LE/edit?usp=sharing)から確認できます。

# CAD
TWIST2 Neckと同様に、RLG G1 NeckはOnshapeで設計されており、オンライン上でホストされています。
[こちら](https://cad.onshape.com/documents/614503cf4078ded46dc4d9df/w/728dad7b352bc600fab4452a/e/807a6ef6045ecfcff44e7754?configuration=List_1bw2HqPt7vlDom%3DHighPS&renderMode=0&uiState=6a9431b7f925e2bb1e9022f5)から確認できます。

設計上の判断はドキュメントのノートに記載されています。
![Onshape Document Notes](../assets/cad_document_notes.png)

## 3Dプリント

パーツを3Dプリントするには、Onshapeにアクセスして個別にパーツをエクスポートするか、Onshape上でホストされている
[Bambulab用の完成済みプロジェクト](https://cad.onshape.com/documents/614503cf4078ded46dc4d9df/w/50a22c666b68854006baa02a/e/ab9fb4c4df483da82351e70b)
をダウンロードしてください。前者の方法はパーツが常に最新の状態であることを保証し、後者はより手軽です。

専用のサポート材インターフェースを使用してプリントすると、表面の仕上がりが非常に綺麗になります。
可能であればこの方法を使用してください。

## 構成
対応している2種類のカメラタイプに応じて、2つの構成があります:

- Accuvision HighPS Miniカメラ
- Tier IV C1カメラ

構成の切り替えは簡単です。メインアセンブリ(`main_asm`)またはスカルアセンブリ(`skull_asm`)に移動し、
構成パネルから使用したい構成を選択してください。
![CAD Configuration](../assets/cad_config.png)


## プリンターとフィラメントに合わせた公差の調整
この設計では変数が使用されており、特定のセットアップに合わせて完璧なプリント結果を得るために
パラメータを調整することができます。

まずドキュメントをコピーし、[ハードウェア変数テーブル](https://cad.onshape.com/documents/614503cf4078ded46dc4d9df/w/728dad7b352bc600fab4452a/e/79a67bc2376c51c3e07317a2?renderMode=0&leftPanel=false&uiState=6a9432c0f925e2bb1e902575)内の変数を変更してください。
