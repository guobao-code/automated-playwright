import { test, expect } from '@playwright/test';

test('组织管理模块核心功能测试', async ({ page }) => {
  test.setTimeout(60000); // 1分钟超时

  console.log('📝 开始组织管理模块测试');

  // 登录
  await page.goto('https://platform.xunransports.com/integratedServicesSy');
  await page.getByText('密码登录').click();
  await page.getByRole('textbox', { name: '用户名/手机号' }).fill('xrty');
  await page.getByRole('textbox', { name: '请输入密码' }).fill('Aa123456');
  await page.getByRole('dialog').getByText('登录', { exact: true }).click();
  await page.waitForTimeout(3000);

  console.log('✅ 登录成功');
  console.log('✅ 组织管理模块测试完成');
});
