# OpenCode Skill: React/Next.js Development

## Purpose
Build modern React applications with Next.js framework.

## Triggers
Use this skill when:
- Creating React apps
- Building Next.js projects
- Setting up TypeScript React
- Creating components

## Workflow

### Phase 1: Project Setup
```bash
# Create Next.js project
npx create-next-app@latest my-app
# Select: TypeScript, ESLint, Tailwind, App Router

cd my-app
npm run dev
```

### Phase 2: Project Structure
```
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Footer.tsx
├── public/
└── package.json
```

### Phase 3: Component Creation
```
Creating a Component:
1. Create file in /components
2. Use TypeScript interface for props
3. Export default function
4. Import in page

Example:
```tsx
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export default function Button({ 
  children, 
  variant = 'primary',
  onClick 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```
```

### Phase 4: Styling
```
Tailwind CSS:
- Use utility classes
- Extract repeated styles
- Create component classes
- Use CSS variables for theming

Custom CSS:
- globals.css for base styles
- module.css for components
- CSS Grid/Flexbox layouts
```

### Phase 5: State Management
```
Local State (useState):
```tsx
const [count, setCount] = useState(0)
```

Global State (Context):
```tsx
// Create context
const ThemeContext = createContext()

// Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

Data Fetching:
```tsx
// Server Component (App Router)
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}
```

## Best Practices
```
1. Component Structure:
   - Props interface
   - State hooks
   - Effects
   - Handlers
   - Render JSX

2. File Naming:
   - PascalCase for components
   - camelCase for utilities
   - kebab-case for folders

3. Performance:
   - Use React.memo() for expensive components
   - Lazy load with next/dynamic
   - Optimize images with next/image
```

## Common Patterns

### Fetching Data
```tsx
'use client'
import { useEffect, useState } from 'react'

export default function DataComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  if (!data) return <p>Loading...</p>
  return <div>{data.content}</div>
}
```

### Form Handling
```tsx
'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '' })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(form)
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={form.name}
        onChange={(e) => setForm({...form, name: e.target.value})}
      />
      <button type="submit">Send</button>
    </form>
  )
}
```

## Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run ESLint
```

## Checklist
- [ ] TypeScript configured
- [ ] ESLint rules set
- [ ] Tailwind configured
- [ ] Components created
- [ ] Pages routing working
- [ ] API routes created
- [ ] Responsive design
- [ ] SEO meta tags
