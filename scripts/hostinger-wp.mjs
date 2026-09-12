import { createRequire } from 'module';
import path from 'path';

const MCP_PKG = '/home/noumaan/.npm/_npx/a7204b5813574340/node_modules/hostinger-api-mcp';
const require = createRequire(path.join(MCP_PKG, 'package.json'));
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

const domain = 'chocolate-lemur-135747.hostingersite.com';
const transport = new StdioClientTransport({
  command: 'node',
  args: [path.join(MCP_PKG, 'src/servers/wordpress.js')],
  env: { ...process.env, USER_AGENT: 'cursor-deploy-script' },
});
const client = new Client({ name: 'wp', version: '1.0.0' });
await client.connect(transport);

async function tool(name, args) {
  const r = await client.callTool({ name, arguments: args });
  const text = r.content?.find((c) => c.type === 'text')?.text || '';
  try { return JSON.parse(text); } catch { return text; }
}

const installs = await tool('hosting_listWordPressInstallationsV1', {
  domain,
  username: 'u902587620',
  ownership: 'all',
});
console.log('installs:', JSON.stringify(installs, null, 2));

const software = installs?.data?.[0]?.software_id || installs?.[0]?.software_id;
if (!software) {
  console.log('No software id found');
  await client.close();
  process.exit(1);
}

const maintenance = await tool('hosting_showMaintenanceStatusV1', { software, username: 'u902587620' });
console.log('maintenance:', maintenance);

const themes = await tool('hosting_listInstalledWordPressThemesV1', { software, username: 'u902587620' });
console.log('themes:', JSON.stringify(themes, null, 2).slice(0, 2000));

const plugins = await tool('hosting_listInstalledWordPressPluginsV1', { software, username: 'u902587620' });
console.log('plugins:', JSON.stringify(plugins, null, 2).slice(0, 2500));

await client.close();
