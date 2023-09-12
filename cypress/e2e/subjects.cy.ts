import { Connection } from 'types';

import { RoutePath } from 'types/router.ts';
import {
  connectionsInConnectionsPageFilterAll,
  connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateAscending,
  connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateDescending,
  connectionsInConnectionsPageJustMet,
  connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateAscending,
  connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateDescending,
} from '../utils/rating.ts';

describe('Connections Page', () => {
  beforeEach(() => {
    cy.setupProfile();
    cy.visit(RoutePath.SUBJECTS_EVALUATION);
  });

  function checkConnectionOrderInViewTab(brightId: string, index: number) {
    cy.get(`[data-testid=user-item-${brightId}-name-${index}]`).should('exist');
  }

  function assertOrder(orderedConnections: Connection[]) {
    orderedConnections.forEach((r, i) => {
      checkConnectionOrderInViewTab(r.id, i);
    });
    cy.get(`[data-testid=user-item-${orderedConnections.length}]`).should(
      'not.exist',
    );
  }

  it('filters and sorts connections', () => {
    assertOrder(connectionsInConnectionsPageFilterAll);

    expect(connectionsInConnectionsPageFilterAll).to.not.deep.equal(
      connectionsInConnectionsPageJustMet,
    );

    cy.get('[data-testid=subject-filter-button]').click();
    cy.get('[data-testid=subject-filter-option-JustMet]').click();
    assertOrder(connectionsInConnectionsPageJustMet);
  });

  it('sorts connections', () => {
    assertOrder(connectionsInConnectionsPageFilterAll);

    expect(connectionsInConnectionsPageFilterAll).to.not.deep.equal(
      connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateAscending,
    );
    expect(connectionsInConnectionsPageFilterAll).to.not.deep.equal(
      connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateDescending,
    );

    cy.get('[data-testid=subject-sort-button]').click();
    cy.get(
      '[data-testid=subject-sort-option-LastConnectionUpdate-ascending]',
    ).click();
    assertOrder(
      connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateAscending,
    );

    cy.get('[data-testid=subject-sort-button]').click();
    cy.get(
      '[data-testid=subject-sort-option-LastConnectionUpdate-descending]',
    ).click();
    assertOrder(
      connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateDescending,
    );
  });

  it('orders filtered list', () => {
    assertOrder(connectionsInConnectionsPageFilterAll);

    expect(connectionsInConnectionsPageFilterAll).to.not.deep.equal(
      connectionsInConnectionsPageJustMet,
    );
    expect(connectionsInConnectionsPageJustMet).to.not.deep.equal(
      connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateAscending,
    );
    expect(connectionsInConnectionsPageJustMet).to.not.deep.equal(
      connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateDescending,
    );

    cy.get('[data-testid=subject-filter-button]').click();
    cy.get('[data-testid=subject-filter-option-JustMet]').click();
    assertOrder(connectionsInConnectionsPageJustMet);

    cy.get('[data-testid=subject-sort-button]').click();
    cy.get(
      '[data-testid=subject-sort-option-LastConnectionUpdate-ascending]',
    ).click();
    assertOrder(
      connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateAscending,
    );

    cy.get('[data-testid=subject-sort-button]').click();
    cy.get(
      '[data-testid=subject-sort-option-LastConnectionUpdate-descending]',
    ).click();
    assertOrder(
      connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateDescending,
    );
  });

  it.only('filters ordered list', () => {
    assertOrder(connectionsInConnectionsPageFilterAll);

    expect(connectionsInConnectionsPageFilterAll).to.not.deep.equal(
      connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateAscending,
    );
    expect(
      connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateAscending,
    ).to.not.deep.equal(
      connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateDescending,
    );

    cy.get('[data-testid=subject-sort-button]').click();
    cy.get(
      '[data-testid=subject-sort-option-LastConnectionUpdate-ascending]',
    ).click();
    assertOrder(
      connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateAscending,
    );

    cy.get('[data-testid=subject-filter-button]').click();
    cy.get('[data-testid=subject-filter-option-JustMet]').click();
    assertOrder(
      connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateAscending,
    );
  });

  // it('keeps filters when navigating', () => {
  //   expect(connectionsInConnectionsPageFilterAll).to.not.deep.equal(
  //     connectionsInConnectionsPageJustMetSortedByNameAscending,
  //   );
  //
  //   assertOrder(connectionsInConnectionsPageFilterAll);
  //   cy.get('[data-testid=custom-select]').click();
  //   cy.get('[data-testid=custom-select-option-Justmet]').click();
  //   cy.get('[data-testid=filter-Name-inactive').click();
  //   assertOrder(connectionsInConnectionsPageJustMetSortedByNameAscending);
  //
  //   // navigate to another page
  //   cy.visit('/contact-us/');
  //   cy.go(-1);
  //
  //   // eslint-disable-next-line cypress/no-unnecessary-waiting
  //   cy.wait(500);
  //   assertOrder(connectionsInConnectionsPageJustMetSortedByNameAscending);
  // });
  //
  // it('keeps filters after reload', () => {
  //   expect(connectionsInConnectionsPageFilterAll).to.not.deep.equal(
  //     connectionsInConnectionsPageJustMetSortedByNameAscending,
  //   );
  //
  //   assertOrder(connectionsInConnectionsPageFilterAll);
  //   cy.get('[data-testid=custom-select]').click();
  //   cy.get('[data-testid=custom-select-option-Justmet]').click();
  //   cy.get('[data-testid=filter-Name-inactive').click();
  //   assertOrder(connectionsInConnectionsPageJustMetSortedByNameAscending);
  //
  //   cy.reload();
  //   assertOrder(connectionsInConnectionsPageJustMetSortedByNameAscending);
  // });
});
