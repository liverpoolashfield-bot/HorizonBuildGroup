# OpenCode Skill: Commands Library

## Purpose
Create reusable command templates for OpenCode - saved prompts that become one-click workflows. Transform repeated instructions into consistent, efficient commands.

## Triggers
Use this skill when:
- Finding yourself typing the same instructions repeatedly
- Creating standardized workflows for your team
- Building reusable expertise patterns
- Scaling AI-assisted development

## Command Structure

```
commands/
├── debug.md              # Systematic debugging
├── review.md             # Code review
├── deploy.md             # Deployment checklist
├── test.md               # Testing workflow
├── explain.md            # Architecture explanation
├── refactor.md           # Refactoring guidance
├── security.md           # Security scan
├── docs.md               # Documentation generation
└── CUSTOM/
    └── [your-commands].md
```

## Command Format

```markdown
# /[command-name]

[description - one line]

---
trigger: [manual | on:event | on:file-change]
tools: [list of required tools]
cost: [low | medium | high]
---

[Detailed instructions for the command]

## Input
{{input}} or define expected inputs

## Output Format
Describe how results should be formatted

## Examples
```
/[command-name] [example-input]
```
```

## Core Commands

### /debug
```markdown
# /debug

Systematic debugging with root cause analysis

---
trigger: manual
tools: Read, Grep, Glob, Bash
cost: medium
---

You are performing systematic debugging. Follow this sequence:

## Phase 1: Reproduce
1. Identify exact symptoms
2. Gather error messages/logs
3. Note environment (OS, versions, config)

## Phase 2: Hypothesis
Based on symptoms, list possible causes:
1. [Cause 1]
2. [Cause 2]
3. [Cause 3]

## Phase 3: Investigate
For each hypothesis:
1. Search relevant code
2. Check recent changes (git log)
3. Review related configs

## Phase 4: Isolate
Find the minimal reproduction case:
- Create test if helpful
- Narrow down to specific component

## Phase 5: Fix
Implement the fix:
1. Explain root cause
2. Show code change
3. Verify fix works

## Output Format
```
## Root Cause
[Clear explanation]

## Fix Applied
```[language]
[patch or new code]
```

## Verification
[How to verify the fix]
```

### /review
```markdown
# /review

Comprehensive code review with multiple focus areas

---
trigger: on:pr_opened | manual
tools: Read, Grep, Glob, Bash
cost: medium
---

Perform a thorough code review covering these dimensions:

## 1. Correctness
- Logic errors
- Edge cases handled
- Error handling
- Type safety

## 2. Security
- Input validation
- SQL injection
- XSS prevention
- Authentication/authorization
- Secrets management

## 3. Performance
- N+1 queries
- Unnecessary loops
- Missing indexes
- Large data handling

## 4. Maintainability
- Code organization
- Naming conventions
- Comments (not too many, not too few)
- Technical debt

## 5. Testing
- Test coverage
- Edge case tests
- Mock usage

## Output Format
```markdown
## Summary
[Overall assessment]

## Issues Found
### 🔴 Critical
- [Issue] (file:line)
  - [Explanation]
  - [Suggestion]

### 🟡 Medium
- [Issue]
  - [Explanation]
  - [Suggestion]

### 🟢 Minor
- [Issue]
  - [Suggestion]

## Strengths
- [What was done well]

## Recommendations
[Additional suggestions]
```
```

### /deploy
```markdown
# /deploy

Pre-deployment checklist and deployment workflow

---
trigger: manual
tools: Bash, Read, Grep
cost: low
---

## Pre-Deployment Checklist

Run through each item:

### Code Quality
- [ ] Tests passing: `npm test`
- [ ] Linting clean: `npm run lint`
- [ ] Type checking: `npm run typecheck`
- [ ] No console.log/debug statements

### Security
- [ ] No secrets in code
- [ ] Environment variables set
- [ ] Dependencies audited: `npm audit`

### Documentation
- [ ] CHANGELOG updated
- [ ] README updated (if needed)
- [ ] API docs updated (if changed)

### Environment
- [ ] Migration scripts ready
- [ ] Feature flags configured
- [ ] Rollback plan prepared

## Deployment Steps

1. **Backup**
   ```bash
   # Create backup
   ```

2. **Deploy to Staging**
   ```bash
   # Deploy command
   ```

3. **Smoke Tests**
   ```bash
   # Run smoke tests
   ```

4. **Monitor**
   - Check error rates
   - Check latency
   - Check logs

5. **Promote to Production**
   ```bash
   # Production deploy
   ```

## Rollback Plan
If issues detected:
```bash
# Rollback command
```

## Output
Report status of each checklist item and deployment outcome.
```

### /explain
```markdown
# /explain

Explain code architecture and patterns

---
trigger: manual
tools: Read, Glob, Grep
cost: low
---

Explain the codebase architecture clearly:

## System Overview
- High-level architecture
- Main components
- Data flow

## Key Patterns
- Design patterns used
- Why they were chosen
- Trade-offs

## Component Relationships
```
[ASCII diagram or Mermaid]
```

## Entry Points
- How the system starts
- Main files
- Critical paths

## Data Model
- Database schema (if applicable)
- Key entities
- Relationships

## Configuration
- Environment variables
- Feature flags
- Important settings

## Output Format
Use clear sections with:
- Diagrams where helpful
- Code examples for complex parts
- Links to relevant files
```

### /test
```markdown
# /test

Generate comprehensive tests

---
trigger: manual
tools: Read, Write, Bash
cost: medium
---

Generate tests following this approach:

## 1. Identify Test Cases
From the code, identify:
- Happy path scenarios
- Edge cases
- Error conditions
- Boundary values

## 2. Test Structure
Follow project conventions:
```javascript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should [expected behavior]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## 3. Coverage Goals
- Minimum 80% coverage
- 100% coverage for critical paths
- All edge cases

## 4. Mock Strategy
- External APIs: Mock
- Database: Use test DB or mocks
- Third-party services: Mock
- Internal modules: Real or mock based on scope

## Output
- Test file at correct location
- All test cases documented
- Run command to verify tests pass
```

### /security
```markdown
# /security

Security-focused code review

---
trigger: manual | on:pr_opened
tools: Read, Grep, Glob
cost: medium
---

Perform security audit focusing on OWASP Top 10:

## A01 - Broken Access Control
- [ ] Vertical privilege escalation
- [ ] Horizontal privilege escalation
- [ ] IDOR vulnerabilities
- [ ] Missing authorization checks

## A02 - Cryptographic Failures
- [ ] Weak cryptography
- [ ] Improper key management
- [ ] Sensitive data exposure
- [ ] Weak hash algorithms

## A03 - Injection
- [ ] SQL injection
- [ ] Command injection
- [ ] XSS (reflected, stored, DOM)
- [ ] LDAP injection
- [ ] ORM injection

## A04 - Insecure Design
- [ ] Business logic flaws
- [ ] Rate limiting
- [ ] Mass assignment
- [ ] Insufficient anti-automation

## A05 - Security Misconfiguration
- [ ] Default credentials
- [ ] Error handling (info leakage)
- [ ] Unnecessary features
- [ ] Missing security headers

## A06 - Vulnerable Components
- [ ] Outdated dependencies
- [ ] Untrusted packages
- [ ] Known CVEs

## Output Format
```markdown
## Findings
### 🔴 High Risk
- [Vulnerability] (file:line)
  - Impact
  - POC
  - Remediation

### 🟡 Medium Risk
...

### 🟢 Info
...
```
```

### /refactor
```markdown
# /refactor

Guided code refactoring

---
trigger: manual
tools: Read, Edit, Grep
cost: high
---

Refactor code while maintaining functionality:

## Assessment
1. Understand current implementation
2. Identify improvement areas:
   - Complexity
   - Duplication
   - Naming
   - Performance
   - Testability

## Planning
Create refactoring plan:
1. [ ] Change 1
2. [ ] Change 2
...

## Execution
1. Write failing tests (capture behavior)
2. Make smallest change first
3. Run tests after each change
4. Commit after each successful refactor

## Safety Checklist
- [ ] Tests pass before refactor
- [ ] Tests pass after each step
- [ ] No behavioral changes
- [ ] Performance not degraded

## Output
- List of changes made
- Before/after code comparison
- Verification that tests still pass
```

### /docs
```markdown
# /docs

Generate or update documentation

---
trigger: manual | on:api_changed
tools: Read, Write, Glob
cost: medium
---

Generate comprehensive documentation:

## Document Type
Identify appropriate format:
- API docs (endpoint reference)
- README (project overview)
- Architecture doc
- Tutorial/Guide
- Code comments

## Structure
Follow best practices for document type:

### API Docs
```markdown
## Endpoint Name

### Description
[What it does]

### Request
- Method: GET/POST/etc
- URL: /api/v1/...
- Headers: [Auth, Content-Type]
- Body: [Schema]

### Response
- Status codes
- Response body schema
- Examples

### Errors
- Error codes
- Error body schema
```

### README
```markdown
# Project Name

## Quick Start
[3-5 steps to get running]

## Features
- [Feature 1]
- [Feature 2]

## Requirements
- [List]

## Installation
[Steps]

## Usage
[Examples]

## Contributing
[Guidelines]
```

## Quality Checklist
- [ ] Clear and concise
- [ ] Code examples included
- [ ] Edge cases documented
- [ ] Links work
- [ ] Formatting consistent
```

## Custom Command Template

```markdown
# /[your-command]

[One-line description]

---
trigger: [manual | on:event | on:file-change]
tools: [Read | Write | Edit | Bash | Grep | Glob]
cost: [low | medium | high]
---

[Detailed instructions for Claude]

## Context
When to use this command:
- [Scenario 1]
- [Scenario 2]

## Process
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Input
{{input}} or define expected inputs:
- `param1`: [Description]
- `param2`: [Description]

## Output Format
```[format]
[Expected output structure]
```

## Examples
```
/[your-command] [example input]
```
```

## Best Practices

### When to Create a Command
- You type the same instruction 3+ times
- The task is complex with multiple steps
- Consistency matters across sessions
- Other team members would benefit

### Command Design Tips
- Clear, descriptive name
- Single responsibility
- Explicit inputs/outputs
- Include examples
- Set appropriate cost/trigger

### Maintenance
- Review commands quarterly
- Update when stack changes
- Retire obsolete commands
- Gather team feedback

## Command Organization

```
commands/
├── README.md              # This file
├── essential/             # Must-have commands
│   ├── debug.md
│   ├── review.md
│   └── deploy.md
├── quality/               # Code quality
│   ├── security.md
│   ├── test.md
│   └── lint.md
├── documentation/         # Docs generation
│   ├── docs.md
│   └── explain.md
└── custom/               # Team-specific
    ├── frontend.md
    ├── backend.md
    └── infra.md
```

## Checklist
- [ ] Essential commands created
- [ ] Custom commands for your stack
- [ ] Commands documented
- [ ] Team trained on usage
- [ ] Regular review scheduled
