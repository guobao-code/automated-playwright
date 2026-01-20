const { request } = require('@playwright/test');

async function testLogin() {
  console.log('🔐 开始测试登录...\n');

  try {
    // 创建 API 请求上下文
    const apiRequestContext = await request.newContext({
      baseURL: 'https://api.aisports.cn',
      extraHTTPHeaders: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'https://www.aisports.cn',
        'Referer': 'https://www.aisports.cn/',
      }
    });

    // 尝试登录
    console.log('📡 发送登录请求...');
    const response = await apiRequestContext.post('/auth/login', {
      data: {
        user_name: 'xrty',
        password: '123456'
      }
    });

    console.log(`📊 状态码: ${response.status()}`);
    console.log(`📦 响应头:`, response.headers());

    const body = await response.text();
    console.log(`📄 响应体:`, body);

    if (response.ok()) {
      const jsonData = JSON.parse(body);
      console.log('\n✅ 登录成功！');
      console.log('Token:', jsonData.token || jsonData.data?.token || '未找到 token');
    } else {
      console.log('\n❌ 登录失败');
    }

    await apiRequestContext.dispose();
  } catch (error) {
    console.error('❌ 错误:', error);
  }
}

testLogin();
