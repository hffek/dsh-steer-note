# 插话引导（dsh-steer-note）

[![npm version](https://img.shields.io/npm/v/dsh-steer-note)](https://www.npmjs.com/package/dsh-steer-note)
[![dshbase listed](https://dshbase.com/badges/dsh-steer-note.svg)](https://dshbase.com/plugins/dsh-steer-note/)

> 任务运行时，随时插一句话调整方向。文字、图片、文件都能发；没发出去的草稿，回合结束会自动回到主输入框。

![运行中的插话栏：文字、图片、文件 chip 和插话记录都在这条独立输入框里](assets/steer-box.png)

## 主要功能

- **运行中插话**：独立输入框，不覆盖主输入框，也不挡 token/缓存显示。
- **文字 + 图片 + 文件**：选择、粘贴、拖入都行；图片和文件都走原生附件链路。
- **草稿不丢**：任务结束时自动搬进主输入框；切会话/刷新后文字和图片会恢复。
- **插话记录**：已读取/待读取/已送达/未读取；未读取的可以取消。
- **原生链路**：消息仍是普通 user/steering，历史、日志、附件和主输入框一致。

## 安装

从 npm 安装：

```bash
dsh plugin --profile web add dsh-steer-note
```

GitHub 备用：

```bash
dsh plugin --profile web add github:hffek/dsh-steer-note
```

Desktop 把 `--profile web` 换成 `--profile desktop`。安装后重启 DSH，Host 侧的 `STEER_NOTE` 系统提示词才会生效。

## 使用

- 任务运行时，输入框上方会出现插话栏；`Enter` 发送，`Shift+Enter` 换行。
- 图片按钮选图片，回形针选任意文件，也可以直接粘贴/拖入。
- 任务结束时还没发的内容会自动搬进主输入框；也可以点「放入输入框」。
- 时钟按钮查看插话记录；未读取的插话可以取消。

<details>
<summary>更多细节</summary>

- 插话栏出现条件：当前会话正在运行，或这个会话还有未发送草稿。
- 图片支持 PNG/JPEG/WebP/GIF，限制读取原生 `imageLimits`；模型不支持视觉输入时会提示。
- 普通文件通过 `conversation.createDrafts` 注册并后台上传，发送时用 `{ type: 'file', receiptId }`；上传中显示进度，失败显示原因。
- 文字写入 localStorage；图片尽量保存（受容量限制，太大时提示）；普通文件只在当前页面内存，切换会话保留，刷新会丢。
- 插话记录按会话保存；状态来自 Chat 的 `steering` 节点和 `inbox.next-step` / `next-turn`，回合结束仍没读到就标未读取。
- 取消未读取插话调用原生 `updateQueue({ action: { kind: 'remove' } })`；已读取/已失效会提示无法取消。
- 记录只回填文字，图片/文件需要重新添加；记录和文字/图片草稿只在本机，不包含主输入框历史；文件通过原生上传服务上传。
- `STEER_NOTE` 告诉模型中途消息是航向修正，不要当成新任务；它需要重启 DSH。
- one-shot 子代理会话不显示插话栏。
- 本地开发安装：`dsh plugin --profile web add link:/absolute/path/to/dsh-steer-note`。

</details>

<details>
<summary>兼容性与实现</summary>

测试环境：DSH Desktop `2.0.18` / DSH `0.2.1-rc.2`（Web profile）。

依赖：

- Slot：`conversation.input.dock`，以及 `useSessionStatus` / `useSession` / `useProjection` / `useInput` / `useChat` / `inputActions`
- Remote：`ctx.remote.session.prompt({ mode: 'steer' })`、`updateQueue`
- 客户端内部服务：`createDrafts` / `releaseDraftAttachment(s)`、`fileUploads`、`serializeDraftAttachments`

降级：

- `updateQueue` 不可用：不显示取消按钮
- 附件接口不可用：文字仍搬到主输入框，图片/文件留在插话栏并提示手动添加
- `fileUploads` 不可用：普通文件不能发送/显示进度，图片和文字不受影响
- `useChat` 返回空或 inbox 不可用：历史状态停留在“已送达”

注意：文件附件和图片搬家用了客户端内部服务，不是公开文档 API；DSH 升级后需要回归测试。文本/图片/文件发送、历史、取消都走原生公开接口。

文件结构：

- `client.js`：插话栏、图片/文件预览、记录、拖拽、草稿救援
- `index.js`：Host 侧 `STEER_NOTE` 系统提示词
- `cordis.patch.yml`：profile 插件行
- `locale/*.json`：插件管理器文案

开发者备注：`package.json` 的 `exports` 必须保留 `"./package.json": "./package.json"`，否则 Desktop client-modules 可能把包缓存为“非客户端插件”。

</details>

## 声明

- 本插件主要由 AI（DeepSeek Harness / deepseek-flash）编写，维护者负责需求、审查与真机测试。
- npm：https://www.npmjs.com/package/dsh-steer-note
- MIT License。

<details>
<summary>English</summary>

**dsh-steer-note** is a compact mid-turn steering box for DeepSeek Harness.

While an agent is running, add direction without touching the main composer: text, images, and files are sent as native steering messages. If the turn ends before you send, the unfinished draft is moved into the main composer. Interjection history tracks read/pending status and lets you cancel messages that have not been read. Text and image drafts survive conversation switches and page reloads; file drafts are runtime-only.

### Install

```bash
dsh plugin --profile web add dsh-steer-note
```

For Desktop, use `--profile desktop` instead. Restart DSH once so the `STEER_NOTE` system-prompt section takes effect.

</details>
