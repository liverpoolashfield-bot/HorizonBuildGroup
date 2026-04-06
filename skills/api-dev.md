# OpenCode Skill: API Development

## Purpose
Design and build RESTful APIs and integrate with third-party services.

## Triggers
Use this skill when:
- Creating API endpoints
- Integrating with external APIs
- Setting up webhooks
- Building middleware

## API Design Principles

### REST Conventions
```
Resources:
- /users - Collection of users
- /users/:id - Single user
- /posts - Collection of posts
- /posts/:id - Single post

HTTP Methods:
GET    - Retrieve data
POST   - Create new resource
PUT    - Update entire resource
PATCH  - Partial update
DELETE - Remove resource

Status Codes:
200 - Success
201 - Created
204 - No Content
400 - Bad Request
401 - Unauthorized
404 - Not Found
500 - Server Error
```

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format"
  }
}
```

## Building APIs

### Node.js/Express
```javascript
const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message } 
    })
  }
})

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ success: true, data: user })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: { message: error.message } 
    })
  }
})
```

### Next.js API Routes
```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json({ success: true, data: users })
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await prisma.user.create({ data: body })
  return NextResponse.json({ success: true, data: user })
}
```

### Authentication
```
JWT Token Flow:
1. User logs in with credentials
2. Server validates and returns JWT
3. Client stores token
4. Client sends token in Authorization header
5. Server validates token for protected routes

Implementation:
- Use bcrypt for passwords
- Sign tokens with JWT
- Store tokens securely
- Set expiration times
```

## API Integration

### Fetch Data
```javascript
// GET request
const response = await fetch('https://api.example.com/data')
const data = await response.json()

// POST request
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})
const result = await response.json()
```

### Error Handling
```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
```

### Rate Limiting
```
Implement rate limiting:
- Use express-rate-limit
- Set requests per IP
- Return 429 when exceeded
- Track in Redis for scale
```

## Security Best Practices
```
1. Input Validation:
   - Validate all inputs
   - Use schema validation
   - Sanitize data

2. Authentication:
   - Use JWT or session
   - Hash passwords
   - Secure cookies

3. CORS:
   - Configure allowed origins
   - Use credentials wisely
   - Set proper headers

4. API Keys:
   - Keep keys secret
   - Use environment variables
   - Rotate regularly
```

## Documentation
```
API Documentation Template:
---
Endpoint: GET /api/users
Description: Get all users
Auth: Required (Bearer token)
Query Params: page, limit, sort
Response: { success, data, pagination }
Example: ...
---

Tools:
- Swagger/OpenAPI
- Postman collections
- MDoc
```

## Checklist
- [ ] REST conventions followed
- [ ] Proper status codes used
- [ ] Error handling implemented
- [ ] Authentication secured
- [ ] Input validated
- [ ] Rate limiting configured
- [ ] Documentation written
- [ ] Tested with Postman/curl
