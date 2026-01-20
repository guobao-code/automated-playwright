#!/usr/bin/env node

/**
 * Playwright 录制辅助脚本
 * 帮助系统地录制平台的所有功能模块
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.aisports.cn/integratedServicesSy';

// 录制配置
const recordingModules = [
  {
    name: '认证模块',
    file: 'recording-auth.spec.ts',
    steps: [
      '密码登录',
      '用户信息查看',
      '退出登录'
    ]
  },
  {
    name: '排行榜模块',
    file: 'recording-leaderboard.spec.ts',
    steps: [
      '自然排行榜 - 日期筛选',
      '自然排行榜 - 年级筛选',
      '自然排行榜 - 测试类型筛选',
      '自然排行榜 - 数据导出',
      '最强榜 - 赛项选择',
      '最强榜 - 数据导出',
      '赛事排行榜 - 赛事选择',
      '赛事排行榜 - 数据导出'
    ]
  },
  {
    name: '体育测试模块',
    file: 'recording-sports.spec.ts',
    steps: [
      '测试项目列表',
      '50米跑测试',
      '立定跳远测试',
      '一分钟跳绳测试',
      '年级筛选',
      '班级筛选',
      '数据导出'
    ]
  },
  {
    name: '组织管理模块',
    file: 'recording-organization.spec.ts',
    steps: [
      '组织列表',
      '成员列表',
      '成员搜索',
      '成员详情',
      '成员导入',
      '成员导出',
      '班级列表',
      '角色管理'
    ]
  },
  {
    name: '测试计划模块',
    file: 'recording-testplan.spec.ts',
    steps: [
      '测试计划列表',
      '新建测试计划',
      '选择测试项目',
      '设置评分标准',
      '选择测试对象',
      '编辑测试计划',
      '删除测试计划',
      '查看测试结果',
      '导出测试数据'
    ]
  },
  {
    name: '赛事管理模块',
    file: 'recording-event.spec.ts',
    steps: [
      '赛事列表',
      '新建赛事',
      '选择赛项',
      '设置赛事时间',
      '编辑赛事',
      '删除赛事',
      '赛事详情',
      '查看参赛选手',
      '查看赛事成绩',
      '发布赛事',
      '导出赛事数据'
    ]
  }
];

console.log(`
╔════════════════════════════════════════════════════════════╗
║           Playwright 录制辅助工具                          ║
╚════════════════════════════════════════════════════════════╝

📋 可用模块：
`);

recordingModules.forEach((module, index) => {
  console.log(`  ${index + 1}. ${module.name}`);
  console.log(`     文件: ${module.file}`);
  console.log(`     步骤数: ${module.steps.length}`);
  module.steps.forEach((step, stepIndex) => {
    console.log(`       ${stepIndex + 1}. ${step}`);
  });
  console.log('');
});

console.log(`
🚀 使用方法：

方法1: 手动录制（推荐）
-----------------------
1. 选择要录制的模块
2. 运行以下命令：

  npx playwright codegen ${BASE_URL} --output=tests/recording-auth.spec.ts

3. 在打开的浏览器中，按照指南中的步骤进行操作
4. 完成后保存录制的文件

方法2: 自动化录制脚本
-----------------------
需要您手动在浏览器中操作，但脚本会提供指导。

💡 录制提示：
- 慢速操作，确保每一步都被录制
- 点击所有按钮和链接
- 填写所有表单字段
- 测试所有筛选条件
- 等待页面加载完成
- 等待API响应完成
- 测试导出功能

📁 录制文件保存位置：
  ${path.join(process.cwd(), 'tests', 'recording-*.spec.ts')}

📖 查看完整指南：
  cat RECORDING_GUIDE.md

🎯 下一步：
选择一个模块开始录制，建议从"认证模块"开始！

按 Ctrl+C 退出
`);

// 监听用户输入
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n选择要录制的模块 (输入数字 1-6，或按 Ctrl+C 退出):');

rl.on('line', (input) => {
  const choice = parseInt(input.trim());
  
  if (choice >= 1 && choice <= recordingModules.length) {
    const module = recordingModules[choice - 1];
    console.log(`\n✅ 已选择: ${module.name}`);
    console.log(`📝 录制步骤: ${module.steps.join(' -> ')}`);
    console.log(`\n请运行以下命令开始录制:`);
    console.log(`\n  npx playwright codegen ${BASE_URL} --output=tests/${module.file}\n`);
    console.log(`💡 提示：录制时请按照上述步骤依次操作\n`);
    
    rl.close();
    
    // 尝试启动录制（如果环境允许）
    const { spawn } = require('child_process');
    try {
      console.log('🚀 正在启动录制工具...\n');
      spawn('npx', ['playwright', 'codegen', BASE_URL, `--output=tests/${module.file}`], {
        stdio: 'inherit',
        shell: true
      });
    } catch (error) {
      console.log('⚠️  无法自动启动录制工具，请手动运行上述命令');
    }
  } else if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
    console.log('\n👋 再见！');
    rl.close();
    process.exit(0);
  } else {
    console.log('❌ 无效选择，请输入 1-6 之间的数字，或输入 exit 退出\n');
    console.log('选择要录制的模块 (输入数字 1-6，或按 Ctrl+C 退出):');
  }
});

rl.on('SIGINT', () => {
  console.log('\n\n👋 再见！');
  rl.close();
  process.exit(0);
});
