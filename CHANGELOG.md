# Changelog

## 0.2.2 — 2026-10-20

- UI: merge the image and file buttons into one paperclip; selected images are still detected and previewed automatically.
- Docs: update the usage line for the single attachment entry.

## 0.2.1 — 2026-10-19

- Docs: mark the package as published on npm, add the npm install command and badge.

## 0.2.0 — 2026-10-19

- Add: arbitrary file attachments through the native draft-upload service, with picker, paste, and drag/drop.
- Add: upload progress/error chips, per-file removal, and `{ type: 'file', receiptId }` prompt parts.
- Add: file drafts are transferred to the main composer with the rest of the draft.
- Note: file drafts are runtime-only and are lost on page refresh; text and image drafts still persist.

## 0.1.2 — 2026-10-19

- Fix: dropping a screenshot onto the interjection box no longer also adds it to the main composer.
- Add: capability guards and a compatibility section for `updateQueue` and the internal draft-attachment API; text still moves when images cannot.
- Add: real screenshot in the README.

## 0.1.1 — 2026-10-19

- Fix: draft text and images persist per session across conversation switches and page reloads.
- Fix: an idle session with a saved draft shows the box and offers transfer back to the composer.
- Add: cancel a pending interjection from its history entry.
- Add: interjection history persists per session.
- Add: short AI-authorship disclosure in the README.

## 0.1.0 — 2026-10-19

- Initial release.
- Compact steering box above the composer for running tasks.
- Text + images (picker, paste, drag/drop), with native image limits.
- Interjection history with read/pending/delivered/unread status.
- Unfinished draft rescue: text and images move into the native composer when a turn ends.
- `STEER_NOTE` system-prompt section for mid-turn steering semantics.
