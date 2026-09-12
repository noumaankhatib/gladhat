/** Safe for HTML attributes — handles apostrophes in JSON values. */
export function encodeIslandProps(data) {
  return encodeURIComponent(JSON.stringify(data));
}
