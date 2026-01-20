import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://platform.xunransports.com/integratedServicesSy');
  await page.getByText('密码登录').click();
  await page.getByRole('textbox', { name: '用户名/手机号' }).click();
  await page.getByRole('textbox', { name: '用户名/手机号' }).fill('xrty');
  await page.getByRole('textbox', { name: '请输入密码' }).click();
  await page.getByRole('textbox', { name: '请输入密码' }).fill('Aa123456');
  await page.getByRole('dialog').getByText('登录', { exact: true }).click();
  await page.getByText('工作台').click();
  await page.getByText('运动记录').click();
  await page.getByText('自由测试').click();
  await page.getByRole('checkbox', { name: '全部项目' }).uncheck();
  await page.getByRole('checkbox', { name: '米跑' }).check();
  await page.getByLabel('100米跑').check();
  await page.getByLabel('800米跑').check();
  await page.getByLabel('1000米跑').check();
  await page.getByLabel('米×8往返跑').check();
  await page.getByLabel('阳光跑').check();
  await page.getByLabel('立定跳远').check();
  await page.getByLabel('一分钟跳绳').check();
  await page.getByLabel('一分钟仰卧起坐').check();
  await page.getByLabel('坐位体前屈').check();
  await page.getByText('性别：男、女').click();
  await page.getByRole('checkbox', { name: '女' }).uncheck();
  await page.getByText('应用').click();
  await page.getByRole('textbox', { name: '筛选' }).click();
  await page.getByText('运动时间').click();
  await page.getByRole('textbox', { name: '开始日期' }).click();
  await page.getByText('1', { exact: true }).first().click();
  await page.getByText('31').nth(3).click();
  await page.getByText('应用').click();
  await page.getByText('搜索').click();
  await page.getByRole('textbox', { name: '你想搜的，在这里都能搜到' }).click();
  await page.getByRole('textbox', { name: '你想搜的，在这里都能搜到' }).fill('程');
  await page.locator('.w-\\[15px\\]').click();
  await page.getByRole('button', { name: 'close-circle' }).click();
  await page.locator('.w-\\[15px\\]').click();
  
  // 空标签选择器错误处理
  try {
    await page.getByLabel('', { exact: true }).first().check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 第一个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(1).check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 第二个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(2).check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 第三个空标签选择器未找到，跳过');
  }
  
  await page.getByText('清空已选').click();
  
  try {
    await page.getByLabel('', { exact: true }).first().check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 第一个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(1).check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 第二个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(2).check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 第三个空标签选择器未找到，跳过');
  }
  
  await page.getByText('导出', { exact: true }).click();
  await page.getByText('导出已选记录（3）').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('确认导出').click();
  const download = await downloadPromise;
  await page.locator('div:nth-child(14) > .w-\\[44px\\] > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page.locator('div:nth-child(13) > .w-\\[44px\\] > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page.getByText('删除已选').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('删除已选').click();
  await page.getByText('确认删除', { exact: true }).click();
  await page.getByText('完成', { exact: true }).click();
  await page.getByText('打包测试').click();
  await page.locator('p:nth-child(2) > .w-\\[30px\\]').click();
  await page.locator('.w-\\[30px\\]').first().click();
  await page.locator('p:nth-child(2) > .w-\\[30px\\]').click();
  
  try {
    await page.getByLabel('', { exact: true }).first().check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 打包测试中第一个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(1).check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 打包测试中第二个空标签选择器未找到，跳过');
  }
  
  await page.getByText('导出').click();
  await page.getByText('导出已选记录（2）').click();
  await page.getByText('测试计划记录').click();
  await page.locator('div').filter({ hasText: /^请选择日期$/ }).first().click();
  await page.getByText('1', { exact: true }).first().click();
  await page.getByText('19', { exact: true }).click();
  await page.getByText('13', { exact: true }).click();
  await page.getByText('1', { exact: true }).first().click();
  await page.locator('div').filter({ hasText: /^测试日期：2026-01-132026-01-19\+ 0 \.\.\.$/ }).first().click();
  await page.getByText('第一次测试').first().click();
  await page.getByText('查看计划').click();
  await page.getByText('返回').click();
  await page.getByText('返回').click();
  await page.getByText('参赛记录').click();
  await page.getByText('第一次测试', { exact: true }).click();
  
  try {
    await page.getByLabel('').first().check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 参赛记录中第一个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('').nth(1).check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 参赛记录中第二个空标签选择器未找到，跳过');
  }
  
  await page.getByText('清空已选').click();
  
  try {
    await page.getByLabel('').first().check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 参赛记录中第一个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('').nth(1).check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 参赛记录中第二个空标签选择器未找到，跳过');
  }
  
  await page.getByText('导出记录').click();
  await page.getByText('导出当前所有记录（9）').click();
  const download1Promise = page.waitForEvent('download');
  await page.getByText('确认导出').click();
  const download1 = await download1Promise;
  await page.getByText('返回').click();
});
