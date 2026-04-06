# OpenCode Supermemory Plugin Installation Guide

## Overview
Install **Supermemory** plugin for OpenCode - persistent memory across sessions.

## Prerequisites
- OpenCode installed (v1.0.115+)
- Bun or npm (for installation)

---

## Installation Steps

### Step 1: Get Your Supermemory API Key

1. Go to: [app.supermemory.ai](https://app.supermemory.ai/?view=integrations)
2. Sign up / Log in (free tier available)
3. Copy your API key (starts with `sm_...`)

### Step 2: Create OpenCode Config Directory

```powershell
# Create config directory if not exists
mkdir -p "$env:USERPROFILE\.config\opencode"

# Create config file
notepad "$env:USERPROFILE\.config\opencode\opencode.jsonc"
```

### Step 3: Add Plugin to Config

Add this to your `opencode.jsonc`:

```jsonc
{
  "plugin": [
    "opencode-supermemory"
  ],
  "supermemory": {
    // API key can also be set via SUPERMEMORY_API_KEY env var
    "similarityThreshold": 0.6,
    "maxMemories": 5,
    "maxProjectMemories": 10,
    "injectProfile": true,
    "containerTagPrefix": "opencode"
  }
}
```

### Step 4: Set Environment Variable (Alternative)

You can also set the API key as an environment variable:

```powershell
# PowerShell
$env:SUPERMEMORY_API_KEY = "sm_your_api_key_here"

# Or add to your PowerShell profile
notepad $PROFILE
# Add: $env:SUPERMEMORY_API_KEY = "sm_your_api_key_here"
```

### Step 5: Restart OpenCode

```bash
opencode -c
```

You should see `supermemory` in the tools list.

---

## Verify Installation

```bash
opencode -c
```

Should output something like:
```
Available tools:
- supermemory (memory search, add, forget)
- Read, Write, Edit, Bash, etc.
```

---

## Features Enabled

### Automatic Memory
- Say "remember that..." to save info
- Say "don't forget..." to save important notes
- Agent auto-remembers project patterns

### Commands
- `/supermemory-init` - Explore and memorize codebase
- `supermemory.search` - Search memories
- `supermemory.add` - Add new memory
- `supermemory.forget` - Remove memory

### Scopes
- **User memories** - Shared across all projects
- **Project memories** - Specific to current project

---

## Troubleshooting

### Plugin not loading?
1. Check config file syntax
2. Restart OpenCode
3. Check logs: `tail -f ~/.opencode-supermemory.log`

### API key not working?
1. Verify key at [app.supermemory.ai](https://app.supermemory.ai/?view=integrations)
2. Set env var: `export SUPERMEMORY_API_KEY="sm_..."`

### Need help?
- Docs: [supermemory.ai/docs/integrations/opencode](https://supermemory.ai/docs/integrations/opencode)
- GitHub: [github.com/supermemoryai/opencode-supermemory](https://github.com/supermemoryai/opencode-supermemory)

---

## Alternative: Local Memory (No API Required)

If you prefer **local-only** memory without cloud sync:

### Option 1: opencode-agent-memory
```bash
# Clone to config
git clone https://github.com/joshuadavidthomas/opencode-agent-memory ~/.config/opencode/opencode-agent-memory

# Add to config
mkdir -p ~/.config/opencode/plugin
ln -sf ~/.config/opencode/opencode-agent-memory/src/plugin.ts ~/.config/opencode/plugin/memory.ts
```

### Option 2: opencode-mem
```bash
npm install -g opencode-mem
```

---

## Config Files Created

| File | Location | Purpose |
|------|---------|---------|
| `opencode-supermemory-config.json` | Project folder | Config template |
| `INSTALL-SUPERMEMORY.md` | Project folder | This guide |

---

*Last updated: 2026-04-06*
