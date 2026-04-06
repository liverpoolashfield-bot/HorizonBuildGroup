# OpenCode Skill: WordPress Development

## Purpose
Build and customize WordPress websites using themes and plugins.

## Triggers
Use this skill when:
- Setting up WordPress sites
- Creating custom themes
- Building with Elementor
- Setting up plugins and forms

## Workflow

### Phase 1: Setup
```
1. Domain & Hosting:
   - Register domain (ventraip.com.au, namesilo.com)
   - Set up hosting (SiteGround, WP Engine, Kinsta)
   - Install WordPress
   - Configure SSL

2. Initial WordPress Setup:
   - Update permalinks to "Post name"
   - Set timezone
   - Configure reading settings
   - Install required plugins
```

### Phase 2: Plugins
```
Essential Plugins:
| Plugin | Purpose |
|--------|---------|
| Elementor | Page builder |
| Elementor Pro | Advanced widgets |
| WPForms | Contact forms |
| Yoast SEO | SEO optimization |
| WP Rocket | Caching |
| ShortPixel | Image optimization |
| Wordfence | Security |
| UpdraftPlus | Backups |
```

### Phase 3: Theme Setup
```
Recommended Themes:
- Hello Elementor (lightweight)
- GeneratePress (fast, flexible)
- Astra (customizable)
- Custom theme (for full control)

Theme Setup Steps:
1. Install and activate theme
2. Upload logo in Customizer
3. Set primary color
4. Configure typography
5. Set up menus
6. Create footer widgets
```

### Phase 4: Page Building
```
Elementor Workflow:
1. Create new page
2. Edit with Elementor
3. Set page layout (full width/boxed)
4. Add sections
5. Configure columns
6. Add widgets
7. Style each widget
8. Set responsive views
9. Publish

Common Sections:
- Hero (Heading + Button widgets)
- Features (Icon Box widgets)
- Gallery (Image Gallery)
- Testimonials (Testimonial widget)
- Contact (Contact Form + Map)
```

### Phase 5: Forms Setup
```
WPForms Setup:
1. Create new form
2. Add fields:
   - Name, Email, Phone
   - Dropdown (Project Type)
   - Textarea (Message)
3. Configure notifications
4. Set confirmation message
5. Embed in page

Form Best Practices:
- Required fields marked
- Clear labels
- Success message
- Admin notification
```

## Common Tasks

### Custom CSS
```css
/* In Additional CSS or child theme */
:root {
  --primary: #1a3a5c;
  --accent: #f59e0b;
}
```

### Code Snippets
```php
// Child theme functions.php
add_action('wp_enqueue_scripts', function() {
  wp_enqueue_style('child-style', get_stylesheet_uri());
});
```

### Hooks Reference
```
Common WordPress Hooks:
- wp_head / wp_footer
- init (init hook)
- save_post (post save)
- pre_get_posts (query modification)
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| White screen | Increase PHP memory |
| Forms not sending | Check email, use SMTP |
| Slow loading | Enable caching, optimize images |
| CSS not applying | Clear cache, check specificity |

## Checklist
- [ ] WordPress updated
- [ ] Plugins updated
- [ ] Theme configured
- [ ] Logo uploaded
- [ ] Colors set
- [ ] Forms working
- [ ] SSL active
- [ ] Backups scheduled
