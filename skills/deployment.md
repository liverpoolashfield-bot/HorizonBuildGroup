# OpenCode Skill: Deployment & DevOps

## Purpose
Deploy applications to various hosting platforms and manage deployments.

## Triggers
Use this skill when:
- Deploying websites
- Setting up CI/CD
- Configuring hosting
- Managing domains

## Hosting Options

### Static Sites
```
| Platform | Best For | Pricing |
|----------|----------|---------|
| Netlify | Jamstack, static | Free tier |
| Vercel | Next.js, React | Free tier |
| GitHub Pages | GitHub repos | Free |
| Cloudflare Pages | Fast CDN | Free tier |
```

### WordPress Hosting
```
| Platform | Best For | Starting |
|----------|----------|---------|
| SiteGround | WordPress | $10/mo |
| WP Engine | Managed WP | $30/mo |
| Kinsta | Enterprise WP | $35/mo |
| Cloudways | Cloud hosting | $10/mo |
```

### Full-Stack
```
| Platform | Best For | Pricing |
|----------|----------|---------|
| Railway | Full-stack apps | Free tier |
| Render | All-in-one | Free tier |
| Heroku | Traditional apps | Free tier |
| AWS | Enterprise | Pay-as-go |
| DigitalOcean | VPS | $4/mo |
```

## Deployments

### Netlify
```bash
# Install CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Or connect GitHub for auto-deploy
```

### Vercel
```bash
# Install CLI
npm install -g vercel

# Deploy
vercel --prod

# Or GitHub integration
```

### GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Domain Configuration

### DNS Setup
```
Common DNS Records:

A Record:
- Name: @ (or domain.com)
- Value: Server IP

CNAME Record:
- Name: www
- Value: your-site.netlify.app

MX Records:
- For email services
- Priority + mail server
```

### SSL/HTTPS
```
- Most hosts provide free SSL
- Let's Encrypt is free
- Cloudflare provides free SSL
- Always redirect HTTP to HTTPS
```

## CI/CD Pipelines

### GitHub Actions
```yaml
name: CI/CD
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

### Environment Variables
```
Development (.env.local):
DATABASE_URL=localhost
API_KEY=test_key

Production (.env.production):
DATABASE_URL=production_url
API_KEY=${{ secrets.API_KEY }}
```

## Performance Optimization

### Image Optimization
```
Tools:
- Sharp (Node.js)
- ImageMagick
- Cloudflare Polish
- ShortPixel

Formats:
- WebP for modern browsers
- AVIF for next-gen
- PNG for graphics
- JPEG for photos
```

### Caching
```
Browser Caching:
Cache-Control: max-age=31536000

CDN:
- Cloudflare
- Fastly
- AWS CloudFront

Application:
- Redis
- Memcached
```

## Monitoring

### Uptime Monitoring
```
Services:
- UptimeRobot (free)
- Pingdom
- New Relic
- Datadog
```

### Error Tracking
```
Services:
- Sentry
- LogRocket
- Bugsnag
- Raygun
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 errors | Check routing, redirects |
| Slow load | Enable caching, CDN |
| SSL errors | Renew certificate |
| Deploy failed | Check build logs |
| Domain not resolving | Wait for DNS, check propagation |

## Checklist
- [ ] Build successful
- [ ] Environment variables set
- [ ] Domain configured
- [ ] SSL enabled
- [ ] Redirects working
- [ ] Caching configured
- [ ] Monitoring set up
- [ ] Backup configured
