/* Reusable listen / read-aloud control (speech synthesis + optional audio file). */

export function AudioPrompt(text, src = '') {
  const safeText = String(text).replace(/"/g, '&quot;');
  const srcAttr = src ? ` data-audio-src="${String(src).replace(/"/g, '&quot;')}"` : '';

  return `
    <button type="button" class="audio-prompt" data-audio-text="${safeText}"${srcAttr} aria-pressed="false">
      <span class="audio-prompt__icon" aria-hidden="true">
        <svg class="audio-prompt__svg audio-prompt__svg--play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <svg class="audio-prompt__svg audio-prompt__svg--pause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
      </span>
      <span class="audio-prompt__text"><span class="emoji">🎧</span> Prefer to listen? I'll read it to you.</span>
    </button>
  `;
}
