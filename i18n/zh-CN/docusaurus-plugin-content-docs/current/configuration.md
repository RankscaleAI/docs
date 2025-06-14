---
sidebar_position: 4
---

# 配置指南

详细了解如何配置 RankscaleAI 以满足您的需求。

## 基础配置

### 环境变量

创建 `.env` 文件并配置以下环境变量：

```bash
# API配置
RANKSCALE_API_KEY=your_api_key_here
RANKSCALE_API_URL=https://api.rankscale.ai

# 数据库配置  
DATABASE_URL=postgresql://username:password@localhost:5432/rankscale

# 缓存配置
REDIS_URL=redis://localhost:6379

# 日志级别
LOG_LEVEL=info
```

### 配置文件结构

主配置文件 `rankscale.config.js`：

```javascript
module.exports = {
  // 基本设置
  apiKey: process.env.RANKSCALE_API_KEY,
  baseUrl: process.env.RANKSCALE_API_URL,
  
  // 内容生成设置
  contentGeneration: {
    model: 'gpt-4-turbo',
    maxTokens: 2000,
    temperature: 0.7,
    language: 'zh-CN'
  },
  
  // SEO设置
  seo: {
    enableAutoOptimization: true,
    targetKeywordDensity: 2.5,
    generateMetaTags: true,
    addStructuredData: true
  },
  
  // 分析设置
  analytics: {
    enableTracking: true,
    trackingId: 'GA-XXXXXXXXX',
    enableHeatmaps: false
  }
};
```

## 高级配置

### 内容生成配置

#### 模型选择

支持多种AI模型：

| 模型名称 | 用途 | 特点 |
|----------|------|------|
| `gpt-4-turbo` | 高质量内容生成 | 最佳质量，较慢 |
| `gpt-3.5-turbo` | 快速内容生成 | 平衡质量和速度 |
| `claude-3` | 长文本生成 | 擅长长文档 |

```javascript
contentGeneration: {
  model: 'gpt-4-turbo',
  fallbackModel: 'gpt-3.5-turbo', // 主模型不可用时的备选
  maxTokens: 4000,
  temperature: 0.7,
  topP: 0.9,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1
}
```

#### 提示词模板

自定义不同类型内容的提示词：

```javascript
prompts: {
  blogPost: `
    创建一篇关于 {topic} 的博客文章。
    目标关键词：{keywords}
    目标受众：{audience}
    文章长度：{wordCount} 字
    语调：{tone}
  `,
  productDescription: `
    为产品 {productName} 创建描述。
    主要特性：{features}
    目标关键词：{keywords}
    USP：{uniqueSellingPoint}
  `
}
```

### SEO优化配置

#### 关键词策略

```javascript
seo: {
  keywordStrategy: {
    primaryKeywordDensity: 2.5,     // 主关键词密度 %
    secondaryKeywordDensity: 1.5,   // 次要关键词密度 %
    maxKeywordsPerContent: 10,      // 每篇内容最大关键词数
    enableLSIKeywords: true,        // 启用语义相关关键词
    avoidKeywordStuffing: true      // 避免关键词堆砌
  }
}
```

#### 元标签配置

```javascript
metaTags: {
  titleLength: {
    min: 30,
    max: 60,
    optimal: 55
  },
  descriptionLength: {
    min: 120,
    max: 160,
    optimal: 155
  },
  autoGenerate: true,
  includeKeywords: true
}
```

### 多语言配置

支持多语言内容生成：

```javascript
localization: {
  defaultLocale: 'zh-CN',
  supportedLocales: ['zh-CN', 'en-US', 'ja-JP'],
  autoTranslate: false,
  translationProvider: 'google', // 'google' | 'azure' | 'custom'
  
  // 每种语言的特殊配置
  localeConfig: {
    'zh-CN': {
      model: 'gpt-4-turbo',
      tone: 'professional',
      culturalAdaptation: true
    },
    'en-US': {
      model: 'gpt-4-turbo',
      tone: 'conversational',
      culturalAdaptation: true
    }
  }
}
```

## 性能配置

### 缓存设置

```javascript
cache: {
  enabled: true,
  provider: 'redis', // 'memory' | 'redis' | 'file'
  ttl: 3600, // 缓存时间（秒）
  
  // Redis配置
  redis: {
    host: 'localhost',
    port: 6379,
    password: '',
    db: 0
  }
}
```

### 限流配置

```javascript
rateLimit: {
  enabled: true,
  maxRequests: 100,      // 每小时最大请求数
  windowMs: 3600000,     // 时间窗口（毫秒）
  skipSuccessfulRequests: false,
  
  // 不同用户类型的限制
  tiers: {
    free: { maxRequests: 50 },
    pro: { maxRequests: 500 },
    enterprise: { maxRequests: -1 } // 无限制
  }
}
```

## 安全配置

### API密钥管理

```javascript
security: {
  apiKeyRotation: {
    enabled: true,
    rotationInterval: 2592000000, // 30天（毫秒）
    notifyBeforeExpiry: 604800000  // 7天前通知
  },
  
  // IP白名单
  ipWhitelist: [
    '192.168.1.0/24',
    '10.0.0.0/8'
  ],
  
  // 请求签名验证
  requestSigning: {
    enabled: true,
    algorithm: 'HMAC-SHA256',
    secretKey: process.env.SIGNING_SECRET
  }
}
```

## 监控配置

### 日志配置

```javascript
logging: {
  level: 'info', // 'debug' | 'info' | 'warn' | 'error'
  format: 'json',
  
  // 输出目标
  transports: [
    {
      type: 'console',
      level: 'info'
    },
    {
      type: 'file',
      filename: 'logs/app.log',
      level: 'warn',
      maxSize: '10MB',
      maxFiles: 5
    }
  ]
}
```

### 指标收集

```javascript
metrics: {
  enabled: true,
  endpoint: '/metrics',
  
  // 自定义指标
  custom: {
    contentGenerationTime: true,
    seoScoreDistribution: true,
    userEngagementMetrics: true
  }
}
```

## 配置验证

运行配置验证命令：

```bash
# 验证配置文件
npm run config:validate

# 测试API连接
npm run config:test-connection

# 检查所有依赖
npm run config:check-deps
```

## 常见配置问题

### API密钥问题

**问题**：API密钥无效
**解决方案**：
1. 检查 `.env` 文件中的密钥格式
2. 确认密钥未过期
3. 验证密钥权限

### 内存使用过高

**问题**：应用占用内存过多
**解决方案**：
1. 启用缓存以减少重复计算
2. 调整批处理大小
3. 配置垃圾回收参数

```javascript
// 优化内存使用
performance: {
  batchSize: 10,        // 批处理大小
  maxConcurrency: 3,    // 最大并发数
  gcInterval: 300000,   // GC间隔（毫秒）
  memoryThreshold: 0.8  // 内存使用阈值
}
```

## 下一步

配置完成后，您可以：

- [创建第一篇内容](./create-content) - 开始实际操作
- [查看API文档](./api-reference) - 了解程序化接口
- [监控和分析](./analytics) - 追踪性能指标 