# Internship Sidekick — Module 5

A React + TypeScript single-page application built with Vite. Features authentication, a social post feed, user profiles, theming, and a GraphQL-backed API layer.

## Coverage

![Statements](./coverage/badges/badge-statements.svg)
![Branches](./coverage/badges/badge-branches.svg)
![Functions](./coverage/badges/badge-functions.svg)
![Lines](./coverage/badges/badge-lines.svg)

### Start the dev server

```bash
npm run dev
```
## Testing

### Unit tests (Jest)

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Regenerate coverage badge SVGs
npm run coverage:badges
```

Coverage reports are output to `./coverage/`. The HTML report can be opened at `./coverage/lcov-report/index.html`.

### End-to-end tests (Cypress)

```bash
# Open Cypress UI
npm run cy:open

# Run headless
npm run cy:run

# Run headed
npm run cy:run:headed
```

## Project Structure

```
cypress/          #Cypress e2e tests
coverage/         #Up to date coverage results
src/
├── api/          # Axios and GraphQL clients
├── components/   # Reusable UI components
├── context/      # Auth, Theme, and Toast contexts
├── hooks/        # Custom React hooks
├── interfaces/   # Shared TypeScript types
├── pages/        # Route-level page components
├── redux/        # Redux store and slices
├── tests/        # Jest unit tests and mocks
└── utils/        # Utility functions and ProtectedRoute
```