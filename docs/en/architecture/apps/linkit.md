# LinkIt — Link-in-Bio Pages

Application that generates "link in bio" pages for each business, similar to Linktree.

---

## Purpose

- Provide a public page with all business links
- Display logo, description, and social media
- Serve as a central access point for customers

---

## Structure

```
apps/linkit/
├── app/
│   └── [id]/                # Dynamic route by business ID
│       └── page.tsx         # Link-in-bio page
└── modules/
    ├── businesses/
    │   └── services/        # Business data fetching
    └── linkit/
        └── services/        # Linkit data fetching
```

---

## Components

| Component | Description |
|-----------|-------------|
| `LinkitPage` | Main page with logo, heading, description |
| Social Links | Buttons for: Website, WhatsApp, Instagram, Facebook, Twitter/X, LinkedIn, TikTok, Location |
| Background | Decorative gradient circles |

---

## Static Generation

- `generateStaticParams()` pre-renders pages for all businesses at build time
- This allows pages to be served from CDN without server calls

---

## Supported Social Networks

- 🌐 Website
- 💬 WhatsApp
- 📸 Instagram
- 👥 Facebook
- 🐦 Twitter/X
- 💼 LinkedIn
- 🎵 TikTok
- 📍 Location (Google Maps)

---

**See also:** [Menu App](menu.md) | [Overview](../overview.md)
