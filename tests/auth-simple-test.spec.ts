import { test, expect } from '@playwright/test';

const config = {
  baseURL: 'https://platform.xunransports.com',
  login: {
    username: 'xrty',
    password: 'Aa123456'
  }
};

test.describe('认证模块 - 基于录制的测试', () => {
  
  test('登录流程', async ({ page }) => {
    console.log('🚀 开始登录流程测试');
    
    // 访问登录页面
    await page.goto(`${config.baseURL}/integratedServicesSy`);
    
    // 点击密码登录
    await page.getByText('密码登录').click();
    
    // 填写登录信息
    await page.getByRole('textbox', { name: '用户名/手机号' }).click();
    await page.getByRole('textbox', { name: '用户名/手机号' }).fill(config.login.username);
    await page.getByRole('textbox', { name: '请输入密码' }).click();
    await page.getByRole('textbox', { name: '请输入密码' }).fill(config.login.password);
    
    // 点击登录按钮
    await page.getByRole('dialog').getByText('登录', { exact: true }).click();
    
    // 验证登录成功
    await expect(page.getByText('工作台')).toBeVisible({ timeout: 10000 });
    
    console.log('✅ 登录成功');
  });

  test('用户信息编辑', async ({ page }) => {
    console.log('🚀 开始用户信息编辑测试');
    
    // 登录
    await page.goto(`${config.baseURL}/integratedServicesSy`);
    await page.getByText('密码登录').click();
    await page.getByRole('textbox', { name: '用户名/手机号' }).fill(config.login.username);
    await page.getByRole('textbox', { name: '请输入密码' }).fill(config.login.password);
    await page.getByRole('dialog').getByText('登录', { exact: true }).click();
    await expect(page.getByText('工作台')).toBeVisible({ timeout: 10000 });
    
    // 等待页面加载
    await page.waitForTimeout(3000);
    
    // 点击用户头像
    await page.locator('img').nth(1).click();
    
    // 点击编辑
    await page.getByText('编辑').click();
    
    // 编辑昵称
    await page.getByRole('textbox', { name: '请填写昵称' }).click();
    await page.getByRole('textbox', { name: '请填写昵称' }).fill('测试账号1');
    
    // 保存
    await page.getByText('保存').click();
    
    // 等待保存完成
    await page.waitForTimeout(2000);
    
    console.log('✅ 用户信息编辑成功');
  });
});
