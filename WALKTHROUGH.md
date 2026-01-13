# Guide to MCP

Welcome! This guide is designed to help you navigate the challenge without giving you the answers outright. Think of it as a set of breadcrumbs. github Copilot is allowed to help when you are stuck.

## Phase 1: Setup

Before writing code, get your environment ready.

1.  Open your terminal.
2.  Run `npm install`. This downloads the libraries defined in `package.json` (specifically the MCP SDK and Zod).
3.  Check `src/index.ts`. This is where your code will live. It's currently empty-ish.

## Phase 2: The Server

In `src/index.ts`, you have imports but no server.
**Goal:** Create an instance of the MCP Server.

here is how you initialize the server:

```typescript
const server = new McpServer({
  name: "mcp-intern-challenge",
  version: "1.0.0",
});
```

## Phase 3: Building Tools

Tools are the functions Copilot can call. You need to register them with your server instance.

**Goal:** Implement `hello` and `echo`.

### Anatomy of a Tool

You need to use `server.tool(...)` to register your capabilities.

1.  **Name:** Give your tool a unique name (like `"hello"`).
2.  **Schema:** You must define the inputs using the `zod` library.
    - _Hint:_ For an input like `{ name: "Alice" }`, your schema needs to describe a field called `name` that is a string.
    - _Syntax Helper:_ `{ name: z.string() }`
3.  **Handler:** An async function that receives the input and returns the result.
    - _Challenge:_ The return value requires a specific structure. You cannot just return a string.
    - _Structure Hint:_ It needs to look like this: `{ content: [{ type: "text", text: "..." }] }`.

## Phase 4: Connection

Your server is just a JavaScript object right now. It needs to "listen" for messages via the standard input/output (stdio).

**Goal:** Connect the transport.

Paste this into your `main()` function:

```typescript
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Phase 5: Build & Run

TypeScript code cannot run directly in Node (usually).

1.  **Build:** Run `npm run build`. This converts your TS to JS in the `build/` folder.
2.  **Test Run:** Run `npm start`.
    - _Note:_ The terminal might look like it's "hanging" or doing nothing. **This is good!** It's waiting for input from stdio. You can press `Ctrl+C` to stop it.

## Phase 6: The "Handshake" (Connecting to Copilot)

This is the final magic step. Copilot doesn't magically know your server exists. You must tell it where to find it.

**The Config File:**
You need to edit the MCP settings file.

1.  In VS Code, open the command palette (`Ctrl+Shift+P`).
2.  Search for: **"MCP: Configure MCP Servers"** or find the config file manually (usually `mcpServers` in settings).
3.  You need to add a newly entry for your server. It usually looks like this:

```json
"my-intern-server": {
  "command": "node",
  "args": [
    "ABSOLUTE/PATH/TO/YOUR/PROJECT/build/index.js"
  ]
}
```

- **Important:** You must use the **absolute path** to your `build/index.js` file. Relative paths often fail.
- **Important:** If you make changes to your code, you must `npm run build` again and **Reload the Window** in VS Code to refresh the MCP connection.

Once everything is working move ahead to the stretch goals!
Bonus points for extra "wow factor"
Good luck! No pressure!
