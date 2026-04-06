# OpenCode Skill: Debugging & Troubleshooting

## Purpose
Systematically identify and fix bugs and issues in code.

## Triggers
Use this skill when:
- Code is not working as expected
- Getting errors in console
- Unexpected behavior
- Performance issues

## Debugging Workflow

### Phase 1: Reproduce
```
1. Identify the exact problem:
   - What should happen?
   - What is actually happening?
   - When does it occur?
   - Can you reproduce it?

2. Gather information:
   - Check browser console (F12)
   - Check network tab
   - Check element inspection
   - Note error messages
```

### Phase 2: Isolate
```
Debugging Steps:
1. Comment out code until broken
2. Add console.log() statements
3. Check variable values
4. Test each function individually
5. Use breakpoints

Common Console Methods:
- console.log() - general output
- console.error() - errors
- console.warn() - warnings
- console.table() - objects/arrays
- console.trace() - stack trace
```

### Phase 3: Fix
```
Fix Strategies:
1. Understand the root cause
2. Make minimal changes
3. Test the fix
4. Check for side effects
5. Add regression tests
```

### Phase 4: Verify
```
Verification Checklist:
- Does the fix work?
- Are there new issues?
- Does it work in all browsers?
- Does it pass linting?
- Is performance affected?
```

## Common Issues

### JavaScript Errors

| Error | Common Cause | Solution |
|-------|-------------|----------|
| Undefined | Variable not set | Check initialization |
| Null Reference | Element not found | Verify DOM loaded |
| Syntax Error | Typo | Check brackets/braces |
| CORS Error | Cross-origin request | Configure CORS |

### CSS Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Styles not applying | Specificity | Use higher specificity |
| Element overflow | Fixed dimensions | Use overflow property |
| Flex not working | Missing flex container | Add display: flex |
| Grid not working | Missing grid parent | Add display: grid |

### React Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Objects not valid | Using object as child | Use .map() |
| Hooks call order | Rules violated | Follow hook rules |
| Can't update state | Async nature | Use useEffect |
| Module not found | Path error | Check import path |

## Debugging Tools

### Browser DevTools
```
1. Elements Tab:
   - Inspect HTML
   - Edit CSS live
   - See computed styles

2. Console Tab:
   - Run JavaScript
   - See errors
   - Use breakpoints

3. Sources Tab:
   - Set breakpoints
   - Step through code
   - Watch variables

4. Network Tab:
   - Check requests
   - See response data
   - Monitor timing
```

### VS Code Debugging
```json
// launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug",
      "program": "${workspaceFolder}/index.js"
    }
  ]
}
```

## Logging Best Practices
```
Bad:
console.log('value:', value)

Good:
console.log('[ComponentName] FunctionName - value:', value)
```

## Performance Debugging
```
1. Measure first:
   - Page load time
   - Render time
   - Network requests

2. Use Performance tab:
   - Record profile
   - Identify bottlenecks
   - Check long tasks

3. Common fixes:
   - Lazy load images
   - Memoize expensive calculations
   - Debounce scroll handlers
   - Use virtual lists
```

## Checklist
- [ ] Problem reproduced
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Tested in all browsers
- [ ] No new issues introduced
- [ ] Code linted
