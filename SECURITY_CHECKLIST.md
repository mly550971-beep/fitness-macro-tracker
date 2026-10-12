# Security & UX implementation checklist

Status: **starter scaffold; not a production security certification**.

## Security (20)
1. API keys: no client-side secrets are included; keep provider keys server-side.
2. Environment: server validates required environment variables at startup.
3. Git history: not verifiable until this directory is initialized as a Git repository; run secret scanning before pushing.
4. Admin routes: no admin routes exist yet; protect any future routes with server-side role checks.
5. Authentication: not implemented; add a vetted session/auth solution before storing personal data.
6. Permissions: user-level ownership checks not implemented until authenticated data routes exist.
7. Input validation: Zod validation example is included for health-independent JSON inputs; add schemas per route.
8. XSS: React escapes ordinary text; avoid dangerouslySetInnerHTML and validate any rich content.
9. SQL injection: use Prisma's parameterized APIs; never concatenate SQL. Raw queries need parameterization.
10. Database rules: Prisma schema defines relational constraints; run migrations and review production database roles/backups.
11. Rate limiting: global API limiter included; tune by route and deployment.
12. Spend cap: external paid integrations not configured; add provider quotas/alerts if used.
13. Uploads: uploads are not supported; keep that way until limits, content checks, and isolated storage are designed.
14. CSRF: no cookie-based login exists yet; add CSRF defense if using cookie-authenticated state-changing routes.
15. CORS: exact CLIENT_ORIGIN allowlist included.
16. HTTPS: enforce at deployment/load balancer; production secure-cookie setting is checked.
17. Headers: Helmet enabled; tune CSP for deployed assets and any integrations.
18. Cookies: no auth cookie is issued yet; set HttpOnly, Secure, SameSite when sessions are implemented.
19. Debug: production errors are generic; do not expose stack traces.
20. Production: validate env, disable debug, configure HTTPS, migrations, backups, monitoring, and secret rotation before launch.

## UX / site checks (20)
1. Horizontal scroll: responsive grid and overflow rules included; still test real devices.
2. Broken links: starter anchors are local sections; verify any added routes.
3. Mobile menu: responsive toggle included.
4. Favicon: SVG favicon included.
5. Titles: app title included; set unique titles per future route.
6. Meta description: included in index.html.
7. Footer links: only valid in-page/email example links; replace sample email before launch.
8. 404: Vite SPA fallback works in development; configure host fallback and add router-level 404 for multiple routes.
9. Copyright: dynamic year in UI.
10. Image compression: no raster images bundled; optimize any later additions.
11. Buttons: demo add-meal flow works; replace prompt dialogs with a proper form.
12. Success messages: aria-live status notice included.
13. Error messages: validation errors are shown; server errors need route-specific handling.
14. Placeholder text: no lorem ipsum; sample data is labelled as demo.
15. Unused navigation: nav links target page sections.
16. Mobile overflow: responsive CSS included; manual device testing remains.
17. Clickable logo: logo links to dashboard.
18. Phone links: no real phone number supplied; add `tel:` when one exists.
19. Email links: example support email must be replaced with a real address.
20. Mobile optimization: responsive breakpoints and focus styles included; test keyboard/screen readers.

## Before production
- Implement authentication and authorization.
- Add CRUD API routes for foods/meals/workouts with ownership checks.
- Add automated integration, dependency, and secret scans.
- Run `npm audit`, rotate exposed credentials, and perform a deployment-specific security review.
