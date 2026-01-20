const fs = require('fs');
const path = require('path');

// 分析抓包数据，提取 API 接口
function analyzeApi(jsonlPath) {
  const content = fs.readFileSync(jsonlPath, 'utf-8');
  const lines = content.trim().split('\n');
  
  const apiList = [];
  const urlSet = new Set();

  for (const line of lines) {
    try {
      const record = JSON.parse(line);
      
      // 提取 API 请求
      if (record.type === 'request' && record.url.includes('/api/')) {
        const urlKey = `${record.method} ${record.url}`;
        
        if (!urlSet.has(urlKey)) {
          urlSet.add(urlKey);
          apiList.push({
            method: record.method,
            url: record.url,
            resourceType: record.resourceType,
            timestamp: record.timestamp,
            hasBody: !!record.postData
          });
        }
      }
    } catch (error) {
      console.error('解析错误:', error.message);
    }
  }

  return apiList;
}

// 生成测试代码模板
function generateTestCode(apiList) {
  let code = `import { test, expect } from '@playwright/test';\n\n`;
  code += `test.describe('API 接口自动化测试', () => {\n\n`;
  
  apiList.forEach((api, index) => {
    code += `  test('${index + 1}. ${api.method} ${api.url.split('/').pop()}', async ({ request }) => {\n`;
    code += `    const response = await request.${api.method.toLowerCase()}('${api.url}'`;
    
    if (api.hasBody) {
      code += `, {\n      data: {\n        // TODO: 添加请求参数\n      }\n    }`;
    }
    
    code += `);\n`;
    code += `    expect(response.status()).toBe(200);\n`;
    code += `    const body = await response.json();\n`;
    code += `    console.log('响应:', body);\n`;
    code += `  });\n\n`;
  });

  code += `});\n`;
  return code;
}

// 主函数
function main() {
  const networkCapturesDir = path.join(__dirname, '..', 'network-captures');
  const files = fs.readdirSync(networkCapturesDir)
    .filter(f => f.endsWith('.jsonl'))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.log('❌ 没有找到抓包文件');
    return;
  }

  // 使用最新的抓包文件
  const latestFile = files[0];
  const jsonlPath = path.join(networkCapturesDir, latestFile);
  
  console.log(`📂 分析文件: ${latestFile}`);
  
  const apiList = analyzeApi(jsonlPath);
  console.log(`\n📊 共找到 ${apiList.length} 个 API 接口:\n`);
  
  apiList.forEach((api, index) => {
    console.log(`${index + 1}. ${api.method.padEnd(6)} ${api.url}`);
  });

  // 生成测试代码
  const testCode = generateTestCode(apiList);
  const outputPath = path.join(__dirname, '..', 'tests', 'generated-api-test.spec.ts');
  
  fs.writeFileSync(outputPath, testCode);
  console.log(`\n✅ 测试代码已生成: ${outputPath}`);
  console.log(`💡 运行测试: npx playwright test generated-api-test.spec.ts`);
}

main();
