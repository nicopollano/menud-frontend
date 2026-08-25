# Roadmap

Planned features and improvements for Menud.

---

## Testing

- [ ] Set up Vitest as testing framework
- [ ] Testing Library for React components
- [ ] Unit tests for adapters (`packages/shared`)
- [ ] Unit tests for helpers (`formatPrice`, etc.)
- [ ] Integration tests for providers
- [ ] E2E tests with Playwright
- [ ] Coverage reports with c8/v8

---

## Internationalization (i18n)

- [ ] Configure next-intl or similar
- [ ] Translation files for ES, EN, PT
- [ ] Language selector in menu UI
- [ ] Dashboard component translations
- [ ] RTL support for Arabic
- [ ] Automatic browser language detection

---

## PWA and Offline

- [ ] Complete service worker for menu app
- [ ] Menu caching for offline
- [ ] Favorites sync when connection returns
- [ ] Push notifications for promotions
- [ ] Custom splash screen

---

## Performance

- [ ] Image optimization with next/image
- [ ] Lazy loading for heavy components
- [ ] Critical data prefetching
- [ ] Bundle analysis with @next/bundle-analyzer
- [ ] Core Web Vitals monitoring
- [ ] Compression (Brotli/Gzip)

---

## Analytics and Monitoring

- [ ] Google Analytics 4 integration
- [ ] Error tracking with Sentry
- [ ] Performance monitoring
- [ ] User behavior analytics
- [ ] A/B testing for menu layouts
- [ ] Metrics dashboard for restaurants

---

## Storybook

- [ ] Set up Storybook for UI package
- [ ] Document shadcn/ui components
- [ ] Create stories for menu components
- [ ] Visual regression testing
- [ ] Chromatic for story deployment

---

## Developer Experience

- [ ] Husky for git hooks (Lefthook alternative)
- [ ] Commitlint for conventional commits
- [ ] Changesets for versioning
- [ ] Automatic CHANGELOG generation
- [ ] Dev containers with GitHub Codespaces

---

## Product Features

- [ ] Reviews and ratings system
- [ ] Online ordering (cart + checkout)
- [ ] Table reservations
- [ ] Push notifications for offers
- [ ] Branch geolocation
- [ ] Per-menu multi-language (not just per-app)
- [ ] Menu export to PDF
- [ ] QR code generation per branch
- [ ] Analytics dashboard for restaurants
- [ ] POS system integrations

---

## Security

- [ ] Rate limiting on API calls
- [ ] CSRF protection
- [ ] Content Security Policy headers
- [ ] Input validation on forms
- [ ] Audit logs for sensitive actions
- [ ] Two-factor authentication (2FA)

---

## Infrastructure

- [ ] Automated staging environment
- [ ] Blue-green deployments
- [ ] Database migrations management
- [ ] Backup strategy
- [ ] Monitoring with Prometheus/Grafana
- [ ] Log aggregation with ELK stack

---

## Documentation

- [x] Professional bilingual README
- [x] Docs folder with Diátaxis structure
- [x] Quick start guides
- [x] API reference
- [x] Design system documented
- [ ] API documentation with OpenAPI/Swagger
- [ ] Component stories as living documentation
- [ ] Video tutorials for onboarding

---

**Last updated:** August 2026
