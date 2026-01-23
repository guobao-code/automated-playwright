import { test, expect, type Page } from '@playwright/test';

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
  // 改为等待“工作台”可见，避免 URL 未跳转导致误判
  await expect(page.getByText('工作台')).toBeVisible({ timeout: 15000 });
}

test('排行榜模块可用功能测试', async ({ page }) => {
  test.setTimeout(60000); // 60秒超时

  // 步骤1: 登录
  await login(page);

  // 步骤2: 导航到体育测试板块
  await page.getByText('工作台').click();
  await page.waitForSelector('text=数据管理', { timeout: 5000 });
  await page.getByText('数据管理').click();
  await page.waitForSelector('text=数据可视化', { timeout: 5000 });
  await page.getByText('数据可视化').click();
  await page.waitForSelector('text=体育测试板块', { timeout: 5000 });
  await page.getByText('体育测试板块').click();
  await expect(page.locator('text=自然排行榜')).toBeVisible(); // 添加断言验证导航

  // 步骤3: 自然排行榜
  await page.getByText('自然排行榜').click();
  await page.waitForSelector('text=最强榜', { timeout: 5000 });

  // 步骤4: 测试最强榜
  await page.getByRole('button', { name: '最强榜 所有项目汇总' }).click();
  await page.waitForSelector('text=开始日期', { timeout: 25000 }); // 调整超时

  // 步骤5: 日期筛选
  await page.getByRole('textbox', { name: '开始日期' }).click();
  await page.waitForSelector('text=1', { timeout: 5000 });
  await page.getByText('1', { exact: true }).nth(1).click();
  await page.getByText('31', { exact: true }).nth(1).click();
  await expect(page.locator('input[placeholder*="开始日期"]').first()).toHaveValue(/\d{4}-\d{2}-\d{2}/); // 添加断言验证日期选择

  // 步骤6: 测试类型筛选
  await page.locator('.ant-select-selection-wrap > .ant-select-selection-search').first().click();
  await page.waitForSelector('text=自由测试', { timeout: 5000 });
  await page.getByText('自由测试').click();
  await page.locator('[id="__qiankun_microapp_wrapper_for_common__"]').getByTitle('自由测试').click();
  await page.getByText('打包测试').click();
  await expect(page.locator('.ant-select-selection-item').first()).toContainText('打包测试'); // 添加断言验证筛选

  // 步骤7: 项目选择
  await page.locator('.ant-select.ant-cascader > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-overflow').click();
  await page.waitForSelector('.ant-cascader-checkbox-inner', { timeout: 5000 });
  await page.locator('.ant-cascader-checkbox-inner').first().click();
  await page.locator('li:nth-child(2) > .ant-cascader-checkbox > .ant-cascader-checkbox-inner').click();
  await page.locator('li:nth-child(3) > .ant-cascader-checkbox > .ant-cascader-checkbox-inner').click();
  await expect(page.locator('.ant-cascader-checkbox:checked')).toHaveCount(3); // 添加断言验证项目选择

  // 步骤8: 性别筛选
  await page.locator('#rc_select_28').click();
  await page.waitForSelector('text=男', { timeout: 5000 });
  await page.getByText('男').click();
  await page.locator('[id="__qiankun_microapp_wrapper_for_common__"]').getByTitle('男').click();
  await page.getByText('女').click();
  await page.locator('.w-\\[36px\\]').click();
  await expect(page.locator('.ant-select-selection-item').nth(1)).toContainText('女'); // 添加断言验证性别筛选

  // 步骤9: 赛事排行榜
  await page.getByText('赛事排行榜').click();
  await page.waitForSelector('text=联谊赛', { timeout: 5000 });
  
  // 步骤9-1: 赛事类型筛选
  await page.getByText('联谊赛').click();
  await page.waitForSelector('text=校园赛', { timeout: 5000 });
  await page.getByText('校园赛').click();
  await expect(page.locator('text=校园赛')).toBeVisible(); // 添加断言验证赛事类型

  // 步骤10: 赛项筛选
  await page.locator('.ant-select:has-text("全部") .ant-select-selector').click();
  await page.waitForSelector('text=50米', { timeout: 5000 });
  const dropdown = page.locator('.ant-select-dropdown:visible');
  await dropdown.getByText('50米', { exact: true }).click();
  await page.locator('[id="__qiankun_microapp_wrapper_for_common__"]').getByTitle('米跑').click();
  await page.getByText('一分钟跳绳', { exact: true }).click();
  await expect(page.locator('.ant-select-selection-item').last()).toContainText('一分钟跳绳'); // 添加断言验证赛项筛选

  console.log('✅ 排行榜模块核心功能测试完成');
});
