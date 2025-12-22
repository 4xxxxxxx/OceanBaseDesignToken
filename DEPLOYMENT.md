# 自动部署到 Vercel 配置说明

项目已配置 GitHub Actions，当代码推送到 `main` 分支时会自动部署到 Vercel。

## 🚀 快速开始（推荐方式）

**最简单的方式：使用 Vercel 的 GitHub Integration**

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New..." > "Project"
3. 选择你的 GitHub 仓库：`4xxxxxxx/OceanBaseDesignToken`
4. Vercel 会自动检测项目配置（已配置 `vercel.json`）
5. 点击 "Deploy"

完成！之后每次推送到 `main` 分支，Vercel 会自动部署。

---

## 📋 使用 GitHub Actions 部署（高级方式）

如果你想使用 GitHub Actions 进行更精细的控制，请按照以下步骤配置：

### 配置步骤

### 1. 获取 Vercel 凭证

在 Vercel 项目中获取以下信息：

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入项目设置（Settings）
3. 在 "General" 页面找到：
   - **Project ID** - 项目 ID
   - **Org ID** - 组织 ID（在项目设置页面可以看到）

### 2. 创建 Vercel Token

1. 访问 [Vercel Account Settings > Tokens](https://vercel.com/account/tokens)
2. 点击 "Create Token"
3. 输入名称（如：`github-actions-deploy`）
4. 选择过期时间（建议选择 "No Expiration"）
5. 复制生成的 Token（只显示一次，请妥善保存）

### 3. 配置 GitHub Secrets

1. 访问 GitHub 仓库：https://github.com/4xxxxxxx/OceanBaseDesignToken
2. 进入 **Settings** > **Secrets and variables** > **Actions**
3. 点击 **New repository secret**，添加以下三个 secrets：

   - **Name**: `VERCEL_TOKEN`
     **Value**: 你在步骤 2 中创建的 Vercel Token

   - **Name**: `VERCEL_ORG_ID`
     **Value**: 你的 Vercel 组织 ID

   - **Name**: `VERCEL_PROJECT_ID`
     **Value**: 你的 Vercel 项目 ID

### 4. 验证配置

配置完成后：

1. 推送到 `main` 分支或手动触发 workflow
2. 在 GitHub 仓库的 **Actions** 标签页查看部署状态
3. 部署成功后，Vercel 会自动更新你的网站

## 手动触发部署

如果需要手动触发部署：

1. 访问 GitHub 仓库的 **Actions** 标签页
2. 选择 "Deploy to Vercel" workflow
3. 点击 "Run workflow" 按钮

## 注意事项

- 确保 Vercel Token 有足够的权限
- 如果项目是第一次部署，需要先在 Vercel 中创建项目
- 部署过程可能需要几分钟时间
- 可以在 GitHub Actions 中查看详细的部署日志

## 故障排查

如果部署失败，请检查：

1. GitHub Secrets 是否正确配置
2. Vercel Token 是否有效
3. VercEL_ORG_ID 和 VERCEL_PROJECT_ID 是否正确
4. 查看 GitHub Actions 日志获取详细错误信息

