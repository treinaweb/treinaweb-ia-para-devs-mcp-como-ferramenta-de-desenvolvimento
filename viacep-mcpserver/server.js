// server.js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create an MCP server
const server = new McpServer({
  name: 'ViacepServer',
  version: '1.0.0'
});

// Add a tool to get address information by CEP
server.tool(
  'get_address_info',
  'Retrieve address information by CEP (Brazilian postal code)',
  { cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP must be in format 00000-000 or 00000000') },
  async ({ cep }) => {
    try {
      // Normalize CEP by removing the hyphen if present
      const normalizedCep = cep.replace('-', '');
      
      // Call the Viacep API
      const response = await fetch(`https://viacep.com.br/ws/${normalizedCep}/json/`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data from Viacep API: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Check if the API returned an error
      if (data.erro) {
        return {
          content: [{ type: 'text', text: 'CEP não encontrado' }],
          isError: true
        };
      }
      
      // Format the address information
      const addressInfo = {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        ibge: data.ibge,
        gia: data.gia,
        ddd: data.ddd,
        siafi: data.siafi
      };
      
      return {
        content: [{ 
          type: 'text', 
          text: JSON.stringify(addressInfo, null, 2) 
        }]
      };
    } catch (error) {
      console.error('Error in get_address_info tool:', error);
      return {
        content: [{ 
          type: 'text', 
          text: `Error: ${error.message}` 
        }],
        isError: true
      };
    }
  }
);

// Define the server startup function with transport selection
export async function startServer(transportType = 'stdio') {
  if (transportType === 'stdio') {
    console.error('Starting server with stdio transport...');
    const transport = new StdioServerTransport();
    await server.connect(transport);
    return transport;
  } else {
    throw new Error(`Unknown transport type: ${transportType}`);
  }
}

// If this script is run directly, start the server with stdio transport
if (process.argv[1] === new URL(import.meta.url).pathname) {
  startServer('stdio').catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

// Export the server instance for external use (e.g., by the HTTP server)
export { server };
