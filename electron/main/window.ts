import { otherWindowConfig } from './config/windowsConfig';
import { ROOT_PATH } from './index';
import { ipcMain, dialog, BrowserWindow, app } from 'electron';
import path from 'path';

ipcMain.handle('window-open', async (e, arg) => {
  console.log('window-open arg', arg);
  const url = process.env.VITE_DEV_SERVER_URL;
  const indexHtml = `file://${path.join(ROOT_PATH.dist, 'index.html')}`;
  const ChildWin = new BrowserWindow({
    titleBarStyle: true ? 'default' : 'hidden',
    ...otherWindowConfig,
  });
  // 开发模式下自动开启devtools
  if (!app.isPackaged) {
    ChildWin.webContents.openDevTools({ mode: 'undocked', activate: true });
  }
  console.log('app.isPackaged', app.isPackaged);
  console.log('app.isPackaged indexHtml', indexHtml);
  console.log('app.isPackaged url', url);

  ChildWin.loadURL((app.isPackaged ? indexHtml : url) + `#${arg.url}`);
  ChildWin.once('ready-to-show', () => {
    ChildWin.show();
    // if (arg.IsPay) {
    //   // 检查支付时候自动关闭小窗口
    //   const testUrl = setInterval(() => {
    //     const Url = ChildWin.webContents.getURL();
    //     if (Url.includes(arg.PayUrl)) {
    //       ChildWin.close();
    //     }
    //   }, 1200);
    //   ChildWin.on('close', () => {
    //     clearInterval(testUrl);
    //   });
    // }
  });
  // 渲染进程显示时触发
  // ChildWin.once('show', () => {
  //   ChildWin.webContents.send('send-data-test', arg.sendData);
  // });
});
