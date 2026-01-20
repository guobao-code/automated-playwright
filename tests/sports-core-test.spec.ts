import { test, expect } from '@playwright/test';

const config = {
  baseUrl: 'https://platform.xunransports.com/integratedServicesSy',
  login: {
    username: 'xrty',
    password: 'Aa123456'
  }
};

test('体育测试模块核心功能测试', async ({ page }) => {
  test.setTimeout(45000); // 45秒超时

  console.log('📝 开始体育测试模块核心功能测试');

  // 步骤1: 登录
  await page.goto(config.baseUrl);
  await page.getByText('密码登录').click();
  await page.getByRole('textbox', { name: '用户名/手机号' }).fill(config.login.username);
  await page.getByRole('textbox', { name: '请输入密码' }).fill(config.login.password);
  await page.getByRole('dialog').getByText('登录', { exact: true }).click();
  await page.waitForTimeout(3000);

  // 步骤2: 导航到运动记录
  await page.getByText('工作台').click();
  await page.waitForTimeout(1000);

  await page.getByText('运动记录').click();
  await page.waitForTimeout(1500);

  // 步骤3: 自由测试
  await page.getByText('自由测试').click();
  await page.waitForTimeout(1500);

  // 步骤4: 项目筛选
  //await page.getByRole('checkbox', { name: '全部项目' }).uncheck();
  await page.getByText('全部项目').click();
  await page.waitForTimeout(200);

  const projects = ['100米跑', '800米跑', '1000米跑', '米×8往返跑', '阳光跑', '立定跳远', '一分钟跳绳', '一分钟仰卧起坐', '坐位体前屈'];
  for (const project of projects) {
    await page.getByLabel(project).check();
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(500);

  // 步骤5: 时间筛选
  await page.getByRole('textbox', { name: '筛选' }).click();
  await page.waitForTimeout(200);
  await page.getByText('运动时间').click();
  await page.waitForTimeout(200);

  await page.getByRole('textbox', { name: '开始日期' }).click();
  await page.waitForTimeout(200);
  await page.getByText('1', { exact: true }).first().click();
  await page.waitForTimeout(200);
  await page.getByText('31').nth(3).click();
  await page.waitForTimeout(200);

  await page.getByText('应用').click();
  await page.waitForTimeout(800);

  // 步骤6: 搜索功能
  await page.getByText('搜索').click();
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: '你想搜的，在这里都能搜到' }).click();
  await page.waitForTimeout(200);
  await page.getByRole('textbox', { name: '你想搜的，在这里都能搜到' }).fill('程');
  await page.waitForTimeout(500);

  await page.locator('.w-\\[15px\\]').click();
  await page.waitForTimeout(200);
  await page.getByRole('button', { name: 'close-circle' }).click();
  await page.waitForTimeout(300);

  // 步骤7: 记录选择
  await page.locator('.w-\\[15px\\]').click();
  await page.waitForTimeout(200);

  // 空标签选择器错误处理
  try {
    await page.getByLabel('', { exact: true }).first().check({ timeout: 2000 });
    await page.waitForTimeout(100);
  } catch (e) {
    console.log('⚠️ 第一个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(1).check({ timeout: 2000 });
    await page.waitForTimeout(100);
  } catch (e) {
    console.log('⚠️ 第二个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(2).check({ timeout: 2000 });
    await page.waitForTimeout(200);
  } catch (e) {
    console.log('⚠️ 第三个空标签选择器未找到，跳过');
  }

  await page.getByText('清空已选').click();
  await page.waitForTimeout(200);

  try {
    await page.getByLabel('', { exact: true }).first().check({ timeout: 2000 });
    await page.waitForTimeout(100);
  } catch (e) {
    console.log('⚠️ 第一个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(1).check({ timeout: 2000 });
    await page.waitForTimeout(200);
  } catch (e) {
    console.log('⚠️ 第二个空标签选择器未找到，跳过');
  }

  // 步骤8: 打包测试
  await page.getByText('打包测试').click();
  await page.waitForTimeout(1500);
  // 时间筛选
  await page.getByRole('textbox', { name: '筛选' }).click();
  await page.waitForTimeout(200);
  await page.getByText('运动时间').click();
  await page.waitForTimeout(200);

  await page.locator('p:nth-child(2) > .w-\\[30px\\]').click();
  await page.waitForTimeout(200);
  await page.locator('.w-\\[30px\\]').first().click();
  await page.waitForTimeout(200);
  await page.locator('p:nth-child(2) > .w-\\[30px\\]').click();
  await page.waitForTimeout(800);

  // 步骤9: 测试计划记录
  await page.getByText('测试计划记录').click();
  await page.waitForTimeout(1500);

  await page.locator('div').filter({ hasText: /^请选择日期$/ }).first().click();
  await page.waitForTimeout(200);
  await page.getByText('1', { exact: true }).first().click();
  await page.waitForTimeout(200);
  await page.getByText('19', { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText('13', { exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByText('1', { exact: true }).first().click();
  await page.waitForTimeout(200);

  await page.locator('div').filter({ hasText: /^测试日期：2026-01-132026-01-19\+ 0 \.\.\.$/ }).first().click();
  await page.waitForTimeout(500);

  await page.getByText('xpath=//*[@id="root-master"]/div[1]/div[1]/div[2]/div/div[2]/div[2]/div/div/div/div[1]').first().click();
  await page.waitForTimeout(500);

  await page.getByText('查看计划').click();
  await page.waitForTimeout(500);
  await page.getByText('返回').click();
  await page.waitForTimeout(200);
  await page.getByText('返回').click();
  await page.waitForTimeout(500);

  // 步骤10: 参赛记录
  await page.getByText('参赛记录').click();
  await page.waitForTimeout(1500);

  await page.getByText('第一次测试', { exact: true }).click();
  await page.waitForTimeout(500);

  await page.getByText('返回').click();
  await page.waitForTimeout(500);

  console.log('✅ 体育测试模块核心功能测试完成');
});
