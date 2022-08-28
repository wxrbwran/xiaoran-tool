// @ts-nocheck
import puppeteer from 'puppeteer';
import { ipcMain } from 'electron';
import fs from 'fs';

async function getPageList(url, browser) {
  const page = await browser.newPage(); //打开一个空白页
  await page.goto(url);
  await page.waitForSelector('table');
  await page.mainFrame().addScriptTag({
    url: 'https://code.jquery.com/jquery-3.6.0.min.js',
  });
  const result = await page.evaluate(() => {
    const lists = [];
    $('.s.xst').each(function () {
      console.log('$(this)', $(this));
      const href = $(this).attr('href');
      console.log('href', href);
      lists.push('https://qwrewr.net/' + href);
    });
    return lists;
  });
  console.log(result);
  await page.close();
  for (const innerUrl of result) {
    try {
      await getPageInfo(innerUrl, browser);
    } catch (e) {
      continue;
    }
  }
}

async function getPageInfo(url, browser) {
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
  console.log('result', result);
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
      fs.writeFileSync('mag.txt', `${result.src}\n`, { flag: 'a' });
      fs.writeFileSync('map.txt', `${result.torrent}: "${result.title}",\n`, {
        flag: 'a',
      });
    }
  }
  await page.close();
}

ipcMain.handle('catch-sht', async (e, params: any) => {
  let res: any = [];
  console.log('catch-sht', params);
  try {
    const browser = await puppeteer.launch({ headless: false }); //打开浏览器
    for (let i = 1; i <= params.to; i++) {
      const page = params.base + 'forum-2-' + i + '.html';
      await getPageList(page, browser);
    }
    await browser.close();
    console.log('爬取结束.');
    return params;
  } catch (e) {
    return { error: e };
  }
});

export default {};
