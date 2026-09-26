# Sandbox release workflow

The sandbox is a separate deployment for validating a release candidate before it reaches production. It is not an admin impersonation feature and must never query or mutate production data.

## Environments

| Environment | Purpose | Data and integrations |
| --- | --- | --- |
| Sandbox | Validate a candidate commit across home, participant and researcher surfaces. | Separate database, test accounts, non-settling payment mode and approved test email recipients. |
| Production | Serve real users and confirmed research work. | Production data and production-only integrations. |

## Administrator console

The admin route `/admin/sandbox` launches the three sandbox surfaces. Set `VITE_SANDBOX_APP_URL` to the sandbox site's approved URL in the administrator build. The links are disabled when the URL is absent, so production cannot silently become a test target.

Set `VITE_DEPLOYMENT_ENV=sandbox` and `VITE_API_URL` to the isolated sandbox API for the sandbox build. A sandbox build without an API URL fails closed and does not fall back to the production API.

## Promotion gate

1. Deploy one immutable candidate commit to sandbox and apply sandbox-only migrations.
2. Test public home, participant workflow and researcher workflow with sandbox-only accounts.
3. Verify email, payment test callbacks and background tasks stay isolated.
4. Record the result; fix and re-test any failures.
5. Promote the same approved commit to production. Do not rebuild a different production artifact after sandbox approval.
