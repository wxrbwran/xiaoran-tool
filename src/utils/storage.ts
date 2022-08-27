// 重写调用本地存储的方法，统一项目的调用方式

type TStorageType = 'localStorage' | 'sessionStorage';

class Storage {
  // 存储方式 'localStorage' | 'sessionStorage'
  public storageType: TStorageType;
  public pre: string;

  constructor(pre?: string, type?: TStorageType) {
    this.storageType = type || 'localStorage';
    this.pre = `${pre}_` || 'wj-web-default_';
  }
  setType(type: TStorageType) {
    this.storageType = type;
    return this;
  }
  get(key: string): unknown | undefined {
    const { storageType, pre } = this;
    const val = window[storageType].getItem(pre + key);
    if (val) {
      return JSON.parse(val);
    }
    return undefined;
  }
  set(key: string, value: unknown) {
    const { storageType, pre } = this;
    window[storageType].setItem(pre + key, JSON.stringify(value));
  }
  remove(key: string) {
    const { storageType, pre } = this;
    window[storageType].removeItem(pre + key);
  }
  clear() {
    const { storageType } = this;
    return window[storageType].clear();
  }
}
const storage = (pre?: string, type?: TStorageType) => new Storage(pre, type);
export default storage;
