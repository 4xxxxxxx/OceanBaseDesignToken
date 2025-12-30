# 故障排查指南

## Vercel 部署错误：Build Canceled - Unverified Commit

### 问题描述
Vercel 显示错误："The Deployment was canceled because it was created with an unverified commit"

### 原因
Vercel 项目设置中启用了 "Require commit verification"，但 Git commit 没有 GPG 签名验证。

### 解决方案

#### 方案 1：关闭 Vercel 的 Commit Verification（推荐）

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **Git**
4. 找到 **"Require commit verification"** 或 **"Require verified commits"** 选项
5. 将其关闭（关闭状态）
6. 保存设置

之后重新推送代码，Vercel 会自动部署。

#### 方案 2：使用 GitHub Actions 手动部署

如果已配置 GitHub Actions，可以手动触发部署：

1. 访问 GitHub 仓库的 **Actions** 标签页
2. 选择 **"Deploy to Vercel"** workflow
3. 点击 **"Run workflow"** 按钮
4. 选择分支（通常是 `main`）
5. 点击 **"Run workflow"**

这种方式会绕过 Vercel 的自动部署验证。

#### 方案 3：配置 GPG 签名（长期方案）

如果需要保持 commit verification，需要配置 GPG 签名：

1. 生成 GPG 密钥：
   ```bash
   gpg --full-generate-key
   ```

2. 获取 GPG 密钥 ID：
   ```bash
   gpg --list-secret-keys --keyid-format=long
   ```

3. 配置 Git 使用 GPG：
   ```bash
   git config --global user.signingkey YOUR_GPG_KEY_ID
   git config --global commit.gpgsign true
   ```

4. 将 GPG 公钥添加到 GitHub：
   - 导出公钥：`gpg --armor --export YOUR_GPG_KEY_ID`
   - 访问 GitHub Settings → SSH and GPG keys → New GPG key
   - 粘贴公钥并保存

5. 重新提交并推送：
   ```bash
   git commit --amend -S -m "your message"
   git push --force-with-lease
   ```

### 推荐操作

**最简单的方式**：使用方案 1，关闭 Vercel 的 commit verification。这对于大多数项目来说已经足够安全。

