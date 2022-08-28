// @ts-nocheck
import puppeteer from 'puppeteer';
import { ipcMain } from 'electron';
import { toolShtPath } from './utils';
import fs from 'fs';
import path from 'path';
import { toolShtPath } from './utils';

ipcMain.handle('sht-rename', async (e, params) => {
  const { baseDir } = params;
  const jsonPath = path.resolve(toolShtPath, 'map.json');
  const map: Record<string, string> = require(jsonPath);
  // console.log('map', map);
  try {
    Object.keys(map).forEach((name) => {
      const dir = `${baseDir}${name}`;
      const file = `${baseDir}${name}\\${name}.mp4`;
      if (fs.existsSync(file)) {
        fs.renameSync(file, `${baseDir}${name}\\${map[name]}.mp4`);
      }
      const upFile = path.resolve(baseDir, `${name}.mp4`);
      console.log('upFile', upFile);
      if (fs.existsSync(upFile)) {
        fs.renameSync(upFile, path.resolve(baseDir, `${map[name]}.mp4`));
      }
      if (fs.existsSync(dir)) {
        fs.renameSync(dir, `${baseDir}${map[name]}`);
      }
    });
    return { status: 'success', data: {} };
  } catch (e) {
    return { error: e, status: 'failure' };
  }
});

export default {};
