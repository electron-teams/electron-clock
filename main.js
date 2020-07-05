const { app, BrowserWindow, Notification, ipcMain } = require('electron');

let window = null;
app.on('ready', () => {
    window = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            nodeIntegration: true // 为了安全考虑electron默认禁用node, 我们本项目使用本地文件, 所以开启 
        }
    })

    window.loadFile('./index.html');
    handeIPC();

    window.on('closed', function () {
        window = null;
    });
})

const handeIPC = () => {
    ipcMain.handle('work-notification', async () => {
        const res = await new Promise((resolve, reject) => {
            const notification = new Notification({
                title: '任务结束',
                body: '是否开始休息?',
                actions: [{ text: '开始休息', type: 'button' }],
                closeButtonText: '继续工作'
            });
            notification.show();
            notification.on('action', () => {
                resolve('REST');
            });
            notification.on('close', () => {
                reject('WORK');
            });
        });

        return res;
    });
}

