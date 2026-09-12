import { createRequire } from 'module';
import path from 'path';

const MCP_PKG = '/home/noumaan/.npm/_npx/a7204b5813574340/node_modules/hostinger-api-mcp';
const require = createRequire(path.join(MCP_PKG, 'package.json'));
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

const domain = 'chocolate-lemur-135747.hostingersite.com';
const themePath = '/home/noumaan/Documents/michael_website/antigravity/wordpress-theme/gladhat';
const username = 'u902587620';
const software = '30177434';

const hosting = new Client({ name: 'deploy-theme', version: '1.0.0' });
const wp = new Client({ name: 'deploy-theme-wp', version: '1.0.0' });

async function connect(client, server) {
  const transport = new StdioClientTransport({
    command: 'node',
    args: [path.join(MCP_PKG, server)],
    env: { ...process.env, USER_AGENT: 'cursor-deploy-script' },
  });
  await client.connect(transport);
  return client;
}

async function tool(client, name, args) {
  const r = await client.callTool({ name, arguments: args });
  const text = r.content?.find((c) => c.type === 'text')?.text || '';
  try { return JSON.parse(text); } catch { return text; }
}

await connect(hosting, 'src/servers/hosting.js');
await connect(wp, 'src/servers/wordpress.js');

console.log('Deploy theme...', await tool(hosting, 'hosting_deployWordpressTheme', {
  domain, slug: 'gladhat', themePath, activate: true,
}));
console.log('Purge cache...', await tool(wp, 'hosting_purgeLiteSpeedCacheV1', { username, software }));
console.log('Clear site cache...', await tool(hosting, 'hosting_clearWebsiteCacheV1', { domain }));

await hosting.close();
await wp.close();
console.log('Done.');
