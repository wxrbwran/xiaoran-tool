// @ts-nocheck
import fs from 'fs';
import os from 'os';
import path from 'path';

const toolShtPath = path.resolve(os.homedir(), 'xiaoran-tool', 'sht');

// console.log(
//   `path.resolve(os.homedir(), 'xiaoran-tool', 'sht', 'mag.txt')`,
//   path.resolve(os.homedir(), 'xiaoran-tool', 'sht', 'mag.txt'),
// );
try {
  console.log(1);
  fs.accessSync(toolShtPath, fs.constants.F_OK);
} catch (e) {
  console.log(2);

  fs.mkdirSync(toolShtPath, {
    recursive: true,
  });
}
