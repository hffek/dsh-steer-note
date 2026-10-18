# Changelog

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
