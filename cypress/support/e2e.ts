// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import {
  AURA_CONNECTIONS,
  AURA_GENERAL_PROFILE,
  AURA_PROFILE,
  BRIGHT_ID_BACKUP,
  BRIGHT_ID_BACKUP_ENCRYPTED,
  FAKE_AUTH_KEY,
  FAKE_BRIGHT_ID,
  LOCAL_STORAGE_DATA,
  PROFILE_PICTURE,
  verificationsResponse,
} from '../utils/data';
import {
  getConnectionResponse,
  oldRatings,
  userIncomingRatingsResponse,
  userRatingsResponse,
} from '../utils/rating';
import { CONNECTION_SEARCH_SEED } from 'utils/constants';
import {
  connectionIncomingConnectionsResponse,
  connectionOutboundConnectionsResponse,
} from '../utils/mutual-connections';
import { Connection } from 'types';

function connectionIntercepts(connection: Connection) {
  cy.intercept(
    {
      url: `/v1/profile/${connection.id}`,
      method: 'GET',
    },
    {
      body: AURA_GENERAL_PROFILE,
    },
  );
  cy.intercept(
    {
      url: `/v1/profile/public/${connection.id}`,
      method: 'GET',
    },
    {
      body: AURA_GENERAL_PROFILE,
    },
  );
  cy.intercept(
    {
      url: `/v1/ratings/${connection.id}`,
      method: 'GET',
    },
    {
      body: {
        ratings: [],
      },
    },
  );
  cy.intercept(
    {
      url: `/v1/ratings/inbound/${connection.id}`,
      method: 'GET',
    },
    {
      body: {
        ratings: oldRatings.filter(
          (rating) => rating.toBrightId === connection.id,
        ),
      },
    },
  );
  cy.intercept(
    {
      url: `/v1/connections/${FAKE_BRIGHT_ID}/${connection.id}`,
      method: 'GET',
    },
    {
      body: getConnectionResponse(connection, oldRatings),
    },
  );
}

Cypress.Commands.add('blockApiRequests', () => {
  cy.intercept(
    {
      url: `**/v1/**`,
    },
    {
      statusCode: 404,
    },
  );
  cy.intercept(
    {
      url: `**/brightid/**`,
    },
    {
      statusCode: 404,
    },
  );
});
Cypress.Commands.add('profileIntercepts', () => {
  cy.intercept(
    {
      url: `/brightid/backups/*/*`,
      method: 'GET',
    },
    {
      body: PROFILE_PICTURE,
    },
  );
  cy.intercept(
    {
      url: `/brightid/backups/${FAKE_AUTH_KEY}/data`,
      method: 'GET',
    },
    {
      body: BRIGHT_ID_BACKUP_ENCRYPTED,
    },
  );
  cy.intercept(
    {
      url: `/v1/profile/${FAKE_BRIGHT_ID}`,
      method: 'GET',
    },
    {
      body: AURA_PROFILE,
    },
  );
  cy.intercept(
    {
      url: `/v1/ratings/${FAKE_BRIGHT_ID}`,
      method: 'GET',
    },
    {
      body: userRatingsResponse,
    },
  );
  cy.intercept(
    {
      url: `/v1/ratings/inbound/${FAKE_BRIGHT_ID}`,
      method: 'GET',
    },
    {
      body: userIncomingRatingsResponse,
    },
  );
  cy.intercept(
    {
      url: `/v1/connections/search?fromBrightId=${FAKE_BRIGHT_ID}&seed=${CONNECTION_SEARCH_SEED}`,
      method: 'GET',
    },
    {
      body: AURA_CONNECTIONS,
    },
  );
  // node api
  cy.intercept(
    {
      url: `auranode/brightid/v6/users/*/verifications`,
      method: 'GET',
    },
    {
      body: verificationsResponse,
    },
  );

  // nonsense response just for test to work
  cy.intercept(
    {
      url: `/node/v6/users/${FAKE_BRIGHT_ID}/connections/inbound`,
      method: 'GET',
    },
    {
      body: connectionIncomingConnectionsResponse,
    },
  );
  cy.intercept(
    {
      url: `/node/v6/users/${FAKE_BRIGHT_ID}/connections/outbound`,
      method: 'GET',
    },
    {
      body: connectionOutboundConnectionsResponse,
    },
  );
  BRIGHT_ID_BACKUP.connections.forEach((conn) => {
    connectionIntercepts(conn);
  });
});

Cypress.Commands.add('setupProfile', () => {
  cy.profileIntercepts();
  cy.on('window:before:load', (_win) => {
    window.localStorage.setItem(
      'persist:root',
      JSON.stringify(LOCAL_STORAGE_DATA),
    );
  });
});

beforeEach(() => {
  cy.blockApiRequests();
  // if (Cypress.env('spy_on_console')) {
  //   cy.on('window:before:load', (win) => {
  //     cy.spy(win.console, 'error').as('spyWinConsoleError');
  //     cy.spy(win.console, 'warn').as('spyWinConsoleWarn');
  //   });
  // }
});

// afterEach(() => {
//   if (Cypress.env('spy_on_console')) {
//     cy.get('@spyWinConsoleError').should('have.callCount', 0);
//     cy.get('@spyWinConsoleWarn').should('have.callCount', 0);
//   }
// });

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from failing the test
  return false;
});
