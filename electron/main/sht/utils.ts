// @ts-nocheck
import fs from 'fs';
import os from 'os';
import path from 'path';

export const toolShtPath = path.resolve(os.homedir(), 'xiaoran-tool', 'sht');

export async function getPageList(url, browser, map) {
  const page = await browser.newPage(); //打开一个空白页
  await page.goto(url);
  await page.waitForSelector('table');
  await page.mainFrame().addScriptTag({
    url: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js',
    // path: './jquery.js',
  });
  const result = await page.evaluate(() => {
    const lists = [];
    $('.s.xst').each(function () {
      // console.log('$(this)', $(this));
      const href = $(this).attr('href');
      // console.log('href', href);
      lists.push(window.location.origin + '/' + href);
    });
    return lists;
  });
  // console.log(result);
  await page.close();
  for (const innerUrl of result) {
    try {
      await getPageInfo(innerUrl, browser, map);
    } catch (e) {
      continue;
    }
  }
}

export async function getPageInfo(url, browser, map) {
  const page = await browser.newPage(); //打开一个空白页
  await page.goto(url);
  await page.waitForSelector('.blockcode');
  const result = await page.evaluate(() => {
    const title = document.querySelector('#thread_subject').innerText;
    const src = document.querySelector('.blockcode div ol li').innerText;
    const torrent = document
      .querySelector('.attnm')
      .innerText.split('\n')
      .filter((n) => !!n)[0];
    const res = { src, title, torrent };
    return res;
  });
  if (result) {
    const { src, title } = result;
    const notList = ['探花', '台语', 'swagger', '寻花', '自慰'];
    let pass = true;
    notList.forEach((not) => {
      // console.log('not', not);
      // console.log('title', title);
      if (title.includes(not) && !title.includes('星选')) {
        console.log('跳过', title, src);
        pass = false;
      }
    });
    if (pass) {
      // console.log(
      //   `path.resolve(os.homedir(), 'xiaoran-tool', 'sht', 'mag.txt')`,
      //   path.resolve(os.homedir(), 'xiaoran-tool', 'sht', 'mag.txt'),
      // );
      try {
        fs.accessSync(toolShtPath, fs.constants.F_OK);
      } catch (e) {
        fs.mkdirSync(toolShtPath, {
          recursive: true,
        });
      }
      fs.writeFileSync(path.resolve(toolShtPath, 'mag.txt'), `${result.src}\n`, {
        flag: 'a',
      });
      const key = result.torrent.split('.')[0];
      map[key] = result.title;
      fs.writeFileSync(path.resolve(toolShtPath, 'map.txt'), `${key}: "${result.title}",\n`, {
        flag: 'a',
      });
    }
  }
  await page.close();
}
