config 可以設環境
若 docker 化，則使用 各環境的 settings 參數

socketHandler -> 監聽  socket 的 事件，解析前端資料指派給 lobby
lobby -> 根據 socket 事件  操作連線執行對應的行為
peerManager -> 基熟的連線管理
peer -> 保存socket 及 使用者的一些基本資料和數據(記憶體)