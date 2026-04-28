# Architectural Decisions Log (ADR)

This document tracks the key decisions made during the development of Homework Hero.

## DEC-001: Tech Stack Selection
- **Status:** Accepted
- **Context:** Need a cost-effective, mobile-responsive, and scalable solution.
- **Decision:** Vite + React (Frontend), Capacitor (Mobile), Cloudflare Workers + D1 (Backend).
- **Consequences:** Low cost, high performance, requires web-based development skills.

## DEC-002: Privacy Strategy
- **Status:** Accepted
- **Decision:** No PII storage. Use hashed Google IDs and predefined avatars.
