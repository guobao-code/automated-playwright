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
  await page.locator('.ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow').click();
  await page.locator('.ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow').click();
  await page.getByText('成员及管理者').click();
  await page.locator('.w-\\[15px\\]').click();
  await page.getByRole('textbox', { name: '请输入姓名 / 学号 / 年级 / 班级，支持模糊查找' }).fill('程');
  await page.locator('.w-\\[50px\\].h-\\[40px\\] > .w-\\[15px\\]').click();
  await page.locator('.w-\\[50px\\].h-\\[40px\\] > .w-\\[24px\\]').click();
  await page.locator('.w-\\[40px\\]').click();
  await page.getByText('导入').click();
  await page.getByText('导入成员').click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('.w-\\[87px\\]').click();
  const download = await downloadPromise;
  await page.getByText('下一步').click();
  await page.getByRole('button', { name: '点击/拖拽上传文件 支持上传 .xls 或 .xlsx' }).click();
  await page.getByRole('button', { name: '点击/拖拽上传文件 支持上传 .xls 或 .xlsx' }).setInputFiles('学校类型_成员信息模板-田林.xlsx');
  await page.getByText('完成').click();
  await page.getByText('一年级').click();
  await page.getByText('1班').click();
  await page.getByText('程咬金').click();
  await page.locator('.absolute.w-\\[36px\\]').click();
  await page.getByText('二年级').click();
  await page.getByText('七年级').click();
  await page.getByText('6班').click();
  await page.locator('.ant-table-cell.ant-table-selection-column.ant-table-cell-row-hover > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page.getByText('导出已选').click();
  const download1Promise = page.waitForEvent('download');
  await page.getByText('确认导出').click();
  const download1 = await download1Promise;
  await page.locator('.w-\\[19px\\].h-\\[165px\\]').click();
  await page.locator('.w-\\[12px\\]').click();
  await page.locator('.w-\\[20px\\]').click();
  await page.getByRole('tab', { name: '管理者' }).click();
  await page.getByRole('checkbox', { name: '男' }).uncheck();
  await page.getByRole('checkbox', { name: '女' }).uncheck();
  await page.getByRole('checkbox', { name: '男' }).check();
  
  try {
    await page.getByLabel('').nth(5).uncheck({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 组织管理中第一个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(1).uncheck({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 组织管理中第二个空标签选择器未找到，跳过');
  }
  
  try {
    await page.getByLabel('', { exact: true }).nth(1).check({ timeout: 2000 });
  } catch (e) {
    console.log('⚠️ 组织管理中第三个空标签选择器未找到，跳过');
  }
  
  await page.getByRole('checkbox', { name: '女' }).check();
  await page.getByText('王响').first().click();
  await page.locator('.absolute.w-\\[36px\\]').click();
  await page.locator('div:nth-child(8) > .ml-\\[16px\\] > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page.getByText('删除选中成员').click();
  await page.getByText('确认删除').click();
  await page.getByText('邀请管理者').click();
  await page.getByRole('textbox', { name: '请输入管理者姓名' }).click();
  await page.getByRole('textbox', { name: '请输入管理者姓名' }).fill('刘希');
  await page.getByRole('textbox', { name: '请输入管理者手机号' }).click();
  await page.getByRole('textbox', { name: '请输入管理者姓名' }).click();
  await page.getByRole('textbox', { name: '请输入管理者姓名' }).fill('程国保');
  await page.getByRole('textbox', { name: '请输入管理者手机号' }).click();
  await page.getByRole('textbox', { name: '请输入管理者手机号' }).fill('18654190132');
  await page.getByText('下一步').click();
  await page.getByText('发送邀请短信').nth(1).click();
  await page.locator('.w-\\[24px\\].h-\\[24px\\]').click();
  await page.getByText('发送邀请短信').nth(1).click();
  await page.getByText('确认发送').click();
  await page.getByText('已发送').click();
  await page.getByRole('button', { name: 'Close' }).click();
});
