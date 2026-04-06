# OpenCode Skills Library

Comprehensive skill set for OpenCode - enabling Claude Code-like functionality including memory, RAG, agentic workflows, and multi-agent collaboration.

## 🎯 What's Included

### Core Development Skills
| Skill | Description |
|-------|-------------|
| **web-dev.md** | Modern website development, design replication |
| **wordpress-dev.md** | WordPress themes, plugins, Elementor |
| **react-dev.md** | React and Next.js applications |
| **api-dev.md** | REST API design and integration |
| **deployment.md** | Hosting, CI/CD, domain setup |

### Quality & Review Skills
| Skill | Description |
|-------|-------------|
| **debugging.md** | Systematic debugging and troubleshooting |
| **code-review.md** | Code review best practices and checklists |

---

### Advanced AI Skills

| Skill | Category | Description |
|-------|----------|-------------|
| **[memory/](memory/README.md)** | Memory | Letta-style persistent memory blocks |
| **[rag/](rag/README.md)** | RAG | Retrieval-Augmented Generation knowledge base |
| **[agentic/](agentic/README.md)** | Agentic | Autonomous workflows with planning & self-correction |
| **[commands/](commands/README.md)** | Commands | Reusable slash command templates |
| **[multicrew/](multicrew/README.md)** | Multi-Agent | Coordinated multi-agent collaboration |

---

## 🚀 Quick Start

### Option 1: Basic Website (Recommended for Beginners)
```
1. Read web-dev.md
2. Follow implementation guide
3. Deploy with deployment.md
```

### Option 2: WordPress Site
```
1. Read wordpress-dev.md
2. Build with Elementor
3. Set up forms with WPForms
```

### Option 3: Advanced AI Workflows
```
1. Set up memory system (memory/README.md)
2. Create commands (commands/README.md)
3. Build agentic workflows (agentic/README.md)
4. Coordinate agents (multicrew/README.md)
```

---

## 📚 Skills Architecture

```
skills/
├── INDEX.md              # This file - skill catalog
├── README.md             # Overview and quick start
│
├── basics/               # Fundamental skills
│   ├── web-dev.md
│   ├── debugging.md
│   └── code-review.md
│
├── platforms/            # Platform-specific
│   ├── wordpress-dev.md
│   ├── react-dev.md
│   └── api-dev.md
│
├── memory/               # Memory system (Letta-inspired)
│   └── README.md         # Full memory implementation
│
├── rag/                  # RAG knowledge base
│   └── README.md         # Document retrieval system
│
├── agentic/              # Agentic workflows
│   └── README.md         # ReAct, Plan-Execute, Self-Correcting
│
├── commands/             # Command templates
│   └── README.md         # /debug, /review, /deploy, etc.
│
└── multicrew/           # Multi-agent collaboration
    └── README.md         # Team coordination patterns
```

---

## 🎨 Use Case Examples

### Example 1: Build Horizon Build Group Website
```
1. Read web-dev.md for structure
2. Use Garcon Group as reference (as we did)
3. Set up WordPress with wordpress-dev.md
4. Deploy with deployment.md
```

### Example 2: Set Up Persistent Memory
```
1. Create memory directory: ~/.config/opencode/memory/
2. Initialize blocks: persona.md, human.md, behaviors.md
3. Configure in opencode.json
4. Use journal for cross-session insights
```

### Example 3: Create Code Review Workflow
```
1. Read commands/README.md
2. Create /review command
3. Add security focus (/security)
4. Set up automated hooks
```

### Example 4: Build RAG Knowledge Base
```
1. Read rag/README.md
2. Create knowledge-base/ directory
3. Index documentation
4. Configure semantic search
```

---

## 📊 Feature Matrix

| Feature | Claude Code | OpenCode Implementation |
|---------|-------------|------------------------|
| Memory Blocks | Native | Via opencode-agent-memory |
| Skills | Native | Markdown files |
| Commands | Native | Skill templates |
| Subagents | Native | Task tool |
| RAG | Via MCP | rag/README.md |
| Multi-Agent | Manual setup | multicrew/README.md |
| Context Files | CLAUDE.md | AGENTS.md equivalent |

---

## 🔧 Configuration

### OpenCode Config (`~/.config/opencode/opencode.json`)
```json
{
  "memory": {
    "enabled": true,
    "globalPath": "~/.config/opencode/memory/global",
    "projectPath": "./.opencode/memory"
  },
  "skills": {
    "path": "~/.config/opencode/skills"
  }
}
```

### Recommended Plugins
```json
{
  "plugin": [
    "opencode-agent-memory"
  ]
}
```

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| `INDEX.md` | Complete skill catalog |
| `README.md` | This overview |
| [memory/README.md](memory/README.md) | Persistent memory implementation |
| [rag/README.md](rag/README.md) | RAG knowledge base setup |
| [agentic/README.md](agentic/README.md) | Agentic workflow patterns |
| [commands/README.md](commands/README.md) | Command templates |
| [multicrew/README.md](multicrew/README.md) | Multi-agent coordination |

---

## 🏆 Inspired By

- **Claude Code** - Anthropic's programmable AI coding agent
- **Letta** - LLM agents with editable memory blocks
- **runesleo/claude-code-workflow** - Battle-tested workflow templates
- **GitHub Community** - Open source skill contributions

---

## 🤝 Contributing

To add new skills:
1. Follow skill template format
2. Place in appropriate category
3. Update INDEX.md
4. Test with OpenCode
5. Document examples

---

## License

MIT License - Use freely for your projects.

---

*Built with OpenCode - The Open Source Coding Agent*
*Last updated: 2026-04-06*
