import { test, expect } from '@playwright/test';

test.describe('赛事管理模块核心功能测试', () => {

  test.beforeEach(async ({ page }) => {
    // 导航到页面
    await page.goto('https://platform.xunransports.com/integratedServicesSy');

    // 登录
    await page.getByText('密码登录').click();
    await page.getByRole('textbox', { name: '用户名/手机号' }).fill('xrty');
    await page.getByRole('textbox', { name: '请输入密码' }).fill('Aa123456');
    await page.getByRole('dialog').getByText('登录', { exact: true }).click();

    // 导航到赛事活动
    await page.getByText('工作台').click();
    await page.getByText('活动管理').click();
    await page.getByText('赛事活动').click();
  });

  test('步骤1: 查看已有赛事详情', async ({ page }) => {
    // 点击查看第一次测试赛事
    await page.locator('xpath=//*[@id="root-master"]/div[1]/div[1]/div[2]/div/div[2]/div/div[2]/div/div/div[1]/div[2]/div[1]', { exact: true }).click();

    // 验证页面导航成功
    await expect(page.getByText('返回')).toBeVisible();

    // 返回列表
    await page.getByText('返回').click();
  });

  test('步骤2: 赛项筛选功能', async ({ page }) => {
    // 打开赛项筛选下拉框
    await page.getByRole('combobox', { name: '赛项 :' }).click();

    // 选择50米跑
    await page.getByText('50米跑', { exact: true }).click();

    // 清除筛选
    await page.getByLabel('close-circle').locator('svg').click();
  });

  test('步骤3: 新建赛事活动', async ({ page }) => {
    // 点击新建按钮
    await page.getByText('+新建').click();

    // 填写赛事名称
    await page.getByRole('textbox', { name: '*赛事名称：' }).fill('测试赛事');

    // 选择赛项
    await page.getByRole('checkbox', { name: '50米跑' }).check();

    // 点击保存
    await page.getByText('保存').click();
  });

  test('步骤4: 编辑赛事', async ({ page }) => {
    // 查找并点击编辑按钮（假设有赛事可以编辑）
    const editButtons = page.getByText('编辑');
    const count = await editButtons.count();

    if (count > 0) {
      await editButtons.first().click();
      await page.getByText('返回').click();
    }
  });


});
