# ts-ui

BSV TypeScript UI monorepo — React components and web apps for the BSV stack.

[![CI](https://github.com/bsv-blockchain/ts-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/bsv-blockchain/ts-ui/actions/workflows/ci.yml)

## Packages

| Package | Path | npm | Type |
|---------|------|-----|------|
| [brc100-ui-react](packages/brc100-ui-react) | `packages/brc100-ui-react` | [@bsv/brc100-ui-react-components](https://www.npmjs.com/package/@bsv/brc100-ui-react-components) | Library |
| [uhrp-react](packages/uhrp-react) | `packages/uhrp-react` | [@bsv/uhrp-react](https://www.npmjs.com/package/@bsv/uhrp-react) | Library |
| [amountinator-react](packages/amountinator-react) | `packages/amountinator-react` | [@bsv/amountinator-react](https://www.npmjs.com/package/@bsv/amountinator-react) | Library |
| [identity-react](packages/identity-react) | `packages/identity-react` | [@bsv/identity-react](https://www.npmjs.com/package/@bsv/identity-react) | Library |
| [metanet-apps](packages/metanet-apps) | `packages/metanet-apps` | [@bsv/metanet-apps](https://www.npmjs.com/package/@bsv/metanet-apps) | Library |
| [wui](packages/wui) | `packages/wui` | `@bsv/wui` *(private app)* | App |
| [uhrp-ui](packages/uhrp-ui) | `packages/uhrp-ui` | `@bsv/uhrp-ui` *(private app)* | App |
| [registrant](packages/registrant) | `packages/registrant` | `@bsv/registrant` *(private app)* | App |
| [btms-frontend](packages/btms-frontend) | `packages/btms-frontend` | `@bsv/btms-frontend` *(private app)* | App |
| [btms-permission-module-ui](packages/btms-permission-module-ui) | `packages/btms-permission-module-ui` | [@bsv/btms-permission-module-ui](https://www.npmjs.com/package/@bsv/btms-permission-module-ui) | Library |
| [peerpay-react](packages/peerpay-react) | `packages/peerpay-react` | `@bsv/peerpay-react` *(private app)* | App |

---

## Development

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

### Setup

```sh
pnpm install
```

### Build all packages

```sh
pnpm -r run build
```

### Test all packages

```sh
pnpm -r run test
```

---

## Releasing

Published libraries use npm OIDC provenance — no static token required. Each published package must be configured as a trusted publisher on npmjs.org:

- **Owner:** `bsv-blockchain`
- **Repository:** `ts-ui`
- **Workflow:** `release.yml`

Tag a package to trigger publish:

```sh
git tag packages/brc100-ui-react/v1.2.0
git push origin packages/brc100-ui-react/v1.2.0
```

---

## License

See individual package directories for license terms.
