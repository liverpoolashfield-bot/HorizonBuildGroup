# OpenCode Skill: Agentic Workflows

## Purpose
Build autonomous agentic workflows for OpenCode - enabling self-directed task completion with planning, execution, verification, and self-correction capabilities.

## Triggers
Use this skill when:
- Automating complex multi-step tasks
- Building self-correcting AI agents
- Implementing autonomous coding workflows
- Creating task orchestration systems

## Agentic Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ AGENTIC LOOP                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                           │
│  │   THINK     │ ◄──────────────────┐                      │
│  │  (Reason)   │                   │                      │
│  └──────┬──────┘                   │                      │
│         │                          │                      │
│         ▼                          │                      │
│  ┌─────────────┐    ┌─────────────┴───┐                  │
│  │   PLAN      │───►│    ACT         │                  │
│  │ (Decide)    │    │  (Execute Tool) │                  │
│  └─────────────┘    └────────┬────────┘                  │
│                              │                            │
│                              ▼                            │
│                        ┌─────────────┐                   │
│                        │   OBSERVE   │                   │
│                        │ (Get Result) │                   │
│                        └──────┬──────┘                   │
│                               │                           │
│              ┌────────────────┼────────────────┐          │
│              ▼                ▼                ▼          │
│        ┌──────────┐   ┌────────────┐   ┌──────────┐      │
│        │ Success? │   │ Needs     │   │ Error?   │      │
│        │          │   │ More?     │   │          │      │
│        └────┬─────┘   └─────┬──────┘   └────┬─────┘      │
│             │Yes             │Yes            │No          │
│             ▼                ▼               ▼          │
│        ┌─────────┐     ┌──────────┐     ┌──────────┐     │
│        │COMPLETE │     │  LOOP    │────►│ RETRY /  │     │
│        └─────────┘     │ (Think)   │     │ FALLBACK │     │
│                        └──────────┘     └──────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Core Agentic Patterns

### 1. ReAct (Reason + Act)
```javascript
// ReAct agent implementation
class ReActAgent {
  constructor(config) {
    this.maxIterations = config.maxIterations || 10
    this.tools = config.tools
    this.systemPrompt = config.systemPrompt
  }
  
  async run(task) {
    let thought = ''
    let action = null
    let observation = ''
    let iteration = 0
    
    while (iteration < this.maxIterations) {
      // 1. Reason
      thought = await this.reason(task, observation, iteration)
      
      // 2. Decide action
      action = await this.decideAction(thought, this.tools)
      
      // 3. Execute
      const result = await this.execute(action)
      observation = this.formatObservation(result)
      
      // 4. Check completion
      if (this.isComplete(thought, action, result)) {
        return { success: true, result, iterations: iteration }
      }
      
      iteration++
    }
    
    return { success: false, reason: 'Max iterations reached' }
  }
  
  async reason(task, observation, iteration) {
    const prompt = `
Task: ${task}

${iteration > 0 ? `Previous observation: ${observation}` : ''}

Think step by step about:
1. What is the current state?
2. What needs to be done next?
3. What tools can help?

Provide your reasoning in <thought> tags.
`
    return await llm.complete(prompt, { tags: ['thought'] })
  }
  
  async decideAction(thought, tools) {
    const prompt = `
Based on your reasoning, decide the next action.

Available tools:
${tools.map(t => `- ${t.name}: ${t.description}`).join('\n')}

Reasoning: ${thought}

Choose ONE tool and provide:
1. Tool name
2. Tool arguments
3. Why this tool

Format in <action> tags.
`
    return await llm.complete(prompt, { tags: ['action'] })
  }
  
  async execute(action) {
    const { tool, args } = parseAction(action)
    const toolFn = this.tools.find(t => t.name === tool)
    return await toolFn.execute(args)
  }
  
  isComplete(thought, action, result) {
    const prompt = `
Given:
- Reasoning: ${thought}
- Action: ${action}
- Result: ${result}

Is the task complete? Answer YES or NO with brief explanation.
`
    return llm.complete(prompt).toLowerCase().includes('yes')
  }
}
```

### 2. Plan-and-Execute
```javascript
// Plan-and-Execute pattern
async function planAndExecute(task, context = {}) {
  // PHASE 1: Planning
  const plan = await createPlan(task, context)
  
  // PHASE 2: Execution with tracking
  const results = []
  for (const step of plan.steps) {
    const result = await executeStep(step, context)
    results.push({ step: step.id, result, success: true })
    
    // Verify step outcome
    if (!verifyStep(step, result)) {
      // Attempt recovery
      const recovery = await handleStepFailure(step, result)
      results[results.length - 1] = { ...results[results.length - 1], recovery }
    }
  }
  
  // PHASE 3: Synthesize results
  return synthesizeResults(plan, results)
}

async function createPlan(task, context) {
  const prompt = `
Task: ${task}

Context:
- Project: ${context.projectName}
- Available tools: ${context.availableTools.join(', ')}
- Constraints: ${context.constraints.join(', ')}

Create a detailed plan with:
1. Clear objectives
2. Ordered steps
3. Dependencies between steps
4. Success criteria for each step

Output as structured JSON.
`
  return JSON.parse(await llm.complete(prompt))
}
```

### 3. Self-Correcting Agent
```javascript
// Self-correcting execution
class SelfCorrectingAgent {
  constructor() {
    this.maxRetries = 3
    this.errorPatterns = [
      { pattern: /syntax error/i, fix: 'review syntax and correct' },
      { pattern: /not defined/i, fix: 'check variable declarations' },
      { pattern: /cannot read/i, fix: 'verify object exists and is initialized' }
    ]
  }
  
  async executeWithRetry(task, step) {
    let attempt = 0
    let lastError = null
    
    while (attempt < this.maxRetries) {
      try {
        const result = await step.execute()
        
        // Verify output quality
        const verified = await this.verifyOutput(step, result)
        if (verified.valid) {
          return { success: true, result, attempts: attempt + 1 }
        }
        
        // Handle quality issues
        lastError = verified.reason
        const fix = await this.suggestFix(step, lastError)
        step = this.applyFix(step, fix)
        
      } catch (error) {
        lastError = error.message
        
        // Check known error patterns
        const knownFix = this.errorPatterns.find(e => 
          e.pattern.test(error.message)
        )
        
        if (knownFix) {
          step = this.applyFix(step, knownFix.fix)
        }
      }
      
      attempt++
    }
    
    return { 
      success: false, 
      error: lastError, 
      attempts: attempt,
      escalation: 'manual_review_required'
    }
  }
  
  async verifyOutput(step, result) {
    const prompt = `
Step: ${step.description}
Output: ${JSON.stringify(result)}

Verify:
1. Is the output correct?
2. Does it meet the step's success criteria?
3. Are there any issues?

Respond with:
VALID: true/false
REASON: explanation if invalid
`
    return parseVerification(await llm.complete(prompt))
  }
}
```

## Workflow Templates

### 1. Code Review Workflow
```javascript
const codeReviewWorkflow = {
  name: 'code-review',
  description: 'Autonomous code review with security focus',
  
  trigger: 'on:pr_opened | on:manual_invocation',
  
  steps: [
    {
      id: 'fetch-diff',
      name: 'Fetch PR Changes',
      tool: 'github',
      args: { action: 'getDiff', prNumber: '{{prNumber}}' },
      verify: (result) => result.diff.length > 0
    },
    {
      id: 'analyze-security',
      name: 'Security Analysis',
      tool: 'agent',
      agent: 'security-reviewer',
      input: '{{fetch-diff.output}}',
      focus: ['injection', 'auth', 'secrets']
    },
    {
      id: 'analyze-quality',
      name: 'Code Quality Analysis',
      tool: 'agent',
      agent: 'quality-reviewer',
      input: '{{fetch-diff.output}}'
    },
    {
      id: 'generate-report',
      name: 'Generate Review Report',
      tool: 'template',
      template: 'pr-review-template',
      data: {
        security: '{{analyze-security.findings}}',
        quality: '{{analyze-quality.findings}}'
      }
    },
    {
      id: 'post-comment',
      name: 'Post Review Comment',
      tool: 'github',
      args: { 
        action: 'postComment',
        prNumber: '{{prNumber}}',
        body: '{{generate-report.output}}'
      }
    }
  ]
}
```

### 2. Bug Fix Workflow
```javascript
const bugFixWorkflow = {
  name: 'auto-bug-fix',
  description: 'Autonomous bug diagnosis and fix',
  
  trigger: 'on:issue_labeled:bug | on:manual_invocation',
  
  steps: [
    {
      id: 'understand-bug',
      name: 'Understand Bug Report',
      tool: 'llm',
      prompt: `
Analyze this bug report and extract:
1. Expected behavior
2. Actual behavior
3. Steps to reproduce
4. Environment/context
5. Error messages if any

Bug Report:
{{issue.body}}
      `
    },
    {
      id: 'find-relevant-code',
      name: 'Locate Relevant Code',
      tool: 'grep',
      args: { 
        pattern: '{{understand-bug.keyTerms}}',
        scope: 'main'
      }
    },
    {
      id: 'analyze-root-cause',
      name: 'Root Cause Analysis',
      tool: 'agent',
      agent: 'debugger',
      input: {
        code: '{{find-relevant-code.files}}',
        bugDescription: '{{understand-bug}}'
      },
      reasoning: 'systematic-debugging'
    },
    {
      id: 'implement-fix',
      name: 'Implement Fix',
      tool: 'edit',
      patches: '{{analyze-root-cause.patches}}'
    },
    {
      id: 'verify-fix',
      name: 'Verify Fix Works',
      tool: 'bash',
      args: { 
        command: '{{analyze-root-cause.testCommand}}'
      }
    },
    {
      id: 'create-pr',
      name: 'Create Fix PR',
      tool: 'github',
      args: {
        action: 'createPR',
        title: 'Fix: {{understand-bug.summary}}',
        body: '## Summary\n{{understand-bug}}\n\n## Fix\n{{analyze-root-cause.explanation}}'
      }
    }
  ]
}
```

### 3. Feature Development Workflow
```javascript
const featureWorkflow = {
  name: 'develop-feature',
  description: 'End-to-end feature development',
  
  trigger: 'on:issue_labeled:feature | on:manual_invocation',
  
  steps: [
    {
      id: 'analyze-requirements',
      name: 'Requirements Analysis',
      tool: 'llm',
      prompt: `
Create a detailed specification for this feature:

Feature Request:
{{input}}

Include:
1. User stories
2. Acceptance criteria
3. Technical approach
4. API design (if applicable)
5. Edge cases
`
    },
    {
      id: 'create-plan',
      name: 'Implementation Plan',
      tool: 'llm',
      prompt: `
Based on the specification, create an implementation plan:

Specification:
{{analyze-requirements}}

Include:
1. File changes needed
2. Implementation order
3. Test requirements
4. Potential risks
`
    },
    {
      id: 'implement',
      name: 'Implement Feature',
      tool: 'agent',
      agent: 'developer',
      instructions: '{{create-plan}}'
    },
    {
      id: 'write-tests',
      name: 'Write Tests',
      tool: 'agent',
      agent: 'test-writer',
      context: {
        implementation: '{{implement}}',
        spec: '{{analyze-requirements}}'
      }
    },
    {
      id: 'run-tests',
      name: 'Run Test Suite',
      tool: 'bash',
      args: { command: 'npm test' }
    },
    {
      id: 'update-docs',
      name: 'Update Documentation',
      tool: 'agent',
      agent: 'technical-writer',
      context: {
        feature: '{{analyze-requirements}}',
        implementation: '{{implement}}'
      }
    }
  ]
}
```

## Agent Types

### Specialized Agents

| Agent | Purpose | Tools |
|-------|---------|-------|
| debugger | Root cause analysis | Read, Grep, Bash |
| security-reviewer | Vulnerability detection | CodeSearch, LLMSecurity |
| quality-reviewer | Code quality checks | Read, ESLint, TypeCheck |
| test-writer | Generate test cases | Read, Write, Bash |
| refactorer | Improve code structure | Read, Edit, Grep |
| technical-writer | Documentation | Read, Write |

### Agent Definition Format
```javascript
const agent = {
  name: 'debugger',
  description: 'Systematic debugging specialist',
  tools: ['Read', 'Grep', 'Bash', 'Glob'],
  systemPrompt: `
You are a senior debugging specialist with expertise in:
- Systematic root cause analysis
- Reading complex codebases
- Formulating and testing hypotheses
- Explaining issues clearly

Your debugging approach:
1. Reproduce the issue
2. Gather symptoms
3. Form hypothesis
4. Test hypothesis
5. Isolate root cause
6. Verify fix

Always:
- Verify before claiming fix
- Consider edge cases
- Document the root cause
`,
  constraints: [
    'Never modify production directly',
    'Always create backup before changes',
    'Report findings clearly'
  ]
}
```

## Error Handling & Recovery

### Error Types & Strategies
```javascript
const errorStrategies = {
  'tool-not-found': {
    retry: false,
    fallback: 'search-alternatives',
    escalation: 'ask-user'
  },
  'rate-limit': {
    retry: true,
    backoff: 'exponential',
    maxRetries: 3
  },
  'syntax-error': {
    retry: false,
    fallback: 'show-corrected-code',
    escalation: 'none'
  },
  'timeout': {
    retry: true,
    backoff: 'linear',
    maxRetries: 2
  },
  'permission-denied': {
    retry: false,
    fallback: 'request-permission',
    escalation: 'ask-user'
  }
}
```

### Recovery Chains
```javascript
async function executeWithRecovery(step, context) {
  try {
    return await step.execute()
  } catch (error) {
    const strategy = errorStrategies[error.type] || errorStrategies.default
    
    if (strategy.retry) {
      return await retryWithBackoff(step, strategy)
    }
    
    if (strategy.fallback) {
      return await executeFallback(step, strategy.fallback)
    }
    
    if (strategy.escalation === 'ask-user') {
      return await askUserForHelp(error, step)
    }
  }
}
```

## Workflow Orchestration

### Sequential Execution
```javascript
async function runSequential(workflow, context) {
  const results = []
  
  for (const step of workflow.steps) {
    const resolvedStep = resolveVariables(step, context)
    const result = await executeWithRecovery(resolvedStep, context)
    
    results.push(result)
    context[step.id] = result
    
    // Check for early termination
    if (result.shouldStopWorkflow) {
      break
    }
  }
  
  return results
}
```

### Parallel Execution
```javascript
async function runParallel(workflow, context) {
  // Find independent steps
  const { parallel, sequential } = partitionSteps(workflow.steps)
  
  // Run parallel groups
  const results = []
  for (const group of parallel) {
    const groupResults = await Promise.all(
      group.map(step => {
        const resolved = resolveVariables(step, context)
        return executeWithRecovery(resolved, context)
      })
    )
    results.push(...groupResults)
  }
  
  // Run sequential after parallel completes
  const sequentialResults = await runSequential({ steps: sequential }, context)
  
  return [...results, ...sequentialResults]
}
```

## Monitoring & Observability

### Workflow Metrics
```javascript
const metrics = {
  workflow_duration_seconds: measureDuration(workflow),
  step_success_rate: calculateSuccessRate(steps),
  error_types: countByType(errors),
  retry_count: sumRetries(),
  tokens_used: trackTokenUsage(),
  cost_per_execution: calculateCost()
}
```

### Logging
```javascript
function logWorkflowEvent(event) {
  const log = {
    timestamp: new Date().toISOString(),
    workflow: event.workflowName,
    step: event.stepId,
    event: event.type,
    data: event.data,
    duration: event.duration
  }
  
  // Write to workflow logs
  writeLog('workflows', log)
  
  // Alert on issues
  if (event.type === 'error' || event.type === 'escalation') {
    sendAlert(log)
  }
}
```

## Checklist
- [ ] Agentic patterns understood (ReAct, Plan-Execute)
- [ ] Core agents defined (debugger, reviewer, etc.)
- [ ] Workflow templates created
- [ ] Error handling configured
- [ ] Recovery strategies implemented
- [ ] Monitoring set up
- [ ] First workflow tested
