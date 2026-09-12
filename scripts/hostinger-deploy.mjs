/**
 * Deploy static site via Hostinger hosting MCP (stdio) — bypasses Cursor MCP timeout on large uploads.
 */
import { createRequire } from 'module';
import path from 'path';

const MCP_PKG = '/home/noumaan/.npm/_npx/a7204b5813574340/node_modules/hostinger-api-mcp';
const require = createRequire(path.join(MCP_PKG, 'package.json'));
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

const MCP_SERVER = path.join(MCP_PKG, 'src/servers/hosting.js');
const domain = process.argv[2] || 'chocolate-lemur-135747.hostingersite.com';
const archivePath = process.argv[3] || path.resolve('dist_20260901_150655.zip');

const transport = new StdioClientTransport({
  command: 'node',
  args: [MCP_SERVER],
  env: { ...process.env, USER_AGENT: 'cursor-deploy-script' },
});

const client = new Client({ name: 'gladhat-deploy', version: '1.0.0' });

console.log('Connecting to Hostinger MCP...');
await client.connect(transport);

console.log('Listing websites...');
const sites = await client.callTool({
  name: 'hosting_listWebsitesV1',
  arguments: { domain, per_page: 5 },
});
console.log('Websites:', JSON.stringify(sites, null, 2).slice(0, 2000));

console.log('Listing root files...');
const files = await client.callTool({
  name: 'hosting_listWebsiteFilesAndDirectoriesV1',
  arguments: { domain, username: 'u902587620', directory: '', max_depth: 2, max_items: 50 },
});
console.log('Files:', JSON.stringify(files, null, 2).slice(0, 3000));

console.log(`Deploying ${archivePath} to ${domain}...`);
const deploy = await client.callTool({
  name: 'hosting_deployStaticWebsite',
  arguments: { domain, archivePath, removeArchive: false },
});
console.log('Deploy result:', JSON.stringify(deploy, null, 2));

await client.close();
