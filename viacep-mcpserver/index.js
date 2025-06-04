// index.js
import { startServer } from './server.js';
import { startHttpServer } from './httpServer.js';

const args = process.argv.slice(2);
const transportType = args[0] || 'stdio';

async function main() {
  try {
    if (transportType === 'stdio') {
      console.error('Starting server with stdio transport...');
      await startServer('stdio');
    } else if (transportType === 'http') {
      console.error('Starting server with HTTP transport...');
      await startHttpServer();
    } else {
      console.error(`Unknown transport type: ${transportType}`);
      console.error('Usage: node index.js [stdio|http]');
      process.exit(1);
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
