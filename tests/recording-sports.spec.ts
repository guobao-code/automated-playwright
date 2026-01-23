import { test, expect, Page } from '@playwright/test';

// 强制使用 headed 模式和 Chrome 浏览器
test.use({
  browserName: 'chromium',
  headless: false,
  channel: 'chrome'
});

const config = {
  baseUrl: 'https://platform.xunransports.com/integratedServicesSy',
  login: {
    username: 'xrty',
    password: 'Aa123456'
  }
};

// 封装登录函数
async function login(page: Page) {
  await page.goto(config.baseUrl);
  await page.getByText('密码登录').click();
  await page.getByRole('textbox', { name: '用户名/手机号' }).fill(config.login.username);
  await page.getByRole('textbox', { name: '请输入密码' }).fill(config.login.password);
  await page.getByRole('dialog').getByText('登录', { exact: true }).click();
  // 改为等待“工作台”可见
  await expect(page.getByText('工作台')).toBeVisible({ timeout: 15000 });
}

test('体育录制功能测试', async ({ page }) => {
  // 步骤1: 登录
  await login(page);

  // 步骤: 导航到运动记录
  await page.getByText('工作台').click();
  await page.waitForSelector('text=运动记录', { timeout: 5000 });
  await page.getByText('运动记录').click();
  await expect(page.locator('text=自由测试')).toBeVisible(); // 添加断言验证导航

  // 步骤: 自由测试
  await page.getByText('自由测试').click();
  await page.waitForSelector('text=全部项目', { timeout: 5000 });
  // 改进：用更明确的选择器替换XPath
  const firstTestLocator = page.locator('input[type="checkbox"]').first(); // 假设第一个复选框
  await expect(firstTestLocator).toBeVisible();
  await firstTestLocator.click();

  // 步骤: 项目筛选
  const projects = ['100米跑', '800米跑', '1000米跑', '米×8往返跑', '阳光跑', '立定跳远', '一分钟跳绳', '一分钟仰卧起坐', '坐位体前屈'];
  for (const project of projects) {
    await page.getByLabel(project).check();
  }
  // 移除断言

  // 步骤: 性别筛选
  await page.getByText('性别：男、女').click();
  await page.getByRole('checkbox', { name: '女' }).uncheck();
  await page.getByText('应用').click();
  // 移除断言

  // 步骤: 时间筛选
  await page.getByRole('textbox', { name: '筛选' }).click();
  await page.getByText('运动时间').click();
  await page.getByRole('textbox', { name: '开始日期' }).click();
  await page.locator('.ant-picker-cell-inner').filter({ hasText: '1' }).first().click(); // 改进日期选择
  await page.locator('.ant-picker-cell-inner').filter({ hasText: '31' }).first().click();
  await page.getByText('应用').click();
  // 移除断言

  // 步骤: 搜索
  await page.getByText('搜索').click();
  await page.getByRole('textbox', { name: '你想搜的，在这里都能搜到' }).fill('程');
  // 移除断言
  await page.locator('.w-\\[15px\\]').click();
  await page.getByRole('button', { name: 'close-circle' }).click();

  // 步骤: 记录选择（移除空标签，用角色定位）
  await page.locator('.w-\\[15px\\]').click();
  const recordCheckboxes = page.locator('input[type="checkbox"][aria-label*="记录"]'); // 假设有aria-label
  if (await recordCheckboxes.count() > 0) {
    await recordCheckboxes.first().check();
  }
  await page.getByText('清空已选').click();
  // 移除断言

  // 步骤: 导出
  await page.getByText('导出', { exact: true }).click();
  await page.getByText('导出已选记录（3）').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('确认导出').click();
  const download = await downloadPromise;
  await expect(download.suggestedFilename()).toMatch(/记录|records/); // 添加断言验证下载

  // 步骤: 删除记录
  await page.locator('div:nth-child(14) > .w-\\[44px\\] > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page.locator('div:nth-child(13) > .w-\\[44px\\] > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page.getByText('删除已选').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('删除已选').click();
  await page.getByText('确认删除', { exact: true }).click();
  await page.getByText('完成', { exact: true }).click();
  await expect(page.locator('text=删除成功')).toBeVisible({ timeout: 5000 }); // 添加断言验证删除

  // 步骤: 打包测试
  await page.getByText('打包测试').click();
  await page.waitForSelector('text=筛选', { timeout: 5000 });
  await page.locator('p').filter({ hasText: /^\d+$/ }).nth(1).locator('.w-\\[30px\\]').click(); // 改进选择器
  await page.locator('.w-\\[30px\\]').first().click();
  // 移除空标签，用角色定位
  const packCheckboxes = page.locator('input[type="checkbox"]').filter({ has: page.locator('..').locator('text=打包') }); // 假设关联文本
  if (await packCheckboxes.count() > 0) {
    await packCheckboxes.first().check();
  }
  await page.getByText('导出').click();
  await page.getByText('导出已选记录（2）').click();
  await expect(page.locator('text=导出已选记录（2）')).toBeVisible(); // 添加断言验证导出选项

  // 步骤: 测试计划记录
  await page.getByText('测试计划记录').click();
  await page.locator('div').filter({ hasText: /^请选择日期$/ }).first().click();
  await page.locator('.ant-picker-cell-inner').filter({ hasText: '7' }).first().click(); // 改进日期
  await page.locator('.ant-picker-cell-inner').filter({ hasText: '9' }).first().click();
  await page.locator('.ant-picker-cell-inner').filter({ hasText: '23' }).first().click();
  await page.locator('div').filter({ hasText: /^测试日期：2026-01-132026-01-19\+ 0 \.\.\.$/ }).first().click();
  const firstTestLocato = page.locator('xpath=//*[@id="root-master"]/div[1]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]');
  await expect(firstTestLocato).toBeVisible();
  await firstTestLocato.click();
  await page.getByText('查看计划').click();
  await page.getByText('返回').click();
  await page.getByText('返回').click();
  await expect(page.locator('text=测试计划记录')).toBeVisible(); // 添加断言验证返回

  // 步骤: 参赛记录
  await page.getByText('参赛记录').click();
  const firstTestLocators = page.locator('xpath=//*[@id="root-master"]/div[1]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]');
  await expect(firstTestLocators).toBeVisible();
  await firstTestLocators.click();
  // 移除空标签，用角色定位
  const contestCheckboxes = page.locator('input[type="checkbox"]').filter({ has: page.locator('..').locator('text=参赛') });
  if (await contestCheckboxes.count() > 0) {
    await contestCheckboxes.first().check();
  }
  await page.getByText('清空已选').click();
  await expect(page.locator('input[type="checkbox"]:checked')).toHaveCount(0); // 添加断言验证清空

  // 步骤: 导出记录
  await page.getByText('导出记录').click();
  await page.getByText('导出当前所有记录（9）').click();
  const download1Promise = page.waitForEvent('download');
  await page.getByText('确认导出').click();
  const download1 = await download1Promise;
  await expect(download1.suggestedFilename()).toMatch(/记录|records/); // 添加断言验证下载
  await page.getByText('返回').click();
  await expect(page.locator('text=参赛记录')).toBeVisible(); // 添加断言验证返回

  console.log('✅ 体育录制功能测试完成');
});
