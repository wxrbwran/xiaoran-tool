/// <reference types="vite/client" />
declare module 'get-video-dimensions';
declare interface Window {
  $sendSync: any;
  $invoke: any;
  $win: any;
  $video: any;
  $storage: {
    setType: (key: 'localStorage' | 'sessionStorage') => any;
    get: (key: string) => unkonwn | undefined;
    set: (key: string, val: unknown) => void;
    remove: (key: string) => void;
    clear: () => void;
  };
}
