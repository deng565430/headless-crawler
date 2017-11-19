const puppeteer = require('puppeteer');
const { screenshot } = require('./config/default');
 
(async () => {
  const browser = await puppeteer.launch();
  // 打开浏览器后，新建tab页
  const page = await browser.newPage();
  // 设置tab页的尺寸，puppeteer允许对每个tab页单独设置尺寸
  await page.setViewport({
    width: 580,
    height: 3480
  });
  // tab访问需要截图的页面，使用await可以等待页面加载完毕
  await page.goto('http://www.fangsir007.com/recommendList');
  // 由于页面数据是异步的，所以等待5秒，等待异步请求完毕，页面渲染完毕
  await page.waitFor(5000);

  // 页面渲染完毕后，开始截图
  await page.screenshot({
    path: `${screenshot}/${Date.now()}.png`,
    clip: {
      x: 200,
      y: 60,
      width: 380,
      height: 3405
    }
  });
  
  // 关闭
  await browser.close();
})();

// 参考网站
// https://mp.weixin.qq.com/s/kkgJqs_onw-adyTPcEeLNA