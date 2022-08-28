// @ts-nocheck
import puppeteer from 'puppeteer';
import { ipcMain } from 'electron';
import { toolShtPath } from './utils';
import fs from 'fs';
import path from 'path';
import { toolShtPath } from './utils';

ipcMain.handle('sht-move', async (e, params) => {
  const { baseDir } = params;
  function fileMove(filePath, level) {
    fs.readdir(filePath, function (err, files) {
      if (err) {
        console.warn(err);
      } else {
        if (files.length === 1 && level !== 0) {
          fs.rename(path.resolve(filePath, files[0]), path.resolve(baseDir, files[0]), (err) => {
            console.log(err);
          });
        } else {
          files.forEach(function (filename) {
            var filedir = path.join(filePath, filename);
            fs.stat(filedir, function (eror, stats) {
              if (eror) {
                console.warn('error');
              } else {
                var isDir = stats.isDirectory();
                if (isDir) {
                  fileMove(filedir, level + 1);
                }
              }
            });
          });
        }
      }
    });
  }
  try {
    fileMove(baseDir, 0);
    return { status: 'success', data: {} };
  } catch (e) {
    return { error: e, status: 'failure' };
  }
});

export default {};
