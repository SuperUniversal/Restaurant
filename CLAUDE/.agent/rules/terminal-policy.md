# Terminal Execution Policy Example

Antigravity-specific: Security rules adapt to terminal execution policies. Configure Allow/Deny lists as needed.

## Example Policy

**Execution Policy:** Restricted

**Allow List (safe commands):**

```
npm test
git status
npm run lint
npm run build
pytest
mypy
```

**Deny List (dangerous commands):**

```
rm -rf
sudo *
curl * | bash
```

## Rationale

- Allow list limits execution to verified safe commands.
- Deny list blocks destructive or high-risk operations.
- Aligns with security intent: validate before executing.
