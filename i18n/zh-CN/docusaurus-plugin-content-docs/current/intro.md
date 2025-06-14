---
sidebar_position: 1
---

# RankscaleAI 介绍

让我们用 **RankscaleAI** 在不到5分钟内创建高质量的SEO优化内容。

## 开始使用

开始使用 **RankscaleAI** 构建您的内容策略。

### 您需要什么

- [Node.js](https://nodejs.org/en/download/) 版本 18.0 或以上：
  - 安装 Node.js 时，建议勾选所有与依赖项相关的复选框。

## 生成新的博文

使用我们的 **AI驱动的内容生成器** 生成一篇新的博文。

```bash
cd rankscale-ai
npm run generate-blog
```

您可以输入以下命令在开发模式下启动网站：

```bash
npm run start
```

此命令启动本地开发服务器并打开浏览器窗口。大多数更改都会实时反映，无需重新启动服务器。

## 生成内容

```bash
npm run generate
```

此命令将静态内容生成到 `build` 目录中，可以使用任何静态内容托管服务提供服务。

## 部署

使用 SSH：

```bash
USE_SSH=true npm run deploy
```

不使用 SSH：

```bash
GIT_USER=<您的GitHub用户名> npm run deploy
```

如果您使用 GitHub pages 进行托管，此命令是构建网站并推送到 `gh-pages` 分支的便捷方式。

## 主要功能

- 🤖 **AI驱动**: 使用最新的AI技术生成高质量内容
- 🔍 **SEO优化**: 自动优化搜索引擎排名
- 📊 **分析报告**: 详细的性能分析和建议
- 🎯 **关键词优化**: 智能关键词研究和优化
- 📝 **内容策略**: 个性化的内容营销策略 