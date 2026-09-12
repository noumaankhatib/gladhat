import { createRequire } from 'module';
import path from 'path';

const MCP_PKG = '/home/noumaan/.npm/_npx/a7204b5813574340/node_modules/hostinger-api-mcp';
const require = createRequire(path.join(MCP_PKG, 'package.json'));
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

const domain = 'chocolate-lemur-135747.hostingersite.com';
const username = 'u902587620';
const transport = new StdioClientTransport({
  command: 'node',
  args: [path.join(MCP_PKG, 'src/servers/hosting.js')],
  env: { ...process.env, USER_AGENT: 'cursor-deploy-script' },
});
const client = new Client({ name: 'x', version: '1.0.0' });
await client.connect(transport);

async function tool(name, args) {
  const r = await client.callTool({ name, arguments: args });
  const text = r.content?.find((c) => c.type === 'text')?.text || '';
  try { return JSON.parse(text); } catch { return text; }
}

const themes = await tool('hosting_listWebsiteFilesAndDirectoriesV1', {
  domain, username, directory: 'wp-content/themes', max_depth: 2, max_items: 50,
});
console.log('themes:', JSON.stringify(themes, null, 2));

const plugins = await tool('hosting_listWebsiteFilesAndDirectoriesV1', {
  domain, username, directory: 'wp-content/plugins', max_depth: 1, max_items: 30,
});
console.log('plugins:', JSON.stringify(plugins, null, 2));

const ht = await tool('hosting_getWebsiteFileContentV1', {
  domain, username, path: '.htaccess', max_lines: 80,
});
console.log('htaccess:', ht);

await client.close();
