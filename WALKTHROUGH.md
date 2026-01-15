# Guide to MCP (Intern Edition)

Welcome! This guide is designed to help you build your very first **Model Context Protocol (MCP)** server. Even if you are new to this, we'll walk through it step-by-step.

Think of an MCP Server like a "plugin" for AI. You are writing code that teaches GitHub Copilot new tricks (called "Tools").

---

## Phase 1: Setup (Getting Ready)

Before we write code, we need to download the tools we need.

1.  **Open your terminal.** (View > Terminal in the top menu).
2.  **Install dependencies:** Type `npm install` and hit Enter.
    *   *What this does:* It looks at `package.json` (a grocery list of code libraries) and downloads them to your computer. You'll see a `node_modules` folder appear.
3.  **Open the file:** Open `src/index.ts`. This is your blank canvas where we will write the specific instructions for the AI.

## Phase 2: The Server

We need to create the main object that will run our app.

**Goal:** Create an instance of the MCP Server.

Copy and paste this code into `src/index.ts`. It imports the library and starts a new server named "mcp-intern-challenge".

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mcp-intern-challenge",
  version: "1.0.0",
});
```

*Analogy:* You just hired a "manager" (the server) who will oversee all the tasks you create.

## Phase 3: Building Tools (Teaching the AI)

This is the fun part. "Tools" are just functions the AI can run. We need to tell the AI:
1.  **Name:** What is the tool called?
2.  **Inputs:** What information does the tool need? (We use a library called `zod` to describe this).
3.  **Action:** What should the tool actually do?

**Goal:** Create a `hello` tool that takes a `name` and says hello back.

Copy this block under your server creation code, but **try to understand what it does**:

```typescript
server.tool(
  "hello", // 1. Name of the tool
  { name: z.string() }, // 2. Input: We expect a 'name' that MUST be a text string
  async ({ name }) => { // 3. The Function
    // This is the logic. We return a specific format that MCP understands.
    return {
      content: [{ type: "text", text: `Hello, ${name}!` }],
    };
  }
);
```

**Task:** Now, try to create another tool called `echo` on your own! It should take a `message` (string) as input and return that same message back. Use the code above as a template.

## Phase 4: Connection (Opening the Phone Line)

Your server exists, but it isn't talking to anyone yet. We need to connect it to the standard input/output of the computer so VS Code can "hear" it.

**Goal:** Connect the transport.

Add this `main` function at the very bottom of your file to start everything up:

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio...");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```

## Phase 5: Build & Run

Your code is in **TypeScript** (which is fancy JavaScript), but Node.js only speaks **JavaScript**. We need to translate it.

1.  **Build:** Run `npm run build` in your terminal.
    *   *What this does:* It creates a `build/` folder with the translated JavaScript files.
2.  **Verify:** Check if you see a `build/index.js` file in your file explorer on the left.

## Phase 6: Connecting to Copilot

Now we introduce your code to GitHub Copilot.

1.  Open the **VS Code Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
2.  Type and select: **"MCP: Configure MCP Servers"**. This opens a configuration file.
3.  You need to add your server to the list. Use this template, but you **MUST** fix the path:

```json
"intern-server": {
  "command": "node",
  "args": [
    "C:/Users/YOUR_USER/Documents/.../build/index.js"
  ]
}
```

**Tip:** To get the path, right-click your `build/index.js` file and select "Copy Path". **Make sure to clear out any backslashes `\` and replace them with forward slashes `/` if you are on Windows, or use double backslashes `\\`.**

4.  **Restart:** After saving the config, reloading your VS Code window (Command Palette -> "Reload Window") might be needed.

---

# Phase 7: Stretch Goals (The Gauntlet)

Okay, the training wheels are off. If you breezed through the above, here is your *real* test.

**Constraint:** I will not give you code snippets for these. You must read documentation or ask Copilot/Gemini for syntax help.

### Challenge 1: The Mathematician
Create a tool called `calculate`.
*   **Inputs:** It should take two numbers (`a` and `b`) and an operation string (`add`, `subtract`, `multiply`).
*   **Logic:** Perform the math. Handle division by zero errors gracefully (return an error message, don't crash).
*   **Hint:** `z.number()` is a thing.

### Challenge 2: The API Fetcher
Create a tool called `get_crypto_price`.
*   **Inputs:** A coin ticker (e.g., "BTC", "ETH").
*   **Logic:** Use `fetch` to call a public API (like CoinGecko or Coinbase) to get the current price. You'll need to parse the JSON and return a formatted string like "1 BTC is currently $95,000".
*   **Hard Mode:** Add error handling if the API is down or the coin doesn't exist.

### Challenge 3: Complex Validation
Create a tool called `register_user`.
*   **Inputs:**
    *   `username` (String, min 3 chars, max 20)
    *   `age` (Number, must be 18+)
    *   `email` (String, must actually look like an email)
*   **Logic:** Just return a success message summarizing the data. The difficulty here is figuring out how to do advanced validation in Zod.

Good luck!
