/**
 * Host half of the quick-steer bundle.
 *
 * Adds one short system-prompt section that tells the model how to interpret a
 * user message that arrives while it is already working. The Client half still
 * submits through the native session Remote, so the durable event stays a
 * regular `user/message` and the native steering bubble/history keep working.
 */
export const inject = ['systemPrompt'];

export function apply(ctx) {
  ctx.effect(() => ctx.systemPrompt.section({
    name: 'STEER_NOTE',
    order: 700,
    text: [
      'Mid-turn steering. A user message can arrive while you are already working, before the current turn ends.',
      'Treat such a message as a course correction for the current task: apply it to the current plan and continue from where you are.',
      'It may include images; use them as part of the same correction.',
      'Do not restart the task, restate the whole plan, or treat it as a brand-new request unless the message explicitly asks you to stop or replace the task.',
      'Preserve completed work, and briefly name the adjusted next step before continuing.',
    ].join(' '),
  }), 'steer-note: system prompt section');
}
