import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// TODO: 1. Initialize the MCP Server (give it a name and version)
// Hint: const server = new McpServer(...)

// TODO: 2. Implement the 'hello' tool
// Requirements:
// - Tool Name: "hello"
// - Input Schema: object with a "name" string field
// - Logic: Return a text content object saying "Hello, {name}!"

// TODO: 3. Implement the 'echo' tool
// Requirements:
// - Tool Name: "echo"
// - Input Schema: object with a "text" string field
// - Logic: Return a text content object with the exact same text

async function main() {
  // TODO: 4. Create an StdioServerTransport
  // Hint: const transport = new StdioServerTransport();

  // TODO: 5. Connect the server to the transport
  // Hint: await server.connect(transport);
  
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
