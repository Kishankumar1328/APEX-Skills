# Testing Patterns & Guidelines

## 1. Arrange-Act-Assert (AAA) Pattern
Structure every test clearly:
- **Arrange:** Set up test inputs, state, and fixtures.
- **Act:** Execute the unit under test.
- **Assert:** Verify expected outputs or thrown exceptions.

## 2. Test Invariants
- Assert on observable *state* and outcomes, not internal method call sequences.
- DAMP (Descriptive And Meaningful Phrases) over DRY in test files.
- Prefer real implementations over excessive mocks.

## 3. Mock vs Live Distinction
- Clearly record whether integration checks ran against local doubles or live endpoints.
- Never confuse mocked success with verified live integration.
