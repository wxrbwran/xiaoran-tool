const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, data: Record<string, any>) => {
    // let validChannels = ['nameOfClientChannel'] // <-- Array of all ipcRenderer Channels used in the client
    // if (validChannels.includes(channel)) {
    ipcRenderer.send(channel, data);
    // }
  },
  receive: (channel: string, func: Function) => {
    // let validChannels = ['nameOfElectronChannel'] // <-- Array of all ipcMain Channels used in the electron
    // if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (event, ...args) => func(...args));
    // }
  },
});

contextBridge.exposeInMainWorld('$video', {
  // we can also expose variables, not just functions
  async check(params: Record<string, any>) {
    // console.log('contextBridge', params);
    const res = await ipcRenderer.invoke('video-check', params);
    return res;
  },
});

contextBridge.exposeInMainWorld('$win', {
  // we can also expose variables, not just functions
  async open(params: any) {
    console.log('contextBridge open', params);
    await ipcRenderer.invoke('window-open', params);
  },
});
// /**
//  * 发送异步消息（invoke/handle 模型）
//  * @param channel
//  * @param param
//  * @returns {Promise}
//  */
// const invoke = (channel: string, param: any) => {
//   const message = ipcRenderer.invoke(channel, param);
//   return message;
// };
// window.$invoke = invoke;
// /**
//  * 发送同步消息（send/on 模型）
//  * @param channel
//  * @param param
//  * @returns {Any}
//  */
// const sendSync = (channel: string, param: any) => {
//   const message = ipcRenderer.sendSync(channel, param);
//   return message;
// };

// window.$sendSync = sendSync;

export function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
export function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement('style');
  const oDiv = document.createElement('div');

  oStyle.id = 'app-loading-style';
  oStyle.innerHTML = styleContent;
  oDiv.className = 'app-loading-wrap';
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading();
};

setTimeout(removeLoading, 300);
