# AI Development Pipeline

This document defines how the AI (Antigravity) should approach development for Homework Hero.

## 1. Plan-First Approach
- Before every code change, analyze the `memory-bank` to ensure alignment with architectural goals.
- For complex features, generate a mini-design doc first.

## 2. Iterative Design
- Designs must never be static. For every component, ask: "How can this be more engaging for a child?" and "How does this scale for a tablet?"
- Use `generate_image` to conceptualize assets (like avatars) before implementation.

## 3. Security First
- Every API endpoint must have JWT validation.
- Every database query must use prepared statements (D1 default).
- No console logs with user data in production.

## 4. Documentation Loop
- Update `memory-bank/progress.md` (or equivalent) after every significant task.
- Keep `task.md` up to date with completed items.
