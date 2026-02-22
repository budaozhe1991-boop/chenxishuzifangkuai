# 陈星的数字积木 (Chen Xing's Number Blocks)

一个快节奏的数学益智游戏。求和数字以达到目标，并防止积木堆叠到顶部。

## 如何在本地运行

1.  克隆仓库：
    ```bash
    git clone <your-repo-url>
    cd <repo-name>
    ```

2.  安装依赖：
    ```bash
    npm install
    ```

3.  启动开发服务器：
    ```bash
    npm run dev
    ```

## 如何部署到 Vercel

1.  将代码推送到 GitHub 仓库。
2.  在 [Vercel 控制台](https://vercel.com/new) 中导入该仓库。
3.  Vercel 会自动识别 Vite 配置。
4.  **重要：** 如果你在代码中使用了 Gemini API，请在 Vercel 的项目设置中添加环境变量 `GEMINI_API_KEY`。
5.  点击 "Deploy"。

## 游戏规则

- **目标：** 点击方块中的数字，使它们相加等于屏幕顶部显示的目标数字。
- **消除：** 成功凑出目标数字后，选中的方块会被消除。
- **失败：** 如果数字方块堆积到屏幕顶部的红线，游戏结束。
- **模式：**
    - **经典模式：** 每次消除后底部新增一行。
    - **计时模式：** 每 50 秒强制新增一行。
