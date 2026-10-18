# 插话引导（dsh-steer-note）

> A compact mid-turn steering box for DeepSeek Harness: text + images, read receipts, and unfinished-draft rescue when a turn ends.

在对话输入框上方增加一条插话栏：任务运行时可以随时补充方向，不用把内容塞进主输入框，也不会覆盖主输入框里的草稿，更不会挡住输入框下方的 token 用量和缓存命中显示。

## 安装

从 npm 安装（发布后）：

```bash
dsh plugin --profile web add dsh-steer-note
```

从 GitHub 安装：

```bash
dsh plugin --profile web add github:hffek/dsh-steer-note
```

本地开发目录安装：

```bash
dsh plugin --profile web add link:/absolute/path/to/dsh-steer-note
```

Desktop 请把 `--profile web` 换成 `--profile desktop`。安装后重启 DSH；Host 半侧的 `STEER_NOTE` 系统提示词需要重启才会生效。

## 用法

- 只有当当前会话的 Agent 正在运行时，插话栏才会出现。
- `Enter` 发送，`Shift+Enter` 换行，`Esc` 让输入框失焦。
- 文字和图片可以一起发送：点击图片按钮选择文件，或直接粘贴 / 拖入图片。发送时图片排在文字前面，和原生 composer 的顺序一致。
- 支持 PNG、JPEG、WebP、GIF；张数、单张大小、总大小和边长限制读取原生 `imageLimits` 投影。图片需要当前模型支持视觉输入，否则会返回“当前模型不支持图片输入”。
- 发送使用与原生输入框相同的 `session.prompt({ mode: 'steer' })` 通道，消息会作为正常的“插话”进入会话，并在下一步生效。
- **任务结束时如果插话还没发送，草稿会自动搬到主输入框**：文字追加到现有草稿（空草稿则直接填入），图片用 `conversation.createDrafts` 转成原生草稿附件。主输入框正在发送或暂时不可用时，草稿留在插话栏，并显示“放入输入框”重试按钮。
- 搬运成功后会话切换时清空并释放预览 URL；搬运失败时保留草稿和图片。
- **插话记录/读取状态**：每发送一条插话，历史按钮会记录它，并显示 `已读取`、`待读取`、`已送达` 或 `未读取`。已读取来自 Chat 的 `steering` 节点，待读取来自 `inbox.next-step` / `next-turn`；回合结束仍没读到就标为未读取。点历史条目可把文字回填到插话栏（图片不会回填，需要重新添加）。
- 插话记录目前只保存在当前页面的内存里，刷新/切换会话会清空；它只记录本插件发出的插话，不包含主输入框的历史消息。
- **自定义 steer 语义**：Host 半侧注册一个 `STEER_NOTE` 系统提示词小节，告诉模型“中途到达的用户消息是当前任务的航向修正，不要当成新任务/不要重开任务”。消息本身仍然走原生 `session.prompt`，所以 UI、日志、图片附件和读取状态都保持原生行为。
- 系统提示词小节是 Host 半侧改动，**需要重启 DSH 才会生效**；Client 半侧的 UI 改动可以通过重载插件生效。
- one-shot 子代理会话不显示插话栏。

## 文件

- `client.js`：渲染插话栏、图片预览和插话记录，注册 `conversation.input.dock` slot（输入框上方的全宽区域，排在 todo / goal / queue 之后、最靠近输入框的位置），并通过 `ctx.remote.session.prompt` 提交文字和 image content part；任务结束时用 `inputActions.setDraft` / `inputActions.addAttachments` + `ctx.get('conversation').createDrafts` 把草稿搬到主输入框；历史/读取状态来自 slot 的 `useChat`（`legacy.nodes` 里的 `steering`/`user` source.rpcId）和 `useProjection('inbox')`。客户端插件需在 `inject` 中声明 `remote` 和 `remote.session`，否则 Cordis 会拒绝读取 `remote.session`。
- `index.js`：Host 半侧，注册 `STEER_NOTE` 系统提示词小节（`ctx.systemPrompt.section`），定义“中途消息是航向修正”的模型语义；不提供自定义 Host RPC、不改变消息 source。
- `cordis.patch.yml`：向当前 profile 插入插件行。
- `locale/*.json`：插件管理器显示用的标题和描述。

## 注意

`package.json` 的 `exports` 必须保留 `"./package.json": "./package.json"`。Desktop 的 client-modules 在 `loader.internal` 不可用时通过 `require.resolve('<包名>/package.json')` 定位清单；缺少这个导出会让该包被缓存为“非客户端插件”，直到重启。
