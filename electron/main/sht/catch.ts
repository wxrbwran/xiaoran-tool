// @ts-nocheck
import puppeteer from 'puppeteer';
import { ipcMain } from 'electron';
import { getPageList, toolShtPath } from './utils';
import fs from 'fs';
import path from 'path';

let browser = null;

ipcMain.handle('sht-catch', async (e, params: any) => {
  const map: Record<string, string> = {};
  try {
    browser = await puppeteer.launch({ headless: false }); //打开浏览器
    for (let i = params.from; i <= params.to; i++) {
      const page = params.base + 'forum-2-' + i + '.html';
      await getPageList(page, browser, map);
    }
    await browser.close();
    let oldJson = {};
    const jsonPath = path.resolve(toolShtPath, 'map.json');
    // 如果有旧数据，合并
    try {
      fs.accessSync(jsonPath, fs.constants.F_OK);
      oldJson = JSON.parse(fs.readFileSync(jsonPath));
    } catch (e) {}
    fs.writeFile(
      path.resolve(jsonPath),
      JSON.stringify({ ...oldJson, ...map }),
      {
        flag: 'w',
      },
      () => {},
    );
    console.log('爬取结束.', map);
    return { status: 'success', map };
  } catch (e) {
    return { error: e, status: 'failure' };
  }
});

ipcMain.handle('catch-sht:stop', async (e, params: any) => {
  await browser.close();
});

export default {};
