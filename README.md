# astrojs-multidomain-example-bug

> **Not a real project.** This repo is only a minimal reproduction of an Astro bug, for the Astro team: `i18n.domains` works in `astro build`, but `astro dev` ignores it. There is nothing else here — no real site, no real domains.

## The bug

With `i18n.domains`, Astro takes the locale from the request's `Host` header: `pt.example.local/` is served by `src/pages/[locale]/index.astro` with `Astro.currentLocale === "pt"`.

- **`astro build`:** works.
- **`astro dev`:** ignores the host. `/` on every locale host gets the root `src/pages/index.astro` instead.

## Files

| File | What it does |
|---|---|
| `astro.config.mjs` | `output: "server"`, `@astrojs/node`, `i18n.domains`: `en` → `http://www.example.local`, `pt` → `http://pt.example.local` |
| `src/pages/[locale]/index.astro` | Prints `locale: {Astro.currentLocale}` |
| `src/pages/index.astro` | The template's root page — prints `<h1>Astro</h1>` |
| `check-hosts.mjs` | Requests `/` once per host, with that host in the `Host` header, and prints the status and the body |

No `/etc/hosts` change is needed — `check-hosts.mjs` sends the `Host` header itself.

## Run it

Install:

```bash
pnpm install
```

### Build — works

```bash
pnpm build
node dist/server/entry.mjs
```

In a second terminal:

```bash
node check-hosts.mjs
```

Output:

```
pt.example.local → 200 <!DOCTYPE html><p>locale: pt</p>
www.example.local → 200 <!DOCTYPE html><p>locale: en</p>
```

### Dev — the bug

```bash
pnpm dev
```

In a second terminal:

```bash
node check-hosts.mjs
```

Output: both hosts get the root page, not `[locale]/index.astro`:

```
pt.example.local → 200 <!DOCTYPE html><html lang="en">…<h1>Astro</h1>…
www.example.local → 200 <!DOCTYPE html><html lang="en">…<h1>Astro</h1>…
```

Expected: the same as the build — `locale: pt` and `locale: en`.

## Versions

```
Astro                    v7.4.2
Node                     v24.22.1
System                   macOS (arm64)
Package Manager          pnpm
Output                   server
Adapter                  @astrojs/node
Integrations             none
```
