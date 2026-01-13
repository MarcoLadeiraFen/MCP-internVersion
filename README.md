Challenge 1: MCP Hello Tools & Agentic Basics

🎯 Goal

Build a local MCP (Model Context Protocol) server with simple tools and connect it to Copilot Chat in VS Code.
This challenge introduces agentic concepts and tool-driven development used at Fenergo.

📚 Learning Outcomes

By completing this challenge, you will:

> Understand MCP and agent-style tool invocation

> Expose tools that Copilot can call directly

> Practice clean API design, validation, and logging

🧩 Required Tasks

> Create a new Git branch from main named:   "mcp-tools-<your-name>"

> Implement two MCP tools:
hello(name) → returns "Hello, {name}!" , 
echo(text) → returns the same text

> Run the MCP server locally and connect it to Copilot Chat in VS Code.

> Test your tools by invoking them from Copilot Chat.

> Commit and push your changes to your branch.

✅ Definition of Done

> MCP server runs locally

> Copilot Chat can invoke both tools successfully

> Tools return correct responses

> Code is committed and pushed to Git

> Create a read me that contains: setup instructions , example Copilot prompts

🌟 Stretch Goals (Optional)

> Add input validation using Zod

> Add timestamped logging when tools are called

> Add extra tools (e.g. reverse(text), timestamp(), or a mock riskScore)

Impress me 😄
