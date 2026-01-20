# 自动化 Playwright 测试项目

## 🎯 项目简介

这是一个基于 Playwright 的深度自动化测试项目，实现了对体育管理平台的完整业务流程测试，包含登录、导航、排行榜、测试计划、赛事管理、评分标准、组织管理、成员导入等功能的深度验证。

## 📋 测试功能覆盖

### ✅ 已实现功能
- **用户认证** - 登录流程 + API响应验证
- **导航系统** - 主要功能模块导航
- **排行榜功能** - 自然排行榜、赛事排行榜、筛选导出
- **测试计划管理** - 创建、编辑、搜索、验证
- **赛事管理** - 赛事创建、发布
- **评分标准管理** - 文件上传、解析、下载
- **组织管理** - 成员搜索、筛选、导入
- **高级功能** - 通讯地址编辑、信息修改

### 🔥 深度验证层次
1. **UI层验证** - 界面状态、元素可见性
2. **API层验证** - 请求参数、响应状态、数据结构
3. **数据层验证** - 数据持久化、完整性检查、文件验证

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 运行测试

#### 运行所有测试
```bash
npm test
```

#### 运行完整功能测试（推荐）
```bash
npm run test:complete
```

#### 有界面运行测试
```bash
npm run test:complete:headed
```

#### 运行 API 测试
```bash
npm run test:api
```

#### 查看测试报告
```bash
npm run show-report
```

## 📁 项目结构

```
automated-playwright/
├── tests/
│   ├── complete-test.spec.ts       # 主要测试文件（完整功能测试）
│   ├── all-apis-test.spec.ts      # 所有API测试
│   ├── api-advanced.spec.ts       # 高级API测试
│   ├── api-test.spec.ts           # 基础API测试
│   ├── api-config.ts              # API配置
│   ├── network-capture-optimized.spec.ts  # 优化的网络抓包测试
│   ├── quick-capture.spec.ts      # 快速抓包测试
│   ├── coverage-checklist.md      # 功能覆盖检查清单
│   └── deep-testing-guide.md      # 深度测试指南
├── network-captures/             # 网络抓包数据
├── playwright-report/             # 测试报告
├── playwright.config.ts           # Playwright配置
├── package.json                  # 项目配置
└── tsconfig.json                 # TypeScript配置
```

## 🎨 测试特点

### 1. 深度验证
- API 请求和响应验证
- 数据持久化验证
- 文件操作完整性验证
- 业务逻辑正确性验证

### 2. 网络抓包
- 自动捕获所有 API 请求和响应
- JSONL 格式保存，便于分析
- 包含时间戳、请求头、响应状态等信息

### 3. 模块化设计
- 使用 `test.step()` 组织测试步骤
- 清晰的测试结构
- 易于维护和扩展

### 4. 智能等待
- 使用 `expect()` 断言替代硬编码等待
- 网络请求监听
- 状态变化检测

## 🔧 配置说明

### 测试配置（在 complete-test.spec.ts 中）
```typescript
const config = {
  baseURL: 'https://www.aisports.cn',
  login: {
    username: 'xrty',
    password: '123456'
  },
  testData: {
    testPlanName: '自动化测试计划',
    eventName: '自动化赛事',
    searchKeyword: '王'
  },
  timeout: {
    short: 5000,
    medium: 10000,
    long: 30000
  }
};
```

### Playwright 配置（playwright.config.ts）
- 支持 Chrome、Firefox、Safari 三个浏览器
- 自动重试（CI 环境下）
- 失败时自动截图和录制
- 网络抓包配置

## 📊 测试报告

测试运行完成后，会生成详细的 HTML 报告：

1. 运行测试后，自动生成报告
2. 使用 `npm run show-report` 查看报告
3. 报告包含：
   - 测试执行时间
   - 成功/失败统计
   - 截图和视频（失败时）
   - 网络抓包数据

## 🐛 调试技巧

### 1. 有界面运行
```bash
npm run test:complete:headed
```

### 2. 单独运行某个测试步骤
在测试文件中临时注释掉不需要的步骤

### 3. 查看网络抓包
抓包数据保存在 `network-captures/` 目录下：
- `api-capture-*.jsonl` - API 请求
- `response-bodies-*.jsonl` - API 响应

### 4. 增加超时时间
```typescript
test.setTimeout(600000); // 增加到10分钟
```

## 📈 性能优化

### 1. 并行执行
默认启用，可在 `playwright.config.ts` 中配置 `workers` 数量

### 2. 跳过慢速测试
```typescript
test.skip('慢速测试', async ({ page }) => {
  // 测试代码
});
```

### 3. 只运行特定测试
```bash
npx playwright test -g "登录系统"
```

## 🔄 持续集成

### CI/CD 配置示例
```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:complete
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📝 开发指南

### 添加新测试

1. 在 `tests/` 目录下创建新的测试文件
2. 使用 `test.describe()` 组织相关测试
3. 使用 `test.step()` 组织测试步骤
4. 添加深度验证断言

### 测试命名规范
- 测试文件：`功能名-test.spec.ts`
- 测试描述：简洁描述测试目的
- 测试步骤：描述具体操作

### 断言最佳实践
```typescript
// ✅ 推荐：明确的断言
await expect(page.getByText('创建成功')).toBeVisible();
expect(download.suggestedFilename()).toMatch(/.*\.xlsx?$/);

// ❌ 避免：只有日志
console.log('创建成功');
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

如有问题，请提交 Issue 或 Pull Request。

---

**版本**: 2.0.0  
**更新日期**: 2026-01-16  
**维护者**: 自动化测试团队