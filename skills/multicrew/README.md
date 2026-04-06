# OpenCode Skill: Multi-Agent Collaboration

## Purpose
Implement multi-agent workflows for OpenCode - enabling coordinated task execution where multiple AI agents work together on complex problems.

## Triggers
Use this skill when:
- Scaling complex tasks across agents
- Implementing code review with multiple specialists
- Running parallel analysis workflows
- Building coordinated agent teams

## Multi-Agent Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ MULTI-AGENT PATTERNS                                     │
├─────────────────────────────────────────────────────────┤
│                                                             │
│  PATTERN 1: PARALLEL                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐                               │
│  │ A1  │ │ A2  │ │ A3  │  Same task, different data   │
│  └──┬──┘ └──┬──┘ └──┬──┘                               │
│     └────────┴────────┘                                   │
│              │                                            │
│              ▼                                            │
│        ┌─────────┐                                        │
│        │AGGREGATE│  Merge results                        │
│        └─────────┘                                        │
│                                                             │
│  PATTERN 2: PIPELINE                                     │
│  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐                 │
│  │ A1  │──►│ A2  │──►│ A3  │──►│ A4  │                │
│  └─────┘   └─────┘   └─────┘   └─────┘                  │
│             Output       Output      Output                 │
│             of A1       of A2       of A3                  │
│                                                             │
│  PATTERN 3: HIERARCHICAL                                 │
│           ┌─────┐                                         │
│           │BOSS │  Coordinates subtasks                   │
│           └──┬──┘                                         │
│         ┌────┼────┐                                      │
│         ▼    ▼    ▼                                      │
│      ┌────┐┌────┐┌────┐                                 │
│      │ W1 ││ W2 ││ W3 │  Workers execute                 │
│      └────┘└────┘└────┘                                 │
│                                                             │
│  PATTERN 4: SUPERVISOR + TOOL                            │
│           ┌─────┐                                         │
│           │SUPER│  Reviews outputs                        │
│           └──┬──┘                                         │
│         ┌────┼────┐                                      │
│         ▼    ▼    ▼                                      │
│      ┌────┐┌────┐┌────┐                                 │
│      │TOOL││TOOL││TOOL│  Specialized execution           │
│      └────┘└────┘└────┘                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Agent Team Structure

```javascript
const team = {
  name: 'development-team',
  agents: [
    {
      id: 'architect',
      role: 'Technical Architect',
      model: 'claude-opus',
      tools: ['Read', 'Grep', 'Glob'],
      focus: ['architecture', 'design-patterns', 'trade-offs']
    },
    {
      id: 'backend-dev',
      role: 'Backend Developer',
      model: 'claude-sonnet',
      tools: ['Read', 'Write', 'Edit', 'Bash'],
      focus: ['api', 'database', 'server']
    },
    {
      id: 'frontend-dev',
      role: 'Frontend Developer',
      model: 'claude-sonnet',
      tools: ['Read', 'Write', 'Edit', 'Bash'],
      focus: ['ui', 'components', 'styling']
    },
    {
      id: 'security-reviewer',
      role: 'Security Specialist',
      model: 'claude-opus',
      tools: ['Read', 'Grep', 'Glob'],
      focus: ['vulnerabilities', 'auth', 'data-protection']
    },
    {
      id: 'qa-engineer',
      role: 'QA Engineer',
      model: 'claude-sonnet',
      tools: ['Read', 'Write', 'Bash'],
      focus: ['testing', 'quality', 'edge-cases']
    }
  ],
  coordination: {
    pattern: 'hierarchical',
    supervisor: 'architect'
  }
}
```

## Collaboration Patterns

### 1. Parallel Analysis
```javascript
// Launch multiple agents for independent analysis
async function parallelAnalysis(task, agents) {
  const agentConfigs = [
    { agent: 'security-reviewer', focus: 'security' },
    { agent: 'quality-reviewer', focus: 'quality' },
    { agent: 'performance-reviewer', focus: 'performance' }
  ]
  
  // Execute all agents in parallel
  const results = await Promise.all(
    agentConfigs.map(config => 
      spawnAgent(config.agent, {
        task: task,
        focus: config.focus,
        context: getSharedContext()
      })
    )
  )
  
  // Aggregate findings
  return aggregateFindings(results)
}

// Example: Multi-angle code review
const reviewResults = await parallelAnalysis(code, [
  'security-reviewer',
  'performance-reviewer',
  'best-practices-reviewer'
])
```

### 2. Sequential Handoff
```javascript
// Pass work between specialized agents
async function sequentialPipeline(task) {
  // Step 1: Design
  const design = await spawnAgent('architect', {
    task: `Design solution for: ${task}`
  })
  
  // Step 2: Backend implementation
  const backend = await spawnAgent('backend-dev', {
    task: design.architecture,
    context: { role: 'backend' }
  })
  
  // Step 3: Frontend implementation
  const frontend = await spawnAgent('frontend-dev', {
    task: design.architecture,
    context: { role: 'frontend' }
  })
  
  // Step 4: Integration
  const integration = await spawnAgent('backend-dev', {
    task: `Integrate:\nBackend: ${backend}\nFrontend: ${frontend}`
  })
  
  return {
    design,
    backend,
    frontend,
    integration
  }
}
```

### 3. Supervisor Pattern
```javascript
// Supervisor reviews and routes
class SupervisorAgent {
  async coordinate(task) {
    // Analyze task complexity
    const analysis = await this.analyze(task)
    
    if (analysis.simple) {
      // Simple task - handle directly
      return await this.handleDirect(task)
    }
    
    if (analysis.multiComponent) {
      // Decompose and distribute
      const subtasks = await this.decompose(task)
      return await this.distributeAndMonitor(subtasks)
    }
    
    if (analysis.needsExpertise) {
      // Route to specialist
      return await this.routeToSpecialist(task, analysis.requiredExpertise)
    }
    
    // Default: handle with full capability
    return await this.handleDirect(task)
  }
  
  async distributeAndMonitor(subtasks) {
    const workers = await this.spawnWorkers(subtasks)
    
    // Monitor progress
    const results = []
    for (const worker of workers) {
      const result = await this.monitorWorker(worker)
      results.push(result)
      
      // Review and potentially retry
      if (!this.isSatisfactory(result)) {
        const retry = await this.retryWithFeedback(worker, result)
        results[results.indexOf(result)] = retry
      }
    }
    
    // Final synthesis
    return await this.synthesizeResults(results)
  }
}
```

### 4. Debate/Consensus
```javascript
// Agents debate and reach consensus
async function debateAndDecide(problem, agents) {
  const perspectives = agents.map(agent => ({
    agent: agent.id,
    view: await spawnAgent(agent.id, {
      task: problem,
      instruction: `Analyze from your expertise perspective: ${agent.role}`
    })
  }))
  
  // Identify disagreements
  const disagreements = identifyDifferences(perspectives)
  
  if (disagreements.length === 0) {
    return perspectives[0].view // Consensus reached
  }
  
  // Debate rounds
  for (let round = 0; round < 3; round++) {
    for (const perspective of perspectives) {
      perspective.view = await spawnAgent(perspective.agent, {
        task: problem,
        context: {
          otherViews: perspectives.filter(p => p.agent !== perspective.agent).map(p => p.view),
          disagreements: disagreements
        },
        instruction: 'Consider alternatives and update your position'
      })
    }
    
    // Check for consensus
    const consensus = checkConsensus(perspectives)
    if (consensus) return consensus
  }
  
  // Final arbitration
  return await this.arbitrate(problem, perspectives)
}
```

## Agent Communication

### Message Types
```javascript
const messageTypes = {
  TASK: {
    type: 'task',
    fields: ['id', 'description', 'priority', 'deadline']
  },
  RESULT: {
    type: 'result',
    fields: ['taskId', 'success', 'output', 'metrics']
  },
  ERROR: {
    type: 'error',
    fields: ['taskId', 'error', 'attempt', 'canRetry']
  },
  STATUS: {
    type: 'status',
    fields: ['agentId', 'state', 'progress', 'blockedBy']
  },
  HANDOVER: {
    type: 'handover',
    fields: ['from', 'to', 'context', 'instructions']
  }
}
```

### Message Passing
```javascript
// Agent message bus
class AgentMessageBus {
  constructor() {
    this.subscribers = new Map()
    this.messageLog = []
  }
  
  subscribe(agentId, callback) {
    if (!this.subscribers.has(agentId)) {
      this.subscribers.set(agentId, [])
    }
    this.subscribers.get(agentId).push(callback)
  }
  
  publish(message) {
    this.messageLog.push({
      ...message,
      timestamp: Date.now()
    })
    
    const callbacks = this.subscribers.get(message.to) || []
    callbacks.forEach(cb => cb(message))
  }
  
  getHistory(agentId, since) {
    return this.messageLog.filter(m => 
      (m.from === agentId || m.to === agentId) &&
      m.timestamp > since
    )
  }
}
```

## Task Distribution

### Load Balancing
```javascript
// Distribute tasks based on agent capabilities
class TaskDistributor {
  selectAgent(task, availableAgents) {
    const scores = availableAgents.map(agent => ({
      agent,
      score: this.calculateFit(task, agent)
    }))
    
    // Sort by score and add some randomness to prevent starvation
    scores.sort((a, b) => b.score - a.score + Math.random() * 0.1)
    
    return scores[0].agent
  }
  
  calculateFit(task, agent) {
    let score = 0
    
    // Tool fit (must have required tools)
    const hasTools = task.requiredTools.every(t => 
      agent.tools.includes(t)
    )
    if (!hasTools) return -1
    score += 30
    
    // Domain fit
    if (agent.domains.some(d => task.domains.includes(d))) {
      score += 30
    }
    
    // Availability
    score += (1 / (agent.currentLoad + 1)) * 20
    
    // Success history
    score += agent.successRate * 20
    
    return score
  }
}
```

### Task Dependencies
```javascript
// Handle task dependencies
class DependencyManager {
  constructor() {
    this.graph = new DAG()
  }
  
  addTask(task) {
    this.graph.addNode(task.id, task)
    
    if (task.dependsOn) {
      task.dependsOn.forEach(depId => {
        this.graph.addEdge(depId, task.id)
      })
    }
  }
  
  getExecutionOrder() {
    return this.graph.topologicalSort()
  }
  
  getReadyTasks(completed) {
    return this.graph.getNodes().filter(node => {
      const deps = this.graph.getDependencies(node.id)
      return deps.every(dep => completed.includes(dep))
    })
  }
}
```

## Coordination Patterns

### Consensus Building
```javascript
async function reachConsensus(proposal, agents) {
  const votes = await Promise.all(
    agents.map(agent => 
      spawnAgent(agent, { task: `Review and vote: ${proposal}` })
    )
  )
  
  const approvals = votes.filter(v => v.decision === 'approve').length
  const rejections = votes.filter(v => v.decision === 'reject').length
  
  if (approvals > rejections * 2) {
    return { consensus: true, decision: 'approve', votes }
  }
  
  if (rejections > approvals * 2) {
    return { consensus: true, decision: 'reject', votes }
  }
  
  // No consensus - need discussion
  return { consensus: false, votes, needsDiscussion: true }
}
```

### Conflict Resolution
```javascript
// Resolve conflicts between agents
async function resolveConflict(agents, issue) {
  // Step 1: Each agent states position
  const positions = await Promise.all(
    agents.map(a => a.statePosition())
  )
  
  // Step 2: Identify root conflict
  const conflict = findRootConflict(positions)
  
  // Step 3: Find common ground
  const commonGround = findCommonGround(positions)
  
  // Step 4: Generate compromises
  const compromises = await generateCompromises(
    commonGround, 
    conflict
  )
  
  // Step 5: Vote on compromises
  const winner = await voteOnCompromises(compromises, agents)
  
  return winner
}
```

## Multi-Agent Workflows

### Code Review Team
```javascript
const codeReviewTeam = {
  name: 'code-review-team',
  pattern: 'parallel',
  agents: [
    {
      id: 'lead-reviewer',
      role: 'Lead Reviewer',
      model: 'claude-opus',
      tools: ['Read', 'Grep'],
      focus: 'architecture'
    },
    {
      id: 'security-reviewer',
      role: 'Security Specialist',
      model: 'claude-opus',
      tools: ['Read', 'Grep'],
      focus: 'security'
    },
    {
      id: 'performance-reviewer',
      role: 'Performance Engineer',
      model: 'claude-sonnet',
      tools: ['Read', 'Grep', 'Bash'],
      focus: 'performance'
    }
  ],
  workflow: {
    parallel: ['security-reviewer', 'performance-reviewer'],
    sequential: ['lead-reviewer'] // Aggregates findings
  }
}
```

### Feature Development Team
```javascript
const featureDevTeam = {
  name: 'feature-dev-team',
  pattern: 'pipeline',
  agents: [
    {
      id: 'analyst',
      role: 'Requirements Analyst',
      model: 'claude-opus',
      output: 'requirements'
    },
    {
      id: 'designer',
      role: 'Technical Designer',
      model: 'claude-opus',
      input: 'requirements'
    },
    {
      id: 'backend-dev',
      role: 'Backend Developer',
      model: 'claude-sonnet',
      input: 'design'
    },
    {
      id: 'frontend-dev',
      role: 'Frontend Developer',
      model: 'claude-sonnet',
      input: 'design'
    },
    {
      id: 'integrator',
      role: 'Integration Engineer',
      model: 'claude-sonnet',
      input: ['backend', 'frontend']
    }
  ]
}
```

## Monitoring & Observability

### Agent Metrics
```javascript
const agentMetrics = {
  // Per-agent metrics
  perAgent: {
    'security-reviewer': {
      tasksCompleted: 45,
      successRate: 0.95,
      avgDuration: '5m',
      lastActive: '2026-04-06T20:00:00Z'
    }
  },
  
  // Team metrics
  team: {
    totalTasks: 120,
    completed: 115,
    inProgress: 3,
    failed: 2,
    avgTimeToComplete: '8m',
    collaborationOverhead: '12%'
  }
}
```

### Coordination Metrics
```javascript
const coordinationMetrics = {
  // Message throughput
  messagesPerMinute: 15,
  
  // Handoff efficiency
  handoffTime: {
    avg: '30s',
    p95: '2m'
  },
  
  // Conflict resolution
  conflictsResolved: 8,
  conflictsEscalated: 2,
  
  // Resource utilization
  agentUtilization: {
    'security-reviewer': '85%',
    'performance-reviewer': '70%',
    'lead-reviewer': '60%'
  }
}
```

## Error Handling

### Agent Failure
```javascript
async function handleAgentFailure(agent, task, error) {
  // 1. Log the failure
  logFailure(agent.id, task.id, error)
  
  // 2. Check if task can be retried
  if (canRetry(error) && task.attempts < task.maxRetries) {
    // Retry with same or different agent
    return await retryTask(task, {
      agent: task.attempts > 2 ? getDifferentAgent(agent) : agent
    })
  }
  
  // 3. Escalate to supervisor
  return await escalateToSupervisor(task, {
    reason: 'agent_failure',
    agent: agent.id,
    error: error.message,
    attempts: task.attempts
  })
}
```

### Deadlock Prevention
```javascript
// Detect and prevent deadlocks
class DeadlockDetector {
  checkForDeadlock() {
    const cycles = this.dependencyGraph.findCycles()
    
    if (cycles.length > 0) {
      // Break cycle by allowing parallel execution
      const resolution = this.resolveCycle(cycles[0])
      this.applyResolution(resolution)
      return { deadlocked: true, resolved: true }
    }
    
    return { deadlocked: false }
  }
  
  resolveCycle(cycle) {
    // Find task with fewest dependencies
    const weakest = cycle.reduce((a, b) => 
      a.dependencies.length < b.dependencies.length ? a : b
    )
    
    // Remove from cycle
    return { action: 'parallelize', tasks: cycle, breakAt: weakest.id }
  }
}
```

## Checklist
- [ ] Multi-agent patterns understood
- [ ] Agent team defined
- [ ] Communication protocol established
- [ ] Task distribution configured
- [ ] Coordination patterns implemented
- [ ] Error handling set up
- [ ] Monitoring dashboard active
- [ ] First team workflow tested
