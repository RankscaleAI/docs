// Worker脚本用于处理Docusaurus静态网站
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 处理API路由（如果需要的话）
    if (url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ 
        message: "RankscaleAI API",
        version: "1.0.0",
        status: "active"
      }), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      });
    }
    
    // 处理健康检查
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ 
        status: "healthy",
        timestamp: new Date().toISOString()
      }), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      });
    }
    
    // 添加安全头部
    const response = await env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);
    
    // 添加安全和性能头部
    newResponse.headers.set("X-Frame-Options", "DENY");
    newResponse.headers.set("X-Content-Type-Options", "nosniff");
    newResponse.headers.set("X-XSS-Protection", "1; mode=block");
    newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    
    // 为静态资产添加缓存头部
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
      newResponse.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }
    
    return newResponse;
  },
}; 