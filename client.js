window.__ModuleLoader__.load({
  id: 'dsh-steer-note',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'steer-note';

    /** Simplified Chinese copy. */
    const zh = {
      'placeholder': '插话，让 DeepSeek 调整方向…',
      'button': '插话',
      'button.sending': '发送中',
      'button.aria': '发送插话，让当前任务调整方向',
      'input.aria': '插话内容',
      'hint': 'Enter 发送，Shift+Enter 换行；可粘贴或拖入图片',
      'status.sent': '已插入，下一步生效',
      'status.unavailable': '当前任务已结束或暂不可插话',
      'status.error': '插话失败：{message}',
      'image.add': '添加图片',
      'image.add.aria': '添加图片到插话',
      'image.remove': '移除图片',
      'image.unsupported': '仅支持 PNG、JPEG、WebP、GIF 图片',
      'image.invalid': '图片格式不支持或文件已损坏',
      'image.tooMany': '最多只能添加 {count} 张图片',
      'image.tooLarge': '单张图片不能超过 {size}',
      'image.totalTooLarge': '图片总大小不能超过 {size}',
      'image.dimensionTooLarge': '图片边长不能超过 {size}px',
      'image.tooManyPixels': '图片像素总数超出限制',
      'image.modelUnsupported': '当前模型不支持图片输入，请换用支持图片的模型',
      'image.sendFailed': '图片发送失败：{reason}',
      'image.readFailed': '图片读取失败：{message}',
      'transfer.busy': '主输入框正在发送，稍后再试',
      'transfer.unavailable': '主输入框暂不可用，内容先留在插话栏',
      'transfer.failed': '未能放入输入框：{message}',
      'transfer.partial': '文字已放入输入框，但图片未能放入：{message}',
      'transfer.retry': '放入输入框',
      'history.button': '插话记录',
      'history.button.aria': '查看插话记录和读取状态',
      'history.title': '最近插话',
      'history.clear': '清空',
      'history.clear.aria': '清空插话记录',
      'history.status.read': '已读取',
      'history.status.pending': '待读取',
      'history.status.delivered': '已送达',
      'history.status.unread': '未读取',
      'history.status.cancelled': '已取消',
      'history.cancel': '取消',
      'history.cancel.aria': '取消这条插话',
      'history.cancelling': '取消中',
      'history.cancelled': '已取消',
      'history.cancelGone': '已被读取或已失效，无法取消',
      'history.cancelFailed': '取消失败：{message}',
      'history.cancelUnavailable': '当前无法取消这条插话',
      'draft.imagesNotSaved': '图片太大，切换会话后不会保留',
      'history.images': '{count} 张图',
      'history.imageOnly': '（只有图片）',
      'history.imagesNotKept': '插话记录只回填文字，图片需要重新添加',
    };

    /** English copy. */
    const en = {
      'placeholder': 'Steer: add direction mid-task…',
      'button': 'Steer',
      'button.sending': 'Sending',
      'button.aria': 'Send a steering message to redirect the running task',
      'input.aria': 'Steering message',
      'hint': 'Enter to send, Shift+Enter for a new line; paste or drop images too',
      'status.sent': 'Inserted — applies at the next step',
      'status.unavailable': 'The task is no longer running or cannot accept steering',
      'status.error': 'Steering failed: {message}',
      'image.add': 'Add images',
      'image.add.aria': 'Add images to the steering message',
      'image.remove': 'Remove image',
      'image.unsupported': 'Only PNG, JPEG, WebP, and GIF images are supported',
      'image.invalid': 'The image format is unsupported or the file is damaged',
      'image.tooMany': 'You can add at most {count} images',
      'image.tooLarge': 'Each image must be at most {size}',
      'image.totalTooLarge': 'Total image size must be at most {size}',
      'image.dimensionTooLarge': 'Each image side must be at most {size}px',
      'image.tooManyPixels': 'The image pixel count exceeds the limit',
      'image.modelUnsupported': 'The current model does not accept image input; switch to a vision-capable model',
      'image.sendFailed': 'Image send failed: {reason}',
      'image.readFailed': 'Image read failed: {message}',
      'transfer.busy': 'The main composer is sending; try again in a moment',
      'transfer.unavailable': 'The main composer is unavailable; the draft stays here',
      'transfer.failed': 'Could not move the draft into the composer: {message}',
      'transfer.partial': 'Text moved to the composer, but the images could not be moved: {message}',
      'transfer.retry': 'Move to composer',
      'history.button': 'Interjections',
      'history.button.aria': 'View interjection history and read status',
      'history.title': 'Recent interjections',
      'history.clear': 'Clear',
      'history.clear.aria': 'Clear interjection history',
      'history.status.read': 'Read',
      'history.status.pending': 'Pending',
      'history.status.delivered': 'Delivered',
      'history.status.unread': 'Unread',
      'history.status.cancelled': 'Cancelled',
      'history.cancel': 'Cancel',
      'history.cancel.aria': 'Cancel this interjection',
      'history.cancelling': 'Cancelling',
      'history.cancelled': 'Cancelled',
      'history.cancelGone': 'It was already read or is no longer pending; it cannot be cancelled',
      'history.cancelFailed': 'Cancel failed: {message}',
      'history.cancelUnavailable': 'This interjection cannot be cancelled right now',
      'draft.imagesNotSaved': 'The images are too large to keep across sessions',
      'history.images': '{count} images',
      'history.imageOnly': '(images only)',
      'history.imagesNotKept': 'History restores text only; re-add the images',
    };

    const CSS = `
      .dsh-steer-note-root {
        box-sizing: border-box;
        width: calc(100% - var(--dsh-composer-side-clearance) - var(--dsh-composer-side-clearance) - var(--dsh-composer-dock-inset) - var(--dsh-composer-dock-inset) - var(--dsh-composer-dock-inset) - var(--dsh-composer-dock-inset));
        max-width: calc(var(--dsh-composer-card-max-width) - var(--dsh-composer-dock-inset) - var(--dsh-composer-dock-inset) - var(--dsh-composer-dock-inset) - var(--dsh-composer-dock-inset));
        margin: 0 auto;
        padding: 5px 6px 5px 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: var(--dsw-radius-md, 8px);
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        transition: border-color 120ms ease;
      }
      .dsh-steer-note-root:focus-within {
        border-color: var(--dsw-alias-brand-primary);
      }
      .dsh-steer-note-previews {
        display: flex;
        gap: 6px;
        padding: 0 0 6px 26px;
        overflow-x: auto;
      }
      .dsh-steer-note-preview {
        position: relative;
        flex: none;
        width: 42px;
        height: 42px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 7px;
        overflow: hidden;
        background: var(--dsw-alias-bg-layer-2);
      }
      .dsh-steer-note-preview img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .dsh-steer-note-preview-remove {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 16px;
        height: 16px;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: var(--dsw-alias-bg-overlay);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        cursor: pointer;
      }
      .dsh-steer-note-preview-remove:hover:not(:disabled) {
        background: var(--dsw-alias-bg-layer-2);
      }
      .dsh-steer-note-preview-remove:disabled {
        cursor: default;
        opacity: 0.5;
      }
      .dsh-steer-note-preview-remove:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 1px;
      }
      .dsh-steer-note-row {
        display: flex;
        align-items: flex-end;
        gap: 8px;
      }
      .dsh-steer-note-icon {
        flex: none;
        display: grid;
        place-items: center;
        width: 18px;
        height: 26px;
        color: var(--dsw-alias-brand-primary);
      }
      .dsh-steer-note-input {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        max-height: 96px;
        padding: 3px 0;
        border: 0;
        outline: 0;
        resize: none;
        overflow-y: auto;
        background: transparent;
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 13px;
        line-height: 20px;
      }
      .dsh-steer-note-input::placeholder {
        color: var(--dsw-alias-label-secondary);
        opacity: 1;
      }
      .dsh-steer-note-attach {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        padding: 0;
        border: 1px solid transparent;
        border-radius: 7px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        cursor: pointer;
      }
      .dsh-steer-note-attach:hover:not(:disabled) {
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
      }
      .dsh-steer-note-attach:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 1px;
      }
      .dsh-steer-note-attach:disabled {
        cursor: default;
        opacity: 0.45;
      }
      .dsh-steer-note-history {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 3px;
        height: 28px;
        padding: 0 6px;
        border: 1px solid transparent;
        border-radius: 7px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 11px;
        line-height: 1;
        cursor: pointer;
      }
      .dsh-steer-note-history:hover:not(:disabled),
      .dsh-steer-note-history[aria-expanded='true'] {
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
      }
      .dsh-steer-note-history:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 1px;
      }
      .dsh-steer-note-history:disabled {
        cursor: default;
        opacity: 0.45;
      }
      .dsh-steer-note-history-count {
        min-width: 10px;
        text-align: center;
      }
      .dsh-steer-note-history-panel {
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-height: 160px;
        margin: 0 0 6px 26px;
        overflow-y: auto;
      }
      .dsh-steer-note-history-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 0 2px 2px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
      }
      .dsh-steer-note-history-clear {
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--dsw-alias-brand-primary);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
      }
      .dsh-steer-note-history-clear:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 2px;
      }
      .dsh-steer-note-history-item {
        display: flex;
        align-items: center;
        width: 100%;
        border-radius: 6px;
      }
      .dsh-steer-note-history-item:hover {
        background: var(--dsw-alias-bg-layer-2);
      }
      .dsh-steer-note-history-recall {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 1;
        min-width: 0;
        padding: 4px 2px;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: 12px;
        text-align: left;
        cursor: pointer;
      }
      .dsh-steer-note-history-recall:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: -1px;
      }
      .dsh-steer-note-history-cancel {
        flex: none;
        padding: 0 4px;
        border: 0;
        background: transparent;
        color: var(--dsw-alias-state-error-primary);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }
      .dsh-steer-note-history-cancel:hover:not(:disabled) {
        text-decoration: underline;
      }
      .dsh-steer-note-history-cancel:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 1px;
      }
      .dsh-steer-note-history-cancel:disabled {
        cursor: default;
        opacity: 0.45;
      }
      .dsh-steer-note-history-status {
        flex: none;
        width: 16px;
        text-align: center;
        color: var(--dsw-alias-label-secondary);
      }
      .dsh-steer-note-history-status[data-status='read'] {
        color: var(--dsw-alias-state-success-primary);
      }
      .dsh-steer-note-history-status[data-status='pending'] {
        color: var(--dsw-alias-brand-primary);
      }
      .dsh-steer-note-history-status[data-status='unread'] {
        color: var(--dsw-alias-state-error-primary);
      }
      .dsh-steer-note-history-status[data-status='cancelled'] {
        color: var(--dsw-alias-label-secondary);
      }
      .dsh-steer-note-history-text {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-steer-note-history-meta {
        flex: none;
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
      }
      .dsh-steer-note-button {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        height: 28px;
        padding: 0 9px;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: 7px;
        background: transparent;
        color: var(--dsw-alias-brand-primary);
        font: inherit;
        font-size: 12px;
        font-weight: 500;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
      }
      .dsh-steer-note-button:hover:not(:disabled) {
        background: var(--dsw-alias-bg-layer-2);
      }
      .dsh-steer-note-button:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 1px;
      }
      .dsh-steer-note-button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      .dsh-steer-note-status {
        padding: 2px 0 1px 26px;
        font-size: 12px;
        line-height: 18px;
        color: var(--dsw-alias-label-secondary);
      }
      .dsh-steer-note-status[data-kind='ok'] {
        color: var(--dsw-alias-state-success-primary);
      }
      .dsh-steer-note-status[data-kind='info'] {
        color: var(--dsw-alias-label-secondary);
      }
      .dsh-steer-note-status[data-kind='error'] {
        color: var(--dsw-alias-state-error-primary);
      }
      .dsh-steer-note-retry {
        flex: none;
        height: 28px;
        padding: 0 2px;
        border: 0;
        background: transparent;
        color: var(--dsw-alias-brand-primary);
        font: inherit;
        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        text-decoration: underline;
        cursor: pointer;
      }
      .dsh-steer-note-retry:hover:not(:disabled) {
        color: var(--dsw-alias-label-primary);
      }
      .dsh-steer-note-retry:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 1px;
      }
      .dsh-steer-note-retry:disabled {
        cursor: default;
        opacity: 0.45;
      }
    `;

    const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    const HISTORY_STATUS_ICON = {
      read: '✓',
      pending: '·',
      delivered: '↑',
      unread: '✗',
      cancelled: '–',
    };
    const DEFAULT_IMAGE_LIMITS = {
      maxImagesPerMessage: 20,
      maxImageBytes: 20 * 1024 * 1024,
      maxMessageImageBytes: 200 * 1024 * 1024,
      maxImageDimension: 8192,
      mediaTypes: IMAGE_TYPES,
    };

    /** Chat bubble with a direction arrow: the interjection mark. */
    function LeadIcon() {
      return h('svg', {
        viewBox: '0 0 16 16',
        width: 15,
        height: 15,
        fill: 'none',
        'aria-hidden': true,
      },
      h('path', {
        d: 'M2 3.9C2 2.85 2.85 2 3.9 2h8.2C13.15 2 14 2.85 14 3.9v6.2c0 1.05-.85 1.9-1.9 1.9H7.35l-2.9 2.1c-.44.32-1.05.05-1.05-.49V12h-.5C2.85 12 2 11.15 2 10.1V3.9Z',
        stroke: 'currentColor',
        strokeWidth: 1.25,
        strokeLinejoin: 'round',
      }),
      h('path', {
        d: 'M5 7h5.6m0 0L8.7 5.1M10.6 7 8.7 8.9',
        stroke: 'currentColor',
        strokeWidth: 1.25,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }),
      );
    }

    /** Small return arrow for the action button. */
    function SendIcon() {
      return h('svg', {
        viewBox: '0 0 16 16',
        width: 12,
        height: 12,
        fill: 'none',
        'aria-hidden': true,
      },
      h('path', {
        d: 'M3 4v4.1c0 .8.7 1.5 1.5 1.5H12m0 0L9.2 6.8M12 9.6l-2.8 2.8',
        stroke: 'currentColor',
        strokeWidth: 1.3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }));
    }

    /** Picture frame for the attach button. */
    function ImageIcon() {
      return h('svg', {
        viewBox: '0 0 16 16',
        width: 15,
        height: 15,
        fill: 'none',
        'aria-hidden': true,
      },
      h('rect', {
        x: 2,
        y: 3,
        width: 12,
        height: 10,
        rx: 2,
        stroke: 'currentColor',
        strokeWidth: 1.25,
      }),
      h('circle', { cx: 5.2, cy: 6.2, r: 1.15, fill: 'currentColor' }),
      h('path', {
        d: 'M3.2 12l3.1-3.1 2 2 1.7-1.7 2.8 2.8',
        stroke: 'currentColor',
        strokeWidth: 1.25,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }));
    }

    /** Clock with a counter-clockwise arrow: recent interjections. */
    function HistoryIcon() {
      return h('svg', {
        viewBox: '0 0 16 16',
        width: 14,
        height: 14,
        fill: 'none',
        'aria-hidden': true,
      },
      h('path', {
        d: 'M2.6 6.2A5.6 5.6 0 1 1 2.5 9.4',
        stroke: 'currentColor',
        strokeWidth: 1.25,
        strokeLinecap: 'round',
      }),
      h('path', {
        d: 'M2.4 3.5v2.9h2.9M8 5v3.2l2.1 1.2',
        stroke: 'currentColor',
        strokeWidth: 1.25,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }));
    }

    function newRequestId() {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      return `steer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    }

    function imageMediaTypeOf(file) {
      if (IMAGE_TYPES.includes(file.type)) return file.type;
      const extension = (file.name.split('.').pop() ?? '').toLowerCase();
      switch (extension) {
        case 'png': return 'image/png';
        case 'jpg':
        case 'jpeg': return 'image/jpeg';
        case 'webp': return 'image/webp';
        case 'gif': return 'image/gif';
        default: return undefined;
      }
    }

    function imageSizeText(bytes) {
      const megabytes = bytes / (1024 * 1024);
      if (megabytes >= 1) {
        return `${megabytes >= 10 ? Math.round(megabytes) : megabytes.toFixed(1)} MB`;
      }
      return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    async function imageDataOf(file) {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error ?? new Error('image read failed'));
        reader.readAsDataURL(file);
      });
      const comma = dataUrl.indexOf(',');
      if (comma < 0) throw new Error('image read failed');
      return dataUrl.slice(comma + 1);
    }

    async function imageFromFile(file, mediaType) {
      const normalized = file.type === mediaType
        ? file
        : new File([file], file.name, { type: mediaType });
      const data = await imageDataOf(normalized);
      return {
        id: newRequestId(),
        file: normalized,
        name: normalized.name,
        mediaType,
        data,
        bytes: normalized.size,
        previewUrl: URL.createObjectURL(normalized),
      };
    }

    const DRAFT_TEXT_PREFIX = 'dsh-steer-note.draft.text.';
    const DRAFT_IMAGES_PREFIX = 'dsh-steer-note.draft.images.';
    const HISTORY_PREFIX = 'dsh-steer-note.history.';

    function readStorage(key) {
      try {
        return typeof localStorage === 'undefined' ? null : localStorage.getItem(key);
      } catch {
        return null;
      }
    }

    function writeStorage(key, value) {
      try {
        if (typeof localStorage === 'undefined') return false;
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    }

    function removeStorage(key) {
      try {
        if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
      } catch {
        // Storage can be unavailable or full; the in-memory draft still works.
      }
    }

    function serializeDraftImage(image) {
      return {
        name: image.name,
        mediaType: image.mediaType,
        data: image.data,
        bytes: image.bytes,
      };
    }

    function deserializeDraftImage(saved) {
      if (saved === null || typeof saved !== 'object') return undefined;
      if (typeof saved.data !== 'string' || typeof saved.mediaType !== 'string') return undefined;
      try {
        const binary = atob(saved.data);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
        const name = typeof saved.name === 'string' && saved.name !== '' ? saved.name : 'image';
        const file = new File([bytes], name, { type: saved.mediaType });
        return {
          id: newRequestId(),
          file,
          name: file.name,
          mediaType: saved.mediaType,
          data: saved.data,
          bytes: typeof saved.bytes === 'number' ? saved.bytes : file.size,
          previewUrl: URL.createObjectURL(file),
        };
      } catch {
        return undefined;
      }
    }

    function readDraft(sessionId) {
      const text = readStorage(`${DRAFT_TEXT_PREFIX}${sessionId}`) ?? '';
      const raw = readStorage(`${DRAFT_IMAGES_PREFIX}${sessionId}`);
      const images = [];
      if (raw !== null) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            for (const saved of parsed) {
              const image = deserializeDraftImage(saved);
              if (image !== undefined) images.push(image);
            }
          }
        } catch {
          // Ignore a corrupt draft; the text part still restores.
        }
      }
      return { text, images };
    }

    function saveDraftText(sessionId, text) {
      if (text === '') removeStorage(`${DRAFT_TEXT_PREFIX}${sessionId}`);
      else writeStorage(`${DRAFT_TEXT_PREFIX}${sessionId}`, text);
    }

    function saveDraftImages(sessionId, images) {
      if (images.length === 0) {
        removeStorage(`${DRAFT_IMAGES_PREFIX}${sessionId}`);
        return true;
      }
      const totalChars = images.reduce((sum, image) => sum + image.data.length, 0);
      if (totalChars > 4 * 1024 * 1024) {
        removeStorage(`${DRAFT_IMAGES_PREFIX}${sessionId}`);
        return false;
      }
      const saved = writeStorage(
        `${DRAFT_IMAGES_PREFIX}${sessionId}`,
        JSON.stringify(images.map(serializeDraftImage)),
      );
      if (!saved) removeStorage(`${DRAFT_IMAGES_PREFIX}${sessionId}`);
      return saved;
    }

    function clearDraft(sessionId) {
      removeStorage(`${DRAFT_TEXT_PREFIX}${sessionId}`);
      removeStorage(`${DRAFT_IMAGES_PREFIX}${sessionId}`);
    }

    function readHistory(sessionId) {
      const raw = readStorage(`${HISTORY_PREFIX}${sessionId}`);
      if (raw === null) return [];
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .filter((entry) => entry !== null && typeof entry === 'object'
            && typeof entry.id === 'string' && typeof entry.time === 'number')
          .map((entry) => ({
            id: entry.id,
            text: typeof entry.text === 'string' ? entry.text : '',
            imageCount: typeof entry.imageCount === 'number' ? entry.imageCount : 0,
            time: entry.time,
            status: typeof entry.status === 'string' ? entry.status : 'delivered',
          }))
          .slice(0, 8);
      } catch {
        return [];
      }
    }

    function writeHistory(sessionId, history) {
      if (history.length === 0) {
        removeStorage(`${HISTORY_PREFIX}${sessionId}`);
        return;
      }
      writeStorage(`${HISTORY_PREFIX}${sessionId}`, JSON.stringify(history));
    }

    function clearHistoryStorage(sessionId) {
      removeStorage(`${HISTORY_PREFIX}${sessionId}`);
    }

    /**
     * Compact steering composer above the main composer. It keeps its own draft,
     * appears only while this Session can accept steering, and sends the same
     * `{ mode: 'steer' }` prompt the native composer sends — text and images.
     */
    function createSteerNote(sessionRemote, conversationOf) {
      return function SteerNote({
        sessionId,
        useSession,
        useSessionStatus,
        useProjection,
        useInput,
        useChat,
        inputActions,
        t,
      }) {
        const [text, setText] = React.useState('');
        const [pending, setPending] = React.useState(false);
        const [status, setStatus] = React.useState(null);
        const [images, setImages] = React.useState([]);
        const [keepOpen, setKeepOpen] = React.useState(false);
        const [history, setHistory] = React.useState([]);
        const [showHistory, setShowHistory] = React.useState(false);
        const [cancellingId, setCancellingId] = React.useState(null);
        const inputRef = React.useRef(null);
        const fileInputRef = React.useRef(null);
        const timerRef = React.useRef(0);
        const sendingRef = React.useRef(false);
        const addingRef = React.useRef(false);
        const cancellingRef = React.useRef(false);
        const aliveRef = React.useRef(true);
        const imagesRef = React.useRef([]);
        const sessionRef = React.useRef(sessionId);
        const historySessionRef = React.useRef(sessionId);
        const draftWarningRef = React.useRef(false);
        const wasRunning = React.useRef(false);
        const transferredRef = React.useRef(false);
        const latestTextRef = React.useRef('');
        const latestImagesRef = React.useRef([]);
        const mainDraftRef = React.useRef('');
        const mainPhaseRef = React.useRef('plain');

        const running = useSessionStatus((state) => state.get(sessionId)?.running === true);
        const subagentMode = useSession((snapshot) => snapshot.subagent?.address?.mode);
        const imageLimits = useProjection('imageLimits');
        const inbox = useProjection('inbox');
        const settledNodes = useChat((snapshot) => snapshot.legacy?.nodes ?? []);
        const mainDraft = useInput((state) => state.draft);
        const mainPhase = useInput((state) => state.phase);

        const readIds = new Set();
        for (const node of settledNodes) {
          if ((node.kind === 'steering' || node.kind === 'user')
            && typeof node.source?.rpcId === 'string') {
            readIds.add(node.source.rpcId);
          }
        }
        const pendingItems = new Map();
        for (const target of ['next-step', 'next-turn']) {
          for (const message of inbox?.[target] ?? []) {
            if (typeof message.source?.rpcId === 'string' && message.id !== undefined) {
              pendingItems.set(message.source.rpcId, String(message.id));
            }
          }
        }
        const pendingIds = new Set(pendingItems.keys());
        const readSignature = [...readIds].sort().join('|');
        const pendingSignature = [...pendingIds].sort().join('|');

        latestTextRef.current = text;
        latestImagesRef.current = images;
        mainDraftRef.current = mainDraft ?? '';
        mainPhaseRef.current = mainPhase ?? 'plain';

        React.useEffect(() => {
          sessionRef.current = sessionId;
          wasRunning.current = running;
          transferredRef.current = false;
          const draft = readDraft(sessionId);
          latestTextRef.current = draft.text;
          latestImagesRef.current = draft.images;
          setText(draft.text);
          setStatus(null);
          setPending(false);
          setKeepOpen(false);
          setHistory(readHistory(sessionId));
          setShowHistory(false);
          draftWarningRef.current = false;
          setImages((current) => {
            for (const image of current) URL.revokeObjectURL(image.previewUrl);
            return draft.images;
          });
        }, [sessionId]);

        React.useEffect(() => {
          if (historySessionRef.current !== sessionId) {
            historySessionRef.current = sessionId;
            return;
          }
          writeHistory(sessionId, history);
        }, [sessionId, history]);

        React.useEffect(() => {
          imagesRef.current = images;
        }, [images]);

        React.useEffect(() => {
          aliveRef.current = true;
          return () => {
            aliveRef.current = false;
            if (timerRef.current !== 0) clearTimeout(timerRef.current);
            for (const image of imagesRef.current) URL.revokeObjectURL(image.previewUrl);
          };
        }, []);

        React.useEffect(() => {
          const input = inputRef.current;
          if (input === null) return;
          input.style.height = '0px';
          input.style.height = `${Math.min(input.scrollHeight, 96)}px`;
        }, [text]);

        /** Move an unfinished interjection into the native composer. */
        const transferToComposer = () => {
          if (sessionRef.current !== sessionId || transferredRef.current) return false;
          const value = latestTextRef.current.trim();
          const pendingImages = latestImagesRef.current;
          if (value === '' && pendingImages.length === 0) return false;
          if (sendingRef.current) {
            setKeepOpen(true);
            return false;
          }
          if (addingRef.current) {
            setKeepOpen(true);
            setStatus({ kind: 'error', text: t('transfer.busy') });
            return false;
          }
          if (mainPhaseRef.current === 'adjudicating' || mainPhaseRef.current === 'submitting') {
            setKeepOpen(true);
            setStatus({ kind: 'error', text: t('transfer.busy') });
            return false;
          }
          if (inputActions === undefined || typeof inputActions.setDraft !== 'function') {
            setKeepOpen(true);
            setStatus({ kind: 'error', text: t('transfer.unavailable') });
            return false;
          }
          let movedText = false;
          try {
            if (value !== '') {
              const existing = mainDraftRef.current.replace(/\s+$/u, '');
              const nextDraft = existing === '' ? value : `${existing}\n\n${value}`;
              inputActions.setDraft(nextDraft);
              if (typeof inputActions.persistDraft === 'function') inputActions.persistDraft();
              latestTextRef.current = '';
              setText('');
              saveDraftText(sessionId, '');
              movedText = true;
            }
            if (pendingImages.length > 0) {
              if (typeof inputActions.addAttachments !== 'function') {
                throw new Error('the main composer cannot accept attachments right now');
              }
              const conversation = conversationOf();
              if (conversation === undefined || typeof conversation.createDrafts !== 'function') {
                throw new Error('the draft attachment service is unavailable');
              }
              const drafts = conversation.createDrafts(sessionId, pendingImages.map((image) => image.file));
              const added = inputActions.addAttachments(drafts.map((draft) => draft.id));
              if (!added) {
                conversation.releaseDraftAttachments?.(drafts);
                throw new Error('the main composer is busy');
              }
              for (const image of pendingImages) URL.revokeObjectURL(image.previewUrl);
              latestImagesRef.current = [];
              setImages([]);
              saveDraftImages(sessionId, []);
            }
            transferredRef.current = true;
            setKeepOpen(false);
            setStatus(null);
            clearDraft(sessionId);
            return true;
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setKeepOpen(true);
            setStatus({
              kind: 'error',
              text: t(movedText ? 'transfer.partial' : 'transfer.failed', { message }),
            });
            return false;
          }
        };

        React.useEffect(() => {
          if (running) {
            transferredRef.current = false;
            wasRunning.current = true;
            return;
          }
          if (wasRunning.current) {
            wasRunning.current = false;
            transferToComposer();
          }
        }, [running]);

        React.useEffect(() => {
          setHistory((current) => {
            let changed = false;
            const next = current.map((entry) => {
              if (entry.status === 'read' || entry.status === 'cancelled') return entry;
              let nextStatus = entry.status;
              if (readIds.has(entry.id)) nextStatus = 'read';
              else if (pendingIds.has(entry.id)) nextStatus = 'pending';
              else if (!running && (entry.status === 'delivered' || entry.status === 'pending')) nextStatus = 'unread';
              if (nextStatus === entry.status) return entry;
              changed = true;
              return { ...entry, status: nextStatus };
            });
            return changed ? next : current;
          });
        }, [readSignature, pendingSignature, running, history]);

        const hasDraft = text.trim() !== '' || images.length > 0;
        const visible = (running || hasDraft || (showHistory && history.length > 0))
          && (subagentMode === undefined || subagentMode === 'continuable');
        if (!visible) return null;

        const limits = imageLimits ?? DEFAULT_IMAGE_LIMITS;
        const supportedTypes = Array.isArray(limits.mediaTypes) && limits.mediaTypes.length > 0
          ? limits.mediaTypes
          : IMAGE_TYPES;
        const maxImages = limits.maxImagesPerMessage ?? DEFAULT_IMAGE_LIMITS.maxImagesPerMessage;
        const maxImageBytes = limits.maxImageBytes ?? DEFAULT_IMAGE_LIMITS.maxImageBytes;
        const maxTotalBytes = limits.maxMessageImageBytes ?? DEFAULT_IMAGE_LIMITS.maxMessageImageBytes;
        const maxImageDimension = limits.maxImageDimension ?? DEFAULT_IMAGE_LIMITS.maxImageDimension;

        const flash = (next, autoClear) => {
          if (timerRef.current !== 0) {
            clearTimeout(timerRef.current);
            timerRef.current = 0;
          }
          setStatus(next);
          if (!autoClear) return;
          timerRef.current = window.setTimeout(() => {
            timerRef.current = 0;
            setStatus((current) => (current === next ? null : current));
          }, 2600);
        };

        const attachmentFailureText = (reason) => {
          switch (reason) {
            case 'MODEL_DOES_NOT_SUPPORT_IMAGES': return t('image.modelUnsupported');
            case 'IMAGE_TOO_MANY_PIXELS': return t('image.tooManyPixels');
            case 'IMAGE_DIMENSION_TOO_LARGE': return t('image.dimensionTooLarge', { size: maxImageDimension });
            case 'INVALID_IMAGE':
            case 'IMAGE_TYPE_MISMATCH': return t('image.invalid');
            case 'TOO_MANY_IMAGES': return t('image.tooMany', { count: maxImages });
            case 'IMAGE_TOO_LARGE': return t('image.tooLarge', { size: imageSizeText(maxImageBytes) });
            case 'IMAGES_TOO_LARGE': return t('image.totalTooLarge', { size: imageSizeText(maxTotalBytes) });
            default: return undefined;
          }
        };

        const failure = (result, error) => {
          const code = result?.error?.code;
          const reason = result?.error?.details?.reason;
          if (code === 'session/steer-unavailable') {
            setKeepOpen(true);
            flash({ kind: 'error', text: t('status.unavailable') }, false);
            return;
          }
          if (code === 'session/attachment-invalid') {
            const mapped = attachmentFailureText(reason);
            flash({
              kind: 'error',
              text: mapped ?? t('image.sendFailed', { reason: reason ?? code }),
            }, false);
            return;
          }
          const message = result?.error?.message
            ?? (error instanceof Error ? error.message : String(error ?? code ?? 'unknown'));
          flash({ kind: 'error', text: t('status.error', { message }) }, false);
        };

        const addFiles = async (files) => {
          if (sendingRef.current || addingRef.current || files.length === 0) return;
          addingRef.current = true;
          const requestSession = sessionRef.current;
          let count = images.length;
          let total = images.reduce((sum, image) => sum + image.bytes, 0);
          const accepted = [];
          let problem = null;
          try {
            for (const file of files) {
              const mediaType = imageMediaTypeOf(file);
              if (mediaType === undefined || !supportedTypes.includes(mediaType)) {
                problem = t('image.unsupported');
                continue;
              }
              if (count >= maxImages) {
                problem = t('image.tooMany', { count: maxImages });
                break;
              }
              if (file.size > maxImageBytes) {
                problem = t('image.tooLarge', { size: imageSizeText(maxImageBytes) });
                continue;
              }
              if (total + file.size > maxTotalBytes) {
                problem = t('image.totalTooLarge', { size: imageSizeText(maxTotalBytes) });
                break;
              }
              try {
                const image = await imageFromFile(file, mediaType);
                accepted.push(image);
                count += 1;
                total += file.size;
              } catch (error) {
                problem = t('image.readFailed', {
                  message: error instanceof Error ? error.message : String(error),
                });
              }
            }
          } finally {
            addingRef.current = false;
          }
          if (!aliveRef.current || sessionRef.current !== requestSession) {
            for (const image of accepted) URL.revokeObjectURL(image.previewUrl);
            return;
          }
          if (accepted.length > 0) {
            const nextImages = [...images, ...accepted];
            setImages(nextImages);
            const saved = saveDraftImages(requestSession, nextImages);
            if (!saved && !draftWarningRef.current) {
              draftWarningRef.current = true;
              setStatus({ kind: 'info', text: t('draft.imagesNotSaved') });
            }
          }
          if (problem !== null) {
            flash({ kind: 'error', text: problem }, false);
          } else if (accepted.length > 0) {
            setStatus((current) => (current?.kind === 'error' ? null : current));
          }
        };

        const removeImage = (id) => {
          if (sendingRef.current) return;
          const target = images.find((image) => image.id === id);
          if (target !== undefined) URL.revokeObjectURL(target.previewUrl);
          const nextImages = images.filter((image) => image.id !== id);
          setImages(nextImages);
          saveDraftImages(sessionId, nextImages);
          setStatus((current) => (current?.kind === 'error' ? null : current));
        };

        const onPaste = (event) => {
          const files = [];
          for (const item of Array.from(event.clipboardData?.items ?? [])) {
            if (item.kind !== 'file') continue;
            const file = item.getAsFile();
            if (file !== null && imageMediaTypeOf(file) !== undefined) files.push(file);
          }
          if (files.length > 0) {
            event.preventDefault();
            void addFiles(files);
          }
        };

        const onDragOver = (event) => {
          if (Array.from(event.dataTransfer?.types ?? []).includes('Files')) event.preventDefault();
        };

        const onDrop = (event) => {
          const files = Array.from(event.dataTransfer?.files ?? []);
          if (files.length > 0) {
            event.preventDefault();
            void addFiles(files);
          }
        };

        const send = async () => {
          const value = text.trim();
          if (sendingRef.current || (value === '' && images.length === 0)) return;
          sendingRef.current = true;
          setPending(true);
          setStatus(null);
          if (timerRef.current !== 0) {
            clearTimeout(timerRef.current);
            timerRef.current = 0;
          }
          try {
            const content = [];
            for (const image of images) {
              content.push({
                type: 'image',
                mediaType: image.mediaType,
                data: image.data,
                ...image.name === '' ? {} : { name: image.name },
              });
            }
            if (value !== '') content.push({ type: 'text', text: value });
            const requestId = newRequestId();
            const sentImageCount = images.length;
            const result = await sessionRemote.prompt({
              requestId,
              sessionId,
              mode: 'steer',
              content,
              clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            if (result !== undefined && result.ok === false) {
              if (sessionRef.current === sessionId) failure(result);
              return;
            }
            const entry = {
              id: requestId,
              text: value,
              imageCount: sentImageCount,
              time: Date.now(),
              status: readIds.has(requestId)
                ? 'read'
                : pendingIds.has(requestId)
                  ? 'pending'
                  : 'delivered',
            };
            if (sessionRef.current !== sessionId) {
              writeHistory(sessionId, [entry, ...readHistory(sessionId)].slice(0, 8));
              clearDraft(sessionId);
              for (const image of images) URL.revokeObjectURL(image.previewUrl);
              return;
            }
            setHistory((current) => [entry, ...current].slice(0, 8));
            for (const image of images) URL.revokeObjectURL(image.previewUrl);
            setImages([]);
            setText('');
            setKeepOpen(false);
            clearDraft(sessionId);
            setStatus({ kind: 'ok', text: t('status.sent') });
            timerRef.current = window.setTimeout(() => {
              timerRef.current = 0;
              setStatus(null);
            }, 2400);
            inputRef.current?.focus();
          } catch (error) {
            if (sessionRef.current === sessionId) failure(undefined, error);
          } finally {
            sendingRef.current = false;
            if (sessionRef.current === sessionId) setPending(false);
          }
        };

        const onKeyDown = (event) => {
          if (event.nativeEvent?.isComposing || event.isComposing) return;
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            void send();
            return;
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            inputRef.current?.blur();
          }
        };

        const cancelInterjection = async (entry) => {
          if (cancellingRef.current) return;
          if (typeof sessionRemote.updateQueue !== 'function') {
            flash({ kind: 'error', text: t('history.cancelUnavailable') }, false);
            return;
          }
          const itemId = pendingItems.get(entry.id);
          if (itemId === undefined) {
            flash({ kind: 'error', text: t('history.cancelGone') }, false);
            return;
          }
          cancellingRef.current = true;
          setCancellingId(entry.id);
          try {
            const result = await sessionRemote.updateQueue({
              sessionId,
              itemId,
              action: { kind: 'remove' },
            });
            if (result !== undefined && result.ok === false) {
              const code = result.error?.code;
              flash({
                kind: 'error',
                text: code === 'session/queue-item-not-found' || code === 'session/steer-unavailable'
                  ? t('history.cancelGone')
                  : t('history.cancelFailed', { message: result.error?.message ?? code ?? '' }),
              }, false);
              return;
            }
            setHistory((current) => current.map((item) => (
              item.id === entry.id ? { ...item, status: 'cancelled' } : item
            )));
            flash({ kind: 'ok', text: t('history.cancelled') }, true);
          } catch (error) {
            flash({
              kind: 'error',
              text: t('history.cancelFailed', {
                message: error instanceof Error ? error.message : String(error),
              }),
            }, false);
          } finally {
            cancellingRef.current = false;
            setCancellingId(null);
          }
        };

        const recall = (entry) => {
          if (entry.text === '') {
            setStatus({ kind: 'info', text: t('history.imagesNotKept') });
            return;
          }
          setText(entry.text);
          saveDraftText(sessionId, entry.text);
          setStatus(null);
          setShowHistory(false);
          inputRef.current?.focus();
        };

        const clearHistory = () => {
          clearHistoryStorage(sessionId);
          setHistory([]);
          setShowHistory(false);
        };

        return h('div', {
          className: 'dsh-steer-note-root',
          'data-steer-note': true,
          onDragOver,
          onDrop,
        },
        h('style', null, CSS),
        showHistory && history.length > 0 ? h('div', { className: 'dsh-steer-note-history-panel' },
          h('div', { className: 'dsh-steer-note-history-header' },
            h('span', null, t('history.title')),
            h('button', {
              type: 'button',
              className: 'dsh-steer-note-history-clear',
              'aria-label': t('history.clear.aria'),
              onClick: clearHistory,
            }, t('history.clear')),
          ),
          history.map((entry) => {
            const canCancel = (entry.status === 'pending' || entry.status === 'delivered')
              && pendingItems.has(entry.id);
            return h('div', {
              className: 'dsh-steer-note-history-item',
              key: entry.id,
            },
            h('button', {
              type: 'button',
              className: 'dsh-steer-note-history-recall',
              title: entry.imageCount > 0 ? t('history.imagesNotKept') : undefined,
              onClick: () => recall(entry),
            },
            h('span', {
              className: 'dsh-steer-note-history-status',
              'data-status': entry.status,
              title: t(`history.status.${entry.status}`),
            }, HISTORY_STATUS_ICON[entry.status] ?? '·'),
            h('span', { className: 'dsh-steer-note-history-text' },
              entry.text === '' ? t('history.imageOnly') : entry.text,
            ),
            h('span', { className: 'dsh-steer-note-history-meta' },
              entry.imageCount > 0 ? `${t('history.images', { count: entry.imageCount })} · ` : '',
              new Date(entry.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            ),
            ),
            canCancel ? h('button', {
              type: 'button',
              className: 'dsh-steer-note-history-cancel',
              'aria-label': t('history.cancel.aria'),
              title: t('history.cancel.aria'),
              disabled: cancellingId !== null,
              onClick: () => void cancelInterjection(entry),
            }, cancellingId === entry.id ? t('history.cancelling') : t('history.cancel')) : null,
            );
          }),
        ) : null,
        images.length === 0 ? null : h('div', { className: 'dsh-steer-note-previews' },
          images.map((image) => h('div', {
            className: 'dsh-steer-note-preview',
            key: image.id,
          },
          h('img', {
            src: image.previewUrl,
            alt: image.name,
            loading: 'lazy',
          }),
          h('button', {
            type: 'button',
            className: 'dsh-steer-note-preview-remove',
            'aria-label': t('image.remove'),
            title: t('image.remove'),
            disabled: pending,
            onClick: () => removeImage(image.id),
          }, '×'),
          )),
        ),
        h('div', { className: 'dsh-steer-note-row' },
          h('span', { className: 'dsh-steer-note-icon', 'aria-hidden': true },
            h(LeadIcon),
          ),
          h('textarea', {
            ref: inputRef,
            className: 'dsh-steer-note-input',
            rows: 1,
            value: text,
            placeholder: t('placeholder'),
            'aria-label': t('input.aria'),
            title: t('hint'),
            disabled: pending,
            spellCheck: false,
            autoComplete: 'off',
            enterKeyHint: 'send',
            onChange: (event) => {
              const nextText = event.target.value;
              setText(nextText);
              saveDraftText(sessionId, nextText);
              setStatus((current) => (current?.kind === 'error' ? null : current));
            },
            onKeyDown,
            onPaste,
          }),
          h('input', {
            ref: fileInputRef,
            type: 'file',
            accept: supportedTypes.join(','),
            multiple: true,
            style: { display: 'none' },
            onChange: (event) => {
              const files = Array.from(event.target.files ?? []);
              event.target.value = '';
              void addFiles(files);
            },
          }),
          h('button', {
            type: 'button',
            className: 'dsh-steer-note-attach',
            'aria-label': t('image.add.aria'),
            title: t('image.add'),
            disabled: pending || images.length >= maxImages,
            onClick: () => fileInputRef.current?.click(),
          }, h(ImageIcon)),
          history.length === 0 ? null : h('button', {
            type: 'button',
            className: 'dsh-steer-note-history',
            'aria-label': t('history.button.aria'),
            title: t('history.button'),
            'aria-expanded': showHistory,
            onClick: () => setShowHistory((open) => !open),
          },
          h(HistoryIcon),
          h('span', { className: 'dsh-steer-note-history-count' }, String(history.length)),
          ),
          (keepOpen || (!running && hasDraft)) ? h('button', {
            type: 'button',
            className: 'dsh-steer-note-retry',
            title: t('transfer.retry'),
            disabled: pending,
            onClick: () => {
              transferToComposer();
            },
          }, t('transfer.retry')) : null,
          h('button', {
            type: 'button',
            className: 'dsh-steer-note-button',
            'aria-label': t('button.aria'),
            title: t('hint'),
            disabled: pending || (text.trim() === '' && images.length === 0),
            onClick: () => void send(),
          },
          pending ? t('button.sending') : t('button'),
          h(SendIcon),
          ),
        ),
        status === null ? null : h('div', {
          className: 'dsh-steer-note-status',
          'data-kind': status.kind,
          role: 'status',
          'aria-live': 'polite',
        }, status.text),
        );
      };
    }

    return {
      inject: ['slots', 'locale', 'remote', 'remote.session'],
      apply(ctx) {
        const conversationOf = () => ctx.get('conversation');
        const SteerNote = createSteerNote(ctx.remote.session, conversationOf);
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'steer-note: dictionaries');
        ctx.slots.inject('conversation.input.dock', () => ctx.slots.register({
          name: 'conversation.input.dock',
          id: 'steer-note',
          order: 30,
          locale: NS,
        }, SteerNote));
      },
    };
  },
});
