import { test, expect } from '@playwright/test';

const config = {
  baseUrl: 'https://platform.xunransports.com/integratedServicesSy',
  login: {
    username: 'xrty',
    password: 'Aa123456'
  }
};

// 封装登录函数
type PlaywrightPage = import('@playwright/test').Page;

interface LoginCredentials {
  username: string;
  password: string;
}

interface AppConfig {
  baseUrl: string;
  login: LoginCredentials;
}

async function login(page: PlaywrightPage): Promise<void> {
  const cfg = config as AppConfig;
  await page.goto(cfg.baseUrl);
  await page.getByText('密码登录').click();
  await page.getByRole('textbox', { name: '用户名/手机号' }).fill(cfg.login.username);
  await page.getByRole('textbox', { name: '请输入密码' }).fill(cfg.login.password);
  await page.getByRole('dialog').getByText('登录', { exact: true }).click();
  // 改为等待“工作台”可见
  await expect(page.getByText('工作台')).toBeVisible({ timeout: 15000 });
}

test('排行榜录制功能测试', async ({ page }) => {
  // 步骤1: 登录
  await login(page);

  // 步骤: 导航到体育测试板块
  await page.getByText('工作台').click();
  await page.waitForSelector('text=数据管理', { timeout: 5000 });
  await page.getByText('数据管理').click();
  await page.waitForSelector('text=数据可视化', { timeout: 5000 });
  await page.getByText('数据可视化').click();
  await page.waitForSelector('text=体育测试板块', { timeout: 5000 });
  await page.getByText('体育测试板块').click();
  await expect(page.locator('text=自然排行榜')).toBeVisible(); // 添加断言验证导航

  // 步骤: 最强榜
  await page.getByRole('button', { name: '最强榜 所有项目汇总' }).click();
  await page.waitForSelector('text=开始日期', { timeout: 25000 });
  await expect(page.locator('text=最强榜')).toBeVisible(); // 添加断言验证最强榜加载

  // 步骤: 日期筛选
  await page.getByRole('textbox', { name: '开始日期' }).click();
  await page.locator('.ant-picker-cell-inner').filter({ hasText: '1' }).first().click(); // 改进日期选择
  await page.locator('.ant-picker-cell-inner').filter({ hasText: '31' }).first().click();
  await expect(page.locator('input[placeholder*="开始日期"]').first()).toHaveValue(/\d{4}-\d{2}-\d{2}/); // 添加断言验证日期

  // 步骤: 测试类型筛选
  await page.locator('.ant-select-selection-wrap > .ant-select-selection-search').first().click();
  await page.waitForSelector('text=自由测试', { timeout: 5000 });
  await page.getByText('自由测试').click();
  await page.locator('[id="__qiankun_microapp_wrapper_for_common__"]').getByTitle('自由测试').click();
  await page.getByText('打包测试').click();
  await expect(page.locator('.ant-select-selection-item').first()).toContainText('打包测试'); // 添加断言验证筛选

  // 步骤: 项目选择
  await page.locator('.ant-select.ant-cascader > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-overflow').click();
  await page.waitForSelector('.ant-cascader-checkbox-inner', { timeout: 5000 });
  // 改进：循环选择前6项，避免硬编码nth
  const checkboxes = page.locator('.ant-cascader-checkbox-inner');
  for (let i = 0; i < 6 && i < await checkboxes.count(); i++) {
    await checkboxes.nth(i).click();
  }
  await expect(page.locator('.ant-cascader-checkbox:checked')).toHaveCount(6); // 添加断言验证项目选择

  // 步骤: 性别筛选
  await page.locator('#rc_select_28').click();
  await page.waitForSelector('text=男', { timeout: 5000 });
  await page.getByText('男').click();
  await page.locator('[id="__qiankun_microapp_wrapper_for_common__"]').getByTitle('男').click();
  await page.getByText('女').click();
  await page.locator('.w-\\[36px\\]').click();
  await expect(page.locator('.ant-select-selection-item').nth(1)).toContainText('女'); // 添加断言验证性别

  // 步骤: 最强榜 所有项目汇总
  await page.getByRole('button', { name: '最强榜 所有项目汇总' }).click();
  await page.waitForSelector('text=最强榜', { timeout: 25000 });
  await expect(page.locator('text=最强榜')).toBeVisible(); // 确认最强榜页面加载

  // 步骤: 导出排行榜
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('导出当前排行榜').click();
  const download = await downloadPromise;
  await expect(download.suggestedFilename()).toMatch(/排行榜|leaderboard/); // 添加断言验证下载

  // 步骤: 赛事排行榜
  await page.getByText('赛事排行榜').click();
  await page.waitForSelector('text=赛项', { timeout: 5000 });
  await expect(page.locator('text=赛事排行榜')).toBeVisible(); // 添加断言验证切换

  // 步骤: 赛项筛选
  await page.getByRole('combobox', { name: '赛项 :' }).click();
  await page.getByText('50米跑', { exact: true }).click();
  await page.locator('[id="__qiankun_microapp_wrapper_for_common__"]').getByTitle('米跑').click();
  await page.getByText('一分钟跳绳', { exact: true }).click();
  await expect(page.locator('.ant-select-selection-item').last()).toContainText('一分钟跳绳'); // 添加断言验证赛项

  // 步骤: 赛事详情
  await page.getByRole('tab', { name: '联谊赛' }).click();
  await page.waitForSelector('text=上海"AI赋能・跳绳比赛（二期）', { timeout: 5000 });
  await page.getByText('上海"AI赋能・跳绳比赛（二期）').click();
  await expect(page.locator('text=上海"AI赋能・跳绳比赛（二期）')).toBeVisible(); // 添加断言验证赛事选择

  // 步骤: 进一步筛选
  await page.getByRole('combobox', { name: '赛项 :' }).click();
  await page.getByText('跳绳项目').click();
  await page.getByText('秒个人竞速赛').click();
  await page.getByRole('combobox', { name: '组别 :' }).click();
  await page.getByText('小学男子组').click();
  await page.locator('#root').getByTitle('小学男子组').click();
  await page.getByText('小学女子组').click();
  await page.locator('.w-\\[36px\\]').click();
  await expect(page.locator('.ant-select-selection-item').filter({ hasText: '小学女子组' })).toBeVisible(); // 添加断言验证组别

  // 步骤: 切换到校园赛
  await page.getByRole('tab', { name: '校园赛' }).click();
  await expect(page.locator('text=校园赛')).toBeVisible(); // 添加断言验证切换

  console.log('✅ 排行榜录制功能测试完成');
});
