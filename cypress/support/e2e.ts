import '@testing-library/cypress/add-commands';

import './commands';

Cypress.on('uncaught:exception', (err) => {
    if (
        err.message.includes('ResizeObserver loop') ||
        err.message.includes('WebSocket') ||
        err.message.includes('msw')
    ) {
        return false;
    }
});
