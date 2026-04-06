# OpenCode Skill: Code Review

## Purpose
Review code for quality, best practices, and potential improvements.

## Triggers
Use this skill when:
- Asked to review code
- Pre-commit checks
- Pull request reviews
- Self-review before commits

## Review Checklist

### 1. Functionality
```
- [ ] Code works as intended
- [ ] Edge cases handled
- [ ] Error handling present
- [ ] User input validated
- [ ] No unexpected behavior
```

### 2. Code Structure
```
- [ ] DRY (Don't Repeat Yourself)
- [ ] Single responsibility
- [ ] Clear naming conventions
- [ ] Proper indentation
- [ ] Comments where needed
```

### 3. Performance
```
- [ ] No memory leaks
- [ ] Efficient loops
- [ ] Optimized queries
- [ ] Lazy loading where applicable
- [ ] No unnecessary re-renders
```

### 4. Security
```
- [ ] Input sanitization
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Sensitive data protected
- [ ] Proper authentication
```

### 5. Best Practices
```
JavaScript:
- Use const/let, avoid var
- Template literals for strings
- Arrow functions where appropriate
- Destructuring objects/arrays
- Async/await over callbacks

CSS:
- Use CSS variables
- BEM or similar naming
- Mobile-first approach
- No !important
- Efficient selectors

React:
- Functional components
- Hooks for state
- Memoization where needed
- Proper prop types
- Clean component structure
```

## Review Comments Template
```
[Blocking] - Must fix before merge
[Suggestion] - Consider improving
[Question] - Need clarification
[Minor] - Nice to have
[Praise] - Good job!
```

## Code Quality Metrics
```
1. Complexity:
   - Function length < 50 lines
   - Cyclomatic complexity < 10
   - No deeply nested code (>3 levels)

2. Maintainability:
   - Files < 300 lines
   - Functions < 20 lines
   - Clear purpose per file

3. Testability:
   - Pure functions where possible
   - Dependencies injected
   - No global state abuse
```

## Common Issues to Flag
```
1. TODO comments left in code
2. Hardcoded values
3. Magic numbers
4. Console.log statements
5. Commented out code
6. Unused imports/variables
7. Inconsistent formatting
```

## Review Workflow
```
1. Understand the context
   - What does this code do?
   - Why was it written?
   - What are the requirements?

2. Read the code
   - Line by line
   - Check logic flow
   - Identify issues

3. Test if possible
   - Run the code
   - Try edge cases
   - Check performance

4. Provide feedback
   - Be specific
   - Explain why
   - Suggest alternatives
   - Be constructive
```

## Quick Wins
```
Easy improvements to suggest:
- Extract repeated code to functions
- Rename unclear variables
- Add missing error handling
- Simplify complex conditionals
- Use existing utility functions
```

## Checklist
- [ ] Code reviewed thoroughly
- [ ] All files checked
- [ ] Edge cases considered
- [ ] Security reviewed
- [ ] Performance considered
- [ ] Feedback provided clearly
- [ ] No blocking issues left unmentioned
