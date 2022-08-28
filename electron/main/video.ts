import util from 'util';
import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';
import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

const cache: Record<string, any> = {};
const videofile = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'ts', 'm2ts', 'mpg', 'rmvb', 'rm'];

ipcMain.handle('video-check', async (e, params: any) => {
  let res: any = [];
  const { path } = params;
  if (cache[path]) {
    return cache[path];
  }
  try {
    const list = await fileDisplay(path, res);
    cache[path] = { path, list };
    return { path, list };
  } catch (e) {
    return { path, error: e };
  }
});

function getVideoDimensions(filename: string) {
  // console.log('filename', filename);
  return ffprobe(filename, { path: ffprobeStatic.path }).then((info: any) => {
    // console.log('ffprobe info', info);
    return {
      width: info.streams[0].width,
      height: info.streams[0].height,
    };
  });
}

async function fileDisplay(filePath: string, res: any[]) {
  // console.log('fileDisplay', filePath, res);
  // 根据文件路径读取文件，返回文件列表
  const files = fs.readdirSync(filePath);
  for await (const filename of files) {
    //获取当前文件的绝对路径
    const filedir = path.join(filePath, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(filedir);
    const isFile = stats.isFile(); //是文件
    const isDir = stats.isDirectory(); //是文件夹
    if (isFile) {
      // console.log(filename); // 读取文件内容
      const [ext, ...rest] = filename.split('.').reverse();
      // console.log(ext);
      if (videofile.includes(ext)) {
        // console.log('shipin');
        const dimensions = await getVideoDimensions(filedir);
        // console.log(dimensions);
        res.push({ ...dimensions, filename, filedir });
      }
      //   var content = fs.readFileSync(filedir, "utf-8");
      //   console.log(content);
    }
    if (isDir) {
      await fileDisplay(filedir, res); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  }
  // console.log(res);
  return res;
}
const deleteVideo = (filePath: string) => {
  console.log('deleteVideo', filePath);
  fs.unlinkSync(filePath);
  return { status: 'success' };
};

export default {};
