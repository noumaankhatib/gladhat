import { createRequire } from 'module';
import path from 'path';

const MCP_PKG = '/home/noumaan/.npm/_npx/a7204b5813574340/node_modules/hostinger-api-mcp';
const require = createRequire(path.join(MCP_PKG, 'package.json'));
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

const username = 'u902587620';
const software = '30177434';

const transport = new StdioClientTransport({
  command: 'node',
  args: [path.join(MCP_PKG, 'src/servers/wordpress.js')],
  env: { ...process.env, USER_AGENT: 'cursor-deploy-script' },
});
const client = new Client({ name: 'x', version: '1.0.0' });
await client.connect(transport);

async function tool(name, args) {
  const r = await client.callTool({ name, arguments: args });
  const text = r.content?.find((c) => c.type === 'text')?.text || '';
  try { return JSON.parse(text); } catch { return text; }
}

for (const plugin of ['gladhat-core.disabled', 'gladhat-core-OFF']) {
  try {
    console.log('activate', plugin, await tool('hosting_activateWordPressPluginV1', { username, software, plugin }));
  } catch (e) {
    console.log('activate', plugin, 'ERR', e.message);
  }
}

console.log('purge', await tool('hosting_purgeLiteSpeedCacheV1', { username, software }));
await client.close();
