# AI Blindspots — Core Principles

Behavioral guidelines for AI-assisted development. Based on [AI Blindspots](https://ezyang.github.io/ai-blindspots/). Canonical source: `ai-blindspots/` in this repo.

> **GSD Integration:** For canonical project rules, see [PROJECT_RULES.md](../PROJECT_RULES.md).
> For Gemini-specific optimizations, see [adapters/GEMINI.md](../adapters/GEMINI.md).

---

## Core Principles

### Problem-Solving

- **Stop digging:** Escalate to user after 3 failed attempts with same approach. Do not persist-and-fail.
- **Root cause first:** Demand reproduction steps and root cause analysis before proposing fixes. Debug systematically: observe → hypothesize → test → fix.
- **Context pollution:** After ~20–30 messages without progress, notify user of potential context pollution. Suggest fresh session with summary template. Provide checkpoint of current understanding.

### Requirements and Communication

- **Specify requirements, not solutions:** Focus on constraints and goals. Unspecified requirements default to training assumptions.
- **Communicate uncertainty:** State confidence level for non-trivial recommendations. List alternatives and trade-offs.
- **Checkpoint progress:** Summarize periodically; verify assumptions early.

### Change Management

- **Decompose changes:** Break into focused, reviewable steps. Single responsibility per change.
- **Preparatory refactoring:** Make the change easy, then make the easy change.
- **Walking skeleton:** Get end-to-end basic version working before optimization.

### AI Strengths and Limitations

- **Leverage strengths:** Code generation, boilerplate, mechanical refactoring.
- **Acknowledge weaknesses:** Debugging non-obvious bugs, root cause identification, security implications.
- **Verify critical items:** LLMs sound confident when wrong.
- **Knowledge limits:** Validate API/library behavior against primary documentation when uncertain.

### Type Safety and Execution Hygiene

- **Type systems first:** Prefer static typing and strict compiler settings where possible.
- **Static-types workflow:** Run type checks before tests and before concluding refactors.
- **Stateless commands:** Execute independently reproducible shell commands; do not rely on prior shell context.

---

## Project Context

- Work in small, reviewable increments.
- Prioritize correctness and simplicity over cleverness.
- Black box testing: test behavior, not implementation.
- Keep files <64KB before significant changes.
- Security review for sensitive code. Terminal commands require review.
