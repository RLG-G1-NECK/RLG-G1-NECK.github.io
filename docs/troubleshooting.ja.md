# トラブルシューティング

テレオペレーションセッションの実行中に発生しうる、いくつかのよくある問題があります。
ここでは既知のものを一覧にしています。

## ヘッドセットが接続されているのにテレオペレーションセッションが開始しない
行った操作:

- ROS2 Launchfileを実行した
- [https://nvidia.github.io/IsaacTeleop/client/main/](https://nvidia.github.io/IsaacTeleop/client/main/)にアクセスしてConnectを押した

発生した現象:

- ブラウザのUIは消えるが、ヘッドトラッキングが動作せず、カメラ映像も表示されない
- コントローラーモデルが表示されない
- 「show」ボタンが表示されない

対処法:

- ヘッドセット側のブラウザクライアントを終了し、再接続を試してください。多くの場合、1回で解決します

## 映像に違和感がある
考えられる原因は3つあります:

- 左右のカメラ映像が入れ替わっている
- 映像がずれている
- 片方の映像の準備ができていない

### カメラ映像の入れ替わり
ワークスペースフォルダ(`/workspaces/twist2_neck_demo`)に移動し、次に`twist2_neck_ros2`パッケージに移動します。
`camera_config.yaml`内で映像を入れ替えます。
```bash
cd /workspaces/twist2_neck_demo  # インストール状況によって場所が異なる場合があります
cd src/twist2_neck_ros2
```
```bash
code camera_config.yaml  # または使い慣れたコードエディタを使用してください
```
![Camera configuration](assets/camera_config.png)

再度実行が必要な場合があります:
```bash
colcon build --symlink-install
```
ワークスペースのルート(`~/workspaces/twist2_neck_demo`)で実行し、G1 Neckスタックを再起動する必要があります
(<kbd>Ctrl</kbd>+<kbd>c</kbd>を押してから`ros2 launch`を再実行してください)
(詳細は[実行ページ](getting-started/deployment.md#stoppingrestarting-the-stack)を参照してください)。

### 映像のずれ
カメラの位置調整方法については、[カメラの位置調整の手順](getting-started/deployment.md#camera-alignment)を参照してください
**(Accuvisionのみ)**

## 片方の映像しか表示されない
デコーダーの一方が正常に初期化されていない可能性があります（USBエラーやカメラの電源が入っていないことが原因）。
USB接続を挿し直し、カメラ映像にUSBハブを使用していないことを確認してください。   

## 映像は表示されるがヘッドが動かない
考えられる原因はいくつかあります:

- U2D2電源ハブの電源が入っていない
- `dialout`グループに所属していない（開発キットを使用している場合はこの状態にはならないはずです）
- U2D2のデバイス(ポート)が間違っている
    - これは`twist2_neck_ros2`内の`config.json`ファイルから設定できます。
      ```bash
      cd /workspaces/twist2_neck_demo  # インストール状況によって場所が異なる場合があります
      cd src/twist2_neck_ros2
      ```
      ```bash
      code config.json  # または使い慣れたコードエディタを使用してください
      ```
      `device_name`フィールドを変更します。<br/>
      ![Config file](assets/port_config.png) <br/>
      ポート名が分からない場合は、次を試してください:
      ```bash
      ls /dev/tty*
      ```
      `/dev/ttyACM0`のように、他と異なるものが1つあるはずです。それがおそらくU2D2のデバイスです。
- `isaac_teleop_node`が動作していない
    - `isaac_teleop_node`はヘッドトラッキングデータをROS2トランスフォームに変換する責任があり、
      これを`neck_node`が読み取ってサーボコマンドを実行します。`isaac_teleop_node`が停止している場合、
      ヘッドトラッキングは動作しません。
    - `ros2 launch`を実行した直後の出力を確認して、停止しているノードがないかを確認してください。
      <br>
      Pythonエラーが表示され、パッケージが見つからないと言っている場合は、Conda環境が
      アクティブになっている可能性があります。環境を無効化する方法については[こちら](#deactivating-a-condapython-environment)を参照してください



## Conda/Python環境の無効化  {: #deactivating-a-condapython-environment }
Conda/Python環境がビルドとデプロイ中にアクティブになっていると、問題が発生する可能性があります。

このような環境を無効化するには、次を実行してください：
```bash
conda deactivate
```
その後、`CONDA_DEFAULT_ENV`をチェックして、アクティブなままの環境がないか確認します。
```bash
echo $CONDA_DEFAULT_ENV
```
何も出力されないはずです。出力された場合は、空になるまで`conda deactivate`を呼び出し続けてください。
<br>
Python環境の場合は、次を実行してください：
```bash
deactivate
```
以下が出力されるまで繰り返します：
```
> deactivate: command not found
```
