# Roadmap

Features y mejoras planeadas para Menud.

---

## Testing

- [ ] Configurar Vitest como framework de testing
- [ ] Testing Library para componentes React
- [ ] Tests unitarios para adaptadores (`packages/shared`)
- [ ] Tests unitarios para helpers (`formatPrice`, etc.)
- [ ] Tests de integración para providers
- [ ] E2E tests con Playwright
- [ ] Coverage reports con c8/v8

---

## Internacionalización (i18n)

- [ ] Configurar next-intl o similar
- [ ] Archivos de traducción para ES, EN, PT
- [ ] Selector de idioma en la UI del menú
- [ ] Traducción de componentes del dashboard
- [ ] Soporte RTL para árabe
- [ ] Detección automática de idioma del navegador

---

## PWA y Offline

- [ ] Service worker completo para la app menu
- [ ] Cache de menús para offline
- [ ] Sync de favoritos cuando vuelve la conexión
- [ ] Notificaciones push para promociones
- [ ] Splash screen personalizado

---

## Performance

- [ ] Optimización de imágenes con next/image
- [ ] Lazy loading de componentes pesados
- [ ] Prefetch de datos críticos
- [ ] Bundle analysis con @next/bundle-analyzer
- [ ] Core Web Vitals monitoring
- [ ] Compression (Brotli/Gzip)

---

## Analytics y Monitoring

- [ ] Integración con Google Analytics 4
- [ ] Error tracking con Sentry
- [ ] Performance monitoring
- [ ] User behavior analytics
- [ ] A/B testing para layouts de menú
- [ ] Dashboard de métricas para restaurantes

---

## Storybook

- [ ] Configurar Storybook para el paquete UI
- [ ] Documentar componentes shadcn/ui
- [ ] Crear stories para componentes del menú
- [ ] Visual regression testing
- [ ] Chromatic para deploy de stories

---

## Developer Experience

- [ ] Husky para git hooks (alternativa a Lefthook)
- [ ] Commitlint para conventional commits
- [ ] Changesets para versionado
- [ ] Generación automática de CHANGELOG
- [ ] Dev containers con GitHub Codespaces

---

## Features de Producto

- [ ] Sistema de reseñas y ratings
- [ ] Pedidos online (carrito + checkout)
- [ ] Reservas de mesa
- [ ] Notificaciones push para ofertas
- [ ] Geolocalización de sucursales
- [ ] Multi-idioma por menú (no solo por app)
- [ ] Exportación de menú a PDF
- [ ] QR code generation para cada sucursal
- [ ] Dashboard analytics para restaurantes
- [ ] Integración con POS systems

---

## Seguridad

- [ ] Rate limiting en API calls
- [ ] CSRF protection
- [ ] Content Security Policy headers
- [ ] Input validation en forms
- [ ] Audit logs para acciones sensibles
- [ ] Two-factor authentication (2FA)

---

## Infraestructura

- [ ] Staging environment automatizado
- [ ] Blue-green deployments
- [ ] Database migrations management
- [ ] Backup strategy
- [ ] Monitoring con Prometheus/Grafana
- [ ] Log aggregation con ELK stack

---

## Documentación

- [x] README profesional bilingüe
- [x] Docs folder con estructura Diátaxis
- [x] Guías de inicio rápido
- [x] Referencia de API
- [x] Sistema de diseño documentado
- [ ] API documentation con OpenAPI/Swagger
- [ ] Component stories como documentación viva
- [ ] Video tutorials para onboarding

---

**Última actualización:** Agosto 2026
