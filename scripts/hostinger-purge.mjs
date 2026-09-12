import { createRequire } from 'module';
import path from 'path';

const MCP_PKG = '/home/noumaan/.npm/_npx/a7204b5813574340/node_modules/hostinger-api-mcp';
const require = createRequire(path.join(MCP_PKG, 'package.json'));
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

const username = 'u902587620';
const software = '30177434';
const domain = 'chocolate-lemur-135747.hostingersite.com';

const transport = new StdioClientTransport({
  command: 'node',
  args: [path.join(MCP_PKG, 'src/servers/wordpress.js')],
  env: { ...process.env, USER_AGENT: 'cursor-deploy-script' },
});
const wp = new Client({ name: 'x', version: '1.0.0' });
await wp.connect(transport);
const r = await wp.callTool({ name: 'hosting_purgeLiteSpeedCacheV1', arguments: { username, software } });
console.log(r.content?.[0]?.text);
await wp.close();
