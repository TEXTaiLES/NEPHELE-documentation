# Environment Variables

Both components are configured via a `.env` file copied from `.env.example`. This page lists every variable for each branch.

---

## nefele-training (backend)

Copy the template:
```bash
cp .env.example .env
```

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `DATASET_NAME` | _(empty)_ | No | Optional identifier for the active dataset |
| `WEB_PORT` | `8092` | No | Port for the SAM2 annotation interface |
| `HOST_UID` | `1000` | Yes | Host user ID — run `id -u` to get yours |
| `HOST_GID` | `1000` | Yes | Host group ID — run `id -g` to get yours |
| `HESTIA_API_KEY` | _(empty)_ | No | API key for HESTIA job queue; leave blank for standalone use |
| `HESTIA_API_URL` | `https://api.textailes.athenarc.gr` | No | HESTIA API endpoint |
| `IN_MNT` | `/opt/samplify_sugar/SAM2/data/input` | Yes | Absolute host path for input images (used by worker_poller) |
| `OUT` | `/opt/samplify_sugar/SAM2/data/output` | Yes | Absolute host path for pipeline outputs (used by worker_poller) |

---

## nefele_ui (frontend)

From inside the `nefele_ui/` folder:
```bash
cp .env.example .env
```

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `DATASET_NAME` | _(empty)_ | No | Optional identifier for the active dataset |
| `WEB_PORT` | `8092` | No | Port to expose the UI on |
| `HOST_UID` | `1000` | Yes | Host user ID |
| `HOST_GID` | `1000` | Yes | Host group ID |
| `SAMPLIFY_ROOT` | `/home/vaia/samplify_sugar` | Yes | Absolute path to the cloned `nefele-training` directory |
| `COMMS_BACKEND` | `shared_fs` | No | Transport between UI and SAM2 worker: `shared_fs` for local, `vm_comms` for remote |
| `VM_COMMS_POLL_INTERVAL` | `2` | No | Polling interval in seconds (used when `COMMS_BACKEND=vm_comms`) |
| `WORKER_URL` | `http://sam2:5001` | No | HTTP endpoint of the SAM2 worker container |
| `WORKER_TIMEOUT` | `600` | No | Request timeout in seconds for the worker |
| `HESTIA_API_URL` | `http://api.textailes.athenarc.gr` | No | HESTIA API endpoint |
| `HESTIA_API_KEY` | _(empty)_ | No | API key for HESTIA integration |
| `AUTH_ENABLED` | `0` | No | Set to `1` to enable SSO authentication via Directus |
| `FLASK_SECRET_KEY` | _(empty)_ | Yes, if `AUTH_ENABLED=1` | Signs the session cookie that caches the Directus access token. App refuses to start with `AUTH_ENABLED=1` and no key set. |
| `DIRECTUS_URL` | `https://textailes.athenarc.gr` | No | Not currently read by the app — the Directus SSO endpoint is hardcoded in `app/auth.py`. Setting this has no effect. |
| `APP_BASE` | `http://nephele.textailes.athenarc.gr:8093` | No | Not currently read by the app — the public base URL used in auth redirects is hardcoded in `app/auth.py`. Setting this has no effect. |
| `AUTH_COOKIE_NAME` | `textailes_refresh_token` | No | Not currently read by the app — the SSO cookie name is hardcoded in `app/auth.py`. Setting this has no effect. |
| `AUTH_COOKIE_DOMAIN` | `.textailes.athenarc.gr` | No | Not currently read by the app — the cookie domain is derived from the request host in `app/auth.py`. Setting this has no effect. |

When `AUTH_ENABLED=1`, per-user data isolation is automatic and derived from the logged-in account's email (fetched from Directus via `GET /users/me`) — there is no separate env var to configure it. Each account's uploads, datasets, and results live under `<IN_MNT>/<user_slug>` and `<OUT>/<user_slug>`, where `user_slug` is the sanitized local-part of the account's email.
