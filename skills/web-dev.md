# OpenCode Skill: Web Development

## Purpose
Comprehensive workflow for building modern websites from scratch or replicating existing designs.

## Triggers
Use this skill when:
- Building a new website
- Replicating a website from URL
- Creating landing pages
- Building responsive layouts

## Workflow

### Phase 1: Discovery
```
1. Identify client requirements:
   - Company name and branding
   - Target audience
   - Primary goal (leads, sales, info)
   - Competitor websites (URLs)
   
2. Analyze reference sites:
   - Fetch and examine HTML structure
   - Identify design patterns
   - Note color schemes and typography
   - Document unique features
   
3. Create project plan:
   - Define site structure
   - List all sections/pages
   - Set color palette and fonts
   - Plan responsive breakpoints
```

### Phase 2: Structure
```
1. Create project folder:
   /project-name/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── assets/
   │   └── images/
   └── README.md

2. HTML Structure Template:
   - DOCTYPE and meta tags
   - CSS/JS links
   - Semantic sections
   - Accessibility attributes
```

### Phase 3: Build
```
1. Build in this order:
   a. HTML skeleton (all sections)
   b. CSS base (variables, reset)
   c. Header/Navigation
   d. Hero section
   e. Content sections
   f. Forms
   g. Footer
   h. JavaScript interactions

2. CSS Approach:
   - Mobile-first
   - CSS Grid/Flexbox
   - CSS Variables for theming
   - Responsive breakpoints

3. JavaScript:
   - DOM manipulation
   - Event listeners
   - Form validation
   - Smooth scroll
```

### Phase 4: Responsive Design
```
Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Test each breakpoint for:
- Navigation menu
- Image scaling
- Text readability
- Button touch targets
```

## Common Patterns

### Sticky Header
```css
.header { position: fixed; top: 0; }
.header.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.1); }
```

### Hero Section
```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-size: cover;
}
```

### Form Validation
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Validate fields
  // Show success/error message
});
```

### Mobile Menu Toggle
```javascript
navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});
```

## Best Practices
- Use semantic HTML (header, nav, main, section, footer)
- Optimize images (WebP format, lazy loading)
- Minimize HTTP requests
- Use CSS Grid for layouts
- Mobile-first approach
- Accessibility (ARIA labels, keyboard nav)

## Quality Checklist
- [ ] Semantic HTML
- [ ] Responsive on all devices
- [ ] Forms validate and submit
- [ ] Smooth animations
- [ ] Fast load time
- [ ] SEO meta tags
- [ ] Accessibility attributes
