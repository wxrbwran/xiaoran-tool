// import config from '@config/index'
import { BrowserWindowConstructorOptions } from 'electron';

// export const mainWindowConfig: BrowserWindowConstructorOptions = {
//   height: 800,
//   useContentSize: true,
//   width: 1700,
//   minWidth: 1366,
//   show: false,
//   frame: true,
//   webPreferences: {
//     contextIsolation: false,
//     nodeIntegration: true,
//     webSecurity: false,
//     // 如果是开发模式可以使用devTools
//     devTools: process.env.NODE_ENV === 'development',
//     // 在macos中启用橡皮动画
//     scrollBounce: process.platform === 'darwin',
//   },
// };

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

export const otherWindowConfig: BrowserWindowConstructorOptions = {
  height: 620,
  useContentSize: true,
  width: 820,
  autoHideMenuBar: true,
  minWidth: 820,
  frame: true,
  show: false,
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
    webSecurity: false,
    // 如果是开发模式可以使用devTools
    devTools: process.env.NODE_ENV === 'development',
    // 在macos中启用橡皮动画
    scrollBounce: process.platform === 'darwin',
  },
};
