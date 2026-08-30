# RLG G1 Neckの実行方法

このガイドは、開発キットを受け取っているか、[インストール手順](installation.md)に従ってG1 Neckソフトウェアスタックが
システムにインストールされ、[配線ガイド](../hardware/wiring.md)に従ってすべての配線が完了している状態を前提としています。

これには2つの側面があります: PC(jetson)側とヘッドセット側です。まずPCスタックを起動し、
CloudXRサービスを立ち上げる必要があります。

その後、CloudXRサービスを通じてヘッドセットをPCに接続し、ヘッドトラッキングとカメラ映像を取得できます。

開始する前に、**PCとヘッドセットが同じネットワークに接続されていることを確認してください。**

## PCの起動 {: #pc-bringup }
1. PCの電源を入れ、G1 Neckスタックがインストールされているアカウントにログインします。
   開発キットの場合、これは`g1neck`アカウントです。パスワードをお持ちでない場合は、提供元にお問い合わせください。
2. (**Accuvisionのみ**) 左カメラに13度のピッチ補正を適用する必要があります。正確な値はユニットの組み立て方によって
   異なる場合があります。動作中に[カメラの位置調整](#camera-alignment)を行うことができます。
   **デコーダーが設定データを保存できるようになるまでは、電源を再接続するたびにこの操作を行う必要があります。**
   1. マイクロUSBケーブルを左カメラデコーダーのUARTポートに接続します。
   2. `gtkterm`を開きます。インストールされていない場合は、`sudo apt install gtkterm`でインストールしてください。
   3. デコーダーに接続されているポートを選択します。通常は`/dev/ttyUSB0`です。ボーレートを`115200`に設定します。
   4. `p`を押してピッチ角度を選択します。
   5. `130`と入力してから`enter`を押して13度を入力します。
3. <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>t</kbd>を押して新しいターミナルを開きます。
4. G1 NeckスタックのROS2ワークスペースに移動します。デフォルトでは`~/workspaces/twist2_neck_demo`にあります。
   ```bash
   cd ~/workspaces/twist2_neck_demo
   ```
5. ワークスペースをソースします。
   ```bash
   source install/setup.sh
   ```
6. ROS2 Launchfileを使ってG1 Neckスタックを起動します。
   ```bash
   ros2 launch twist2_neck_ros2 twist2_neck.launch.py
   ```
   これにより、CloudXRサービスが自動的に開始され、G1 Neckスタック全体が起動します。

おめでとうございます！PC側で行うことはこれですべてです。次はヘッドセット側です。

## ヘッドセットとPCの接続
このセクションは[NVIDIAの公式ガイド](https://nvidia.github.io/IsaacTeleop/main/getting_started/quick_start.html#connect-an-xr-headset)
とほぼ同じ内容です。

1. ヘッドセット側でブラウザを開き、[https://nvidia.github.io/IsaacTeleop/client/main/](https://nvidia.github.io/IsaacTeleop/client/main/)にアクセスします。
2. ホストPCがJetsonの場合、サイドパネルで動画コーデックを`H.265`に設定してください。
   ![Codec Selection](../assets/codec_selection.png)
3. Server IPの欄にPCのIPアドレスを入力します。
   ![IP Input](../assets/ip_input.png)
   自分のIPアドレスが分からない場合は、デスクトップのWi-Fi設定から確認できます。
   ![Wifi Selection](../assets/network_selection.png)
   ![Wifi Details](../assets/network_details.png)
   ターミナルを使い慣れている場合は、
   ```bash
   ip address
   ```
   でも確認できます。

# スタックの停止・再起動 {: #stoppingrestarting-the-stack }
G1 Neckスタックを実行しているターミナルで<kbd>Ctrl</kbd>+<kbd>c</kbd>を押すとスタックが停止します。再起動するには、
```bash
ros2 launch twist2_neck_ros2 twist2_neck.launch.py
```
を実行してください。

# カメラの位置調整 {: #camera-alignment }
**これはAccuvisionカメラを使用している場合にのみ該当します**。
ヘッドセットを装着し、テレオペレーションセッションを開始して、映像が「正常」に見えるか確認してください。

違和感がある場合、左右の映像がずれている可能性があります。
片目を閉じて切り替えることで、この状態かどうかを確認できます。

開発キットでは、左右のカメラ映像の間に13度のピッチのずれがあります。
この原因はまだ不明ですが、カメラデコーダーのUARTインターフェースを通じて補正できます。

[PCの起動の手順2](#pc-bringup)の手順4までを実行してください。その後、ピッチ補正角度を入力します。
形式は次の通りです:

`十の位 一の位 小数点`

例えば、ピッチ補正を`10.5`に設定する場合は、`105`と入力します。デコーダーは設定データを保存しないため、
この角度を記録しておいてください。**電源を再接続するたびに設定を再適用する必要があります。**

想定通りに動作しない場合は、[トラブルシューティングページ](../troubleshooting.md)に進んでください。
