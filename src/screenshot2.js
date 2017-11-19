const puppeteer = require('puppeteer');
const { mn } = require('./config/default');
const srcToImg = require('./helper/srcToImg');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://image.baidu.com/');
  console.log('go tuu https://image.baidu.com/');

  // 设置视图窗口
  await page.setViewport({
    width: 1920,
    height: 2080
  });
  console.log('reset viewport');

  // 选择器
  await page.focus('#kw');
  // 模拟键盘输入的内容
  await page.keyboard.sendCharacter('狗');
  // 模拟点击
  await page.click('.s_search');
  console.log('go to search list');

  // 等待加载完成
  page.on('load', async () => {
    console.log('page loading done, start fetch...');

    // 获取页面上的元素
    const srcs = await page.evaluate(() => {
      const images = document.querySelectorAll('img.main_img');
      return Array.prototype.map.call(images, img => img.src);
    });
    console.log(`get ${srcs.length} images, start download`);

    // 遍历 保存
    srcs.forEach(async (src) => {
      // sleep
      await page.waitFor(200)
      await srcToImg(src, mn);
    })

    await browser.close();

  });
})();