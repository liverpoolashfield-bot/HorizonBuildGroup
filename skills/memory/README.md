# OpenCode Skill: Agent Memory System

## Purpose
Implement persistent, self-editable memory blocks for OpenCode - inspired by Letta's memory architecture. Information survives across sessions and context compaction.

## Triggers
Use this skill when:
- Setting up OpenCode for long-term projects
- Creating cross-session context persistence
- Building AI agents with long-term memory
- Implementing Letta-style memory blocks

## Architecture

### Three Memory Types

```
┌─────────────────────────────────────────────────────────────┐
│ MEMORY LAYERS                                              │
├─────────────────────────────────────────────────────────────┤
│ Layer 0: ALWAYS LOADED (~2K tokens)                        │
│ ├── persona.md      - How agent should behave              │
│ ├── human.md        - User preferences, habits, constraints │
│ └── behaviors.md    - Core behavior rules                   │
├─────────────────────────────────────────────────────────────┤
│ Layer 1: ON-DEMAND (~1-3K each)                           │
│ ├── project/*.md    - Codebase-specific knowledge           │
│ ├── domain/*.md     - Industry/domain expertise             │
│ └── patterns.md     - Code patterns and solutions           │
├─────────────────────────────────────────────────────────────┤
│ Layer 2: HOT DATA (session state)                          │
│ ├── today.md        - Current session log                  │
│ ├── tasks.md        - Active task registry                  │
│ └── goals.md        - Weekly/monthly goals                 │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
~/.config/opencode/
├── memory/
│   ├── global/              # Shared across all projects
│   │   ├── persona.md       # Agent persona
│   │   ├── human.md         # User details
│   │   └── patterns.md      # Cross-project patterns
│   └── project/              # Per-project memory
│       └── [project-name]/
│           ├── context.md    # Codebase-specific
│           ├── conventions.md # Coding standards
│           └── decisions.md   # Architecture decisions
├── journal/                  # Append-only entries
│   └── [date]-[title].md
└── agent-memory.json         # Configuration
```

## Memory Block Format

```markdown
---
label: persona
description: How the agent should behave - formal vs casual, technical depth level, response style
limit: 2000
read_only: false
created: 2026-04-06
updated: 2026-04-06
---

# Agent Persona

You are a senior software engineer with expertise in:
- Web development (React, Next.js, WordPress)
- System architecture and design patterns
- Code review and best practices
- Clear, concise communication

Response style:
- Technical but accessible
- Provide code examples when helpful
- Ask clarifying questions for ambiguous requests
```

## Core Memory Blocks

### 1. persona.md
```markdown
---
label: persona
description: Agent behavior and response style guidelines
limit: 2000
---

# Agent Persona

You are a [ROLE] with expertise in [DOMAINS].

Communication style:
- [FORMAL/CASUAL]
- [TECHNICAL_LEVEL: beginner/intermediate/expert]
- [RESPONSE_LENGTH: brief/detailed]

Special behaviors:
- Always verify code before claiming completion
- Ask clarifying questions when ambiguous
- Suggest improvements proactively
```

### 2. human.md
```markdown
---
label: human
description: User preferences, habits, and constraints
limit: 3000
---

# User Profile

Name: [USER_NAME]
Role: [DEVELOPER_ROLE]
Preferences:
- Preferred programming languages: [LIST]
- Code style preferences: [STYLE]
- Communication preferences: [STYLE]
- Working hours/timezone: [TZ]

Constraints:
- Never suggest breaking changes without approval
- Always run tests before claiming completion
- [OTHER_CONSTRAINTS]

Current projects:
- [PROJECT_1]: [DESCRIPTION]
- [PROJECT_2]: [DESCRIPTION]
```

### 3. project context.md
```markdown
---
label: project-context
description: Codebase-specific knowledge for the current project
limit: 5000
---

# [Project Name]

## Architecture
[High-level architecture description]

## Tech Stack
- Frontend: [TECH]
- Backend: [TECH]
- Database: [DB]
- Deployment: [PLATFORM]

## Key Conventions
- File naming: [CONVENTION]
- Code style: [STYLE_GUIDE]
- Git workflow: [BRANCHING_STRATEGY]

## Important Notes
[Non-obvious constraints, known issues, technical debt]
```

## Memory Operations

### Read Memory
```javascript
// memory_list - List available blocks
function memory_list() {
  return listMemoryBlocks()
}

// memory_read - Read specific block
function memory_read(blockId) {
  return readMemoryBlock(blockId)
}
```

### Write Memory
```javascript
// memory_set - Create or overwrite block
function memory_set(blockId, content) {
  return writeMemoryBlock(blockId, content)
}

// memory_replace - Replace substring in block
function memory_replace(blockId, oldString, newString) {
  return updateMemoryBlock(blockId, oldString, newString)
}
```

## Memory Flush Triggers

Configure automatic saves at these events:

| Event | Action |
|-------|--------|
| Task completion | Save progress to today.md |
| Commit | Save context summary |
| Session end | Full memory flush |
| Error | Save debugging context |
| Significant discovery | Save to patterns.md |

## Journal System

### Entry Format
```markdown
---
id: 2026-04-06-001
project: horizon-build-group
tags: [web-dev, wordpress, formwork]
model: claude-sonnet-4
timestamp: 2026-04-06T20:00:00Z
---

# Discovery: Garcon Group is ideal reference

During planning for Horizon Build Group website, discovered that 
Garcon Group (garcon-group.com.au) provides the best template 
for lead-generation focused construction websites.

Key insights:
- Single-page scrolling design
- Client logo showcase builds trust
- Named testimonials with company attribution
- Simple quote request form

Tags: #web-dev #reference-site #construction
```

### Journal Operations
```javascript
// journal_write - New entry
function journal_write(title, body, tags) {
  // Append-only, with YAML frontmatter
}

// journal_search - Semantic search
function journal_search(query, filters) {
  // Filter by project, tags, date range
}

// journal_read - Get entry by ID
function journal_read(entryId) {
  // Returns full entry with metadata
}
```

## Integration with OpenCode

### Configuration (opencode.json)
```json
{
  "memory": {
    "enabled": true,
    "globalPath": "~/.config/opencode/memory/global",
    "projectPath": "./.opencode/memory",
    "journalPath": "~/.config/opencode/journal"
  },
  "journal": {
    "enabled": true,
    "tags": ["web-dev", "debug", "architecture", "decision"]
  }
}
```

### System Prompt Injection
Memory blocks are automatically injected into the system prompt:
```
[SYSTEM]
You have access to persistent memory. Before responding:
1. Check relevant memory blocks for context
2. Update memory if you learn something significant
3. Record important discoveries in journal

Current user: [from human.md]
Your role: [from persona.md]
```

## Best Practices

### What to Store
- Architecture decisions and rationale
- Coding conventions and standards
- User preferences and constraints
- Project-specific knowledge
- Cross-project patterns

### What NOT to Store
- Temporary working notes (use today.md)
- Session-specific context (ephemeral)
- Sensitive credentials (use env vars)
- Stale information (update regularly)

### Memory Hygiene
- Review global blocks monthly
- Archive old journal entries
- Prune unused project blocks
- Update stale information promptly

## Checklist
- [ ] Memory directory structure created
- [ ] Core blocks initialized (persona, human, behaviors)
- [ ] Project blocks set up
- [ ] Journal system configured
- [ ] Memory flush triggers configured
- [ ] First session data captured
