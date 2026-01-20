/**
 * 从抓包数据生成完整的 API 测试用例
 */

const fs = require('fs');
const path = require('path');

function analyzeAllApis() {
  const networkCapturesDir = path.join(__dirname, '..', 'network-captures');
  const files = fs.readdirSync(networkCapturesDir)
    .filter(f => f.endsWith('.jsonl'))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.log('❌ 没有找到抓包文件');
    return;
  }

  // 合并所有抓包文件
  const allApis = new Map();
  
  for (const file of files) {
    const jsonlPath = path.join(networkCapturesDir, file);
    const content = fs.readFileSync(jsonlPath, 'utf-8');
    const lines = content.trim().split('\n');
    
    for (const line of lines) {
      try {
        const record = JSON.parse(line);
        
        if (record.type === 'request' && record.url.includes('/api/')) {
          const key = `${record.method}:${record.url}`;
          
          if (!allApis.has(key)) {
            allApis.set(key, {
              method: record.method,
              url: record.url,
              path: record.url.split('/api/')[1],
              hasBody: !!record.postData,
              resourceType: record.resourceType,
              headers: record.headers,
              postData: record.postData
            });
          }
        }
      } catch (error) {
        // 忽略解析错误
      }
    }
  }

  return Array.from(allApis.values());
}

function groupByModule(apis) {
  const modules = {
    'auth': [],
    'user': [],
    'organization': [],
    'member': [],
    'sport': [],
    'other': []
  };

  apis.forEach(api => {
    const path = api.path.toLowerCase();
    
    if (path.includes('login') || path.includes('logout') || path.includes('auth')) {
      modules.auth.push(api);
    } else if (path.includes('user') && !path.includes('organization')) {
      modules.user.push(api);
    } else if (path.includes('organization') || path.includes('org')) {
      modules.organization.push(api);
    } else if (path.includes('member') || path.includes('group')) {
      modules.member.push(api);
    } else if (path.includes('sport')) {
      modules.sport.push(api);
    } else {
      modules.other.push(api);
    }
  });

  return modules;
}

function generateModuleTest(moduleName, apis) {
  let code = `test.describe('${moduleName.toUpperCase()} 模块 API 测试', () => {\n\n`;
  
  apis.forEach((api, index) => {
    const testMethodName = api.method.toLowerCase();
    code += `  test('${index + 1}. ${api.method} ${api.path}', async ({ request }) => {\n`;
    
    if (api.hasBody) {
      code += `    const response = await request.${testMethodName}('${api.url}', {\n`;
      code += `      headers: getAuthHeaders(),\n`;
      code += `      data: {\n`;
      code += `        // TODO: 添加请求参数\n`;
      code += `      }\n`;
      code += `    });\n`;
    } else {
      code += `    const response = await request.${testMethodName}('${api.url}', {\n`;
      code += `      headers: getAuthHeaders()\n`;
      code += `    });\n`;
    }
    
    code += `    expect(response.status()).toBe(200);\n`;
    code += `    const body = await response.json();\n`;
    code += `    console.log('响应:', body);\n`;
    code += `  });\n\n`;
  });

  code += `});\n\n`;
  return code;
}

function generateCompleteTest(modules) {
  let code = `import { test, expect } from '@playwright/test';

// 配置
const API_BASE_URL = 'https://api.aisports.cn';
const TEST_USER = {
  username: 'xrty',
  password: '123456'
};

// 全局存储认证信息
let authToken: string = '';

test.describe('完整 API 自动化测试', () => {

  // 登录获取 token
  test.beforeAll(async ({ request }) => {
    console.log('🔐 正在登录获取 token...');
    
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Origin': 'https://www.aisports.cn',
      'Referer': 'https://www.aisports.cn/',
    };
    
    const loginResponse = await request.post(API_BASE_URL + '/auth/login',
      {
        headers,
        data: {
          user_name: TEST_USER.username,
          password: TEST_USER.password
        }
      }
    );

    if (loginResponse.ok()) {
      const loginData = await loginResponse.json();
      authToken = loginData.data?.token || loginData.token;
      
      if (authToken) {
        console.log('✅ 登录成功，获取 token');
      } else {
        console.log('⚠️ 未能从响应中提取 token');
      }
    } else {
      console.log('❌ 登录失败');
      console.log('状态码:', loginResponse.status());
    }
  });

  // 辅助函数
  function getAuthHeaders() {
    return authToken 
      ? { 
          'Authorization': authToken,
          'Origin': 'https://www.aisports.cn',
          'Referer': 'https://www.aisports.cn/',
        }
      : {};
  }
  
  function checkAuth() {
    if (!authToken) {
      console.log('⚠️ 警告：未获取到 token');
    }
  }

`;
  
  // 生成各模块测试
  for (const [moduleName, apis] of Object.entries(modules)) {
    if (apis.length > 0) {
      code += generateModuleTest(moduleName, apis);
    }
  }

  code += `});

/**
 * 测试统计：
 ${Object.values(modules).flat().length} 个接口
 ${Object.entries(modules).filter(([_, apis]) => apis.length > 0).length} 个模块
 */`;

  return code;
}

function main() {
  console.log('📊 分析所有抓包数据...\n');
  
  const apis = analyzeAllApis();
  const modules = groupByModule(apis);
  
  console.log(`📈 共发现 ${apis.length} 个 API 接口:\n`);
  
  for (const [moduleName, moduleApis] of Object.entries(modules)) {
    if (moduleApis.length > 0) {
      console.log(`📦 ${moduleName.toUpperCase()} (${moduleApis.length}):`);
      moduleApis.forEach(api => {
        console.log(`   ${api.method.padEnd(6)} ${api.path}`);
      });
      console.log('');
    }
  }

  // 生成完整的测试文件
  const testCode = generateCompleteTest(modules);
  const outputPath = path.join(__dirname, '..', 'tests', 'all-apis-test.spec.ts');
  
  fs.writeFileSync(outputPath, testCode);
  console.log(`\n✅ 完整测试文件已生成: ${outputPath}`);
  console.log(`💡 运行测试: npx playwright test all-apis-test.spec.ts`);
}

main();
