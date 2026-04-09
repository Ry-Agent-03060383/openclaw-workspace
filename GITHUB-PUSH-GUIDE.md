# GitHub 代码推送指南

## 第一步：获取 Token（密码）

1. 打开 https://github.com/settings/tokens
2. 点击 **"Generate new token (classic)"**
3. 填写：
   - Note（备注）: `openclaw`
   - Expiration: 无限或 30 天
4. 勾选权限: **`repo`** ✅
5. 点击页面底部 **"Generate token"**
6. **复制**生成的字符串（很长一串），这就是你的密码

---

## 第二步：克隆仓库

打开终端/命令行，执行：

```bash
git clone https://github.com/Ry-Agent-03060383/openclaw-workspace.git
```

会提示输入：
- Username: `Ry-Agent-03060383`
- Password: **粘贴刚才复制的 Token**

---

## 第三步：推送代码

```bash
cd openclaw-workspace
git push
```

---

## 提示

- Token 只用输入一次，后续会记住
- 如果第二步卡住不动，试试：先按回车，再输入用户名，再回车，再粘贴 Token（粘贴后不显示是正常的）
- Windows 用户如果遇到问题，可以装 Git Bash 或 WSL