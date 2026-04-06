# OpenCode Skills - Complete Index

## Overview
This directory contains comprehensive skills for OpenCode - inspired by Claude Code, Letta memory systems, and battle-tested workflows from GitHub.

## Skills Library

| Category | Skill | Description |
|----------|-------|-------------|
| **Core Skills** | | |
| | [web-dev.md](web-dev.md) | Website development and design replication |
| | [wordpress-dev.md](wordpress-dev.md) | WordPress themes, plugins, and Elementor |
| | [react-dev.md](react-dev.md) | React and Next.js development |
| **Advanced Skills** | | |
| | [memory/README.md](memory/README.md) | Persistent memory blocks (Letta-style) |
| | [rag/README.md](rag/README.md) | Retrieval-Augmented Generation |
| | [agentic/README.md](agentic/README.md) | Agentic workflows and automation |
| | [commands/README.md](commands/README.md) | Reusable command templates |
| | [multicrew/README.md](multicrew/README.md) | Multi-agent collaboration |
| **Quality** | | |
| | [debugging.md](debugging.md) | Systematic debugging techniques |
| | [code-review.md](code-review.md) | Code review best practices |
| **Infrastructure** | | |
| | [api-dev.md](api-dev.md) | REST API development |
| | [deployment.md](deployment.md) | Deployment and DevOps |

---

## Quick Start Guide

### 1. For Beginners
Start with basic skills:
1. `web-dev.md` - Build your first website
2. `debugging.md` - Fix common issues
3. `code-review.md` - Review your code

### 2. For Intermediate Users
Add productivity skills:
1. `commands/README.md` - Create reusable commands
2. `wordpress-dev.md` - Build WordPress sites
3. `deployment.md` - Deploy to production

### 3. For Advanced Users
Implement agentic workflows:
1. `memory/README.md` - Set up persistent memory
2. `agentic/README.md` - Build autonomous workflows
3. `multicrew/README.md` - Coordinate multiple agents

---

## Skill Dependencies

```
web-dev.md
    └── wordpress-dev.md
            └── deployment.md

react-dev.md
    └── api-dev.md

memory/README.md
    └── rag/README.md
            └── agentic/README.md
                    └── multicrew/README.md
```

---

## Use Case Mapping

| Your Goal | Recommended Skills |
|-----------|-------------------|
| Build a website | web-dev.md |
| Build a WordPress site | wordpress-dev.md |
| Build a React app | react-dev.md |
| Debug an issue | debugging.md |
| Review code | code-review.md |
| Create commands | commands/README.md |
| Remember context | memory/README.md |
| Search knowledge | rag/README.md |
| Automate tasks | agentic/README.md |
| Coordinate agents | multicrew/README.md |

---

## Feature Comparison: OpenCode vs Claude Code

| Feature | OpenCode | Claude Code | Status |
|---------|----------|------------|--------|
| Commands | Custom skills | Native commands | ✅ Equivalent |
| Memory | Via plugins | Native memory blocks | ✅ Available |
| Skills | Markdown files | Skills directory | ✅ Equivalent |
| Agents | Task tool | Subagents | ✅ Available |
| Hooks | Via plugins | Native hooks | 🔄 Plugin needed |
| MCP | Via plugins | Native MCP | 🔄 Plugin needed |
| Context files | AGENTS.md | CLAUDE.md | ✅ Equivalent |

---

## Implementation Status

| Skill | Implementation | Status |
|-------|----------------|--------|
| Memory System | See memory/README.md | ✅ Complete |
| RAG Knowledge Base | See rag/README.md | ✅ Complete |
| Agentic Workflows | See agentic/README.md | ✅ Complete |
| Commands Library | See commands/README.md | ✅ Complete |
| Multi-Agent | See multicrew/README.md | ✅ Complete |

---

## Installation & Setup

### For OpenCode Plugins
Add to `opencode.json`:
```json
{
  "plugin": ["opencode-agent-memory"]
}
```

### For Custom Skills
1. Copy skills to `~/.config/opencode/skills/`
2. Reference in your prompts
3. Use `/skill [name]` to activate

### For Memory System
1. Create memory directory structure
2. Initialize core blocks (persona.md, human.md)
3. Configure in opencode.json

---

## Contributing

To add a new skill:
1. Create `skills/[category]/[name].md`
2. Follow skill template format
3. Add entry to this index
4. Test with OpenCode

---

*Last updated: 2026-04-06*
*Inspired by: Claude Code, Letta, GitHub community*
