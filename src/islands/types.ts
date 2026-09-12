export type IslandProps = {
  /** Static HTML preserved for no-JS fallback */
  fallbackHtml: string;
  /** The [data-island] mount node */
  node: HTMLElement;
};

/** Safe for HTML attributes — handles apostrophes in JSON values. */
export { encodeIslandProps } from './encode-props.js';

export function parseIslandProps<T extends Record<string, unknown>>(
  node: HTMLElement,
): T {
  const raw = node.getAttribute('data-island-props');
  if (!raw) return {} as T;
  try {
    const json = raw.includes('%') ? decodeURIComponent(raw) : raw;
    return JSON.parse(json) as T;
  } catch {
    return {} as T;
  }
}
