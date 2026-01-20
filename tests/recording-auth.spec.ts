import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://platform.xunransports.com/integratedServicesSy');
  await page.getByText('密码登录').click();
  await page.getByRole('textbox', { name: '用户名/手机号' }).click();
  await page.getByRole('textbox', { name: '用户名/手机号' }).fill('xrty');
  await page.getByRole('textbox', { name: '请输入密码' }).click();
  await page.getByRole('textbox', { name: '请输入密码' }).fill('Aa123456');
  await page.getByRole('dialog').getByText('登录', { exact: true }).click();
  await page.locator('img').nth(1).click();
  await page.getByText('编辑').click();
  await page.getByRole('textbox', { name: '请填写昵称' }).click();
  await page.getByRole('textbox', { name: '请填写昵称' }).fill('测试账号1');
  await page.getByText('保存').click();
});
