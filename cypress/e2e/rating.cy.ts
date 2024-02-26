import {
  getConfidenceValueOfAuraRatingNumber,
  PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING,
  SUBJECTS_EVALUATION_ONBOARDING_GUIDE_STEP_COUNT,
} from 'constants/index';
import {
  AuraRating,
  AuraRatingRetrieveResponse,
  BrightIdBackupConnection,
} from 'types';
import { RoutePath } from 'types/router';

import { getTestSelector } from '../utils';
import {
  BRIGHT_ID_BACKUP,
  FAKE_BRIGHT_ID,
  ratedConnection,
  ratedConnectionNegative,
  ratedConnectionWithoutEnergy,
  unratedConnection,
} from '../utils/data';
import { getRating, newRatings, oldRatings } from '../utils/rating';

describe('Rating', () => {
  beforeEach(() => {
    cy.setupProfile();
  });

  let currentRatings: AuraRating[] = Object.assign([], oldRatings);

  function setCurrentRatingsIntercepts() {
    const ratingResponse: AuraRatingRetrieveResponse = {
      ratings: currentRatings,
    };
    console.log({ ratingResponse });
    cy.intercept(
      {
        url: `/v1/ratings/${FAKE_BRIGHT_ID}`,
        method: 'GET',
      },
      {
        body: ratingResponse,
      },
    );
    BRIGHT_ID_BACKUP.connections.forEach((c) => {
      const r = currentRatings.find((r) => r.toBrightId === c.id);
      cy.intercept(
        {
          url: `/v1/ratings/inbound/${c.id}`,
          method: 'GET',
        },
        {
          body: {
            ratings: r ? [r] : [],
          },
        },
      );
    });
  }

  function setRatingValue(
    connection: BrightIdBackupConnection,
    ratings: AuraRating[],
  ) {
    const newRating = ratings.find((r) => r.toBrightId === connection.id);
    if (newRating) {
      currentRatings = [
        ...currentRatings.filter((r) => r.toBrightId !== connection.id),
        newRating,
      ];
    }
    setCurrentRatingsIntercepts();
  }

  function setNewRating(connection: BrightIdBackupConnection) {
    setRatingValue(connection, newRatings);
  }

  function submitNewRatingFailure(connection: BrightIdBackupConnection) {
    cy.intercept(
      {
        url: `/v1/ratings/${FAKE_BRIGHT_ID}/${connection.id}`,
        method: 'POST',
      },
      {
        statusCode: 500,
      },
    ).as('submitRatingError');
    cy.get(getTestSelector('submit-evaluation')).click();
    cy.wait('@submitRatingError');
  }

  function submitNewRatingSuccess(connection: BrightIdBackupConnection) {
    cy.intercept(
      {
        url: `/v1/ratings/${FAKE_BRIGHT_ID}/${connection.id}`,
        method: 'POST',
      },
      {
        statusCode: 200,
      },
    ).as('submitRating');
    setNewRating(connection);

    cy.get(getTestSelector('submit-evaluation')).click();
    cy.wait('@submitRating')
      .its('request.body')
      .should((body) => {
        expect(body).to.have.key('encryptedRating');
      });
  }

  function showsRateValue(
    connection: BrightIdBackupConnection,
    ratings: AuraRating[],
  ) {
    const ratingValue = Number(getRating(connection.id, ratings) || 0);
    if (ratingValue) {
      cy.get(
        getTestSelector(
          `your-evaluation-${FAKE_BRIGHT_ID}-${connection.id}-magnitude`,
        ),
      ).contains(
        ratingValue > 0
          ? 'Positive'
          : ratingValue < 0
          ? 'Negative'
          : 'invalid!',
      );
      const confidenceValue = getConfidenceValueOfAuraRatingNumber(ratingValue);
      if (confidenceValue) {
        cy.get(
          getTestSelector(
            `your-evaluation-${FAKE_BRIGHT_ID}-${connection.id}-confidence`,
          ),
        ).contains(confidenceValue);
      }
    } else {
      cy.get(
        getTestSelector(`evaluate-not-evaluated-subject-${connection.id}`),
      ).should('exist');
    }
  }

  function enterNewRateValue(connection: BrightIdBackupConnection) {
    const newRatingValue = Number(getRating(connection.id, newRatings));
    const newConfidenceValue = getConfidenceValueOfAuraRatingNumber(
      Math.abs(newRatingValue),
    );
    const oldRatingValue = Number(getRating(connection.id, currentRatings));
    const oldConfidenceValue = getConfidenceValueOfAuraRatingNumber(
      Math.abs(oldRatingValue),
    );
    if (oldRatingValue) {
      cy.get(
        getTestSelector(
          `your-evaluation-${FAKE_BRIGHT_ID}-${connection.id}-edit`,
        ),
      ).click();
      if (oldConfidenceValue) {
        cy.get(getTestSelector('confidence-dropdown-selected-label')).contains(
          oldConfidenceValue,
        );
      }
    } else {
      cy.get(
        getTestSelector(`evaluate-not-evaluated-subject-${connection.id}`),
      ).click();
    }
    if (newRatingValue < 0) {
      cy.get(getTestSelector('evaluate-negative')).click();
    } else {
      cy.get(getTestSelector('evaluate-positive')).click();
    }
    cy.get(getTestSelector('confidence-dropdown-button')).click();
    cy.get(
      getTestSelector(`confidence-dropdown-option-${Math.abs(newRatingValue)}`),
    ).click();
    if (newConfidenceValue) {
      cy.get(getTestSelector('confidence-dropdown-selected-label')).contains(
        newConfidenceValue,
      );
    }
  }

  function submitNewRatingNoChange(connection: BrightIdBackupConnection) {
    cy.intercept(
      {
        url: `/v1/ratings/${FAKE_BRIGHT_ID}/${connection.id}`,
        method: 'POST',
      },
      {
        statusCode: 200,
      },
    ).as('submitRatingError');
    setNewRating(connection);

    cy.get(getTestSelector('submit-evaluation')).click();
    // should not be called
    cy.get('@submitRatingError.all').should('have.length', 0);
    cy.get(getTestSelector('submit-evaluation')).should('not.exist');
  }

  function doRate(connection: BrightIdBackupConnection) {
    const oldRatingValue = Number(getRating(connection.id, currentRatings));
    const newRatingValue = Number(getRating(connection.id, newRatings));

    enterNewRateValue(connection);

    if (newRatingValue === oldRatingValue) {
      submitNewRatingNoChange(connection);
    } else {
      // submitNewRatingFailure(inboundConnection);
      submitNewRatingSuccess(connection);
    }

    showsRateValue(connection, newRatings);
  }

  it('shows rated inboundConnection rating', () => {
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(':subjectIdProp', ratedConnection.id),
    );
    showsRateValue(ratedConnection, oldRatings);
  });

  it('shows unrated inboundConnection rating status', () => {
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(':subjectIdProp', unratedConnection.id),
    );
    showsRateValue(unratedConnection, oldRatings);
  });

  it('shows negative rated inboundConnection rating', () => {
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(
        ':subjectIdProp',
        ratedConnectionNegative.id,
      ),
    );
    showsRateValue(ratedConnectionNegative, oldRatings);
  });

  it('rates an unrated inboundConnection', () => {
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(':subjectIdProp', unratedConnection.id),
    );
    doRate(unratedConnection);
  });

  it('rates a rated inboundConnection', () => {
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(':subjectIdProp', ratedConnection.id),
    );
    doRate(ratedConnection);
  });

  it('does not send request for an unchanged rate', () => {
    const oldRatingValue = Number(
      getRating(ratedConnectionWithoutEnergy.id, oldRatings),
    );
    const newRatingValue = Number(
      getRating(ratedConnectionWithoutEnergy.id, newRatings),
    );
    assert(oldRatingValue === newRatingValue);
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(
        ':subjectIdProp',
        ratedConnectionWithoutEnergy.id,
      ),
    );
    doRate(ratedConnectionWithoutEnergy);
  });

  it('can change a negative rate', () => {
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(
        ':subjectIdProp',
        ratedConnectionNegative.id,
      ),
    );
    doRate(ratedConnectionNegative);
  });

  it('evaluation onboarding flow first evaluation', () => {
    currentRatings = [];
    setCurrentRatingsIntercepts();
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(':subjectIdProp', unratedConnection.id),
    );
    doRate(unratedConnection);
    cy.get(getTestSelector('ratings-remaining-before-training')).should(
      'have.text',
      String(PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING - 1),
    );
    cy.get(getTestSelector('evaluation-onboarding-action-button')).click();
    cy.url().should('include', RoutePath.HOME);
  });

  it('evaluation onboarding flow does not count editing evaluations', () => {
    currentRatings = [];
    setRatingValue(ratedConnection, oldRatings);
    cy.visit(
      RoutePath.SUBJECT_PROFILE.replace(':subjectIdProp', ratedConnection.id),
    );
    doRate(ratedConnection);
    cy.get(getTestSelector('ratings-remaining-before-training')).should(
      'have.text',
      String(PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING - 1),
    );
  });

  it('evaluation onboarding flow walkthrough', () => {
    assert(
      newRatings.length >= PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING,
    );
    currentRatings = [];
    setCurrentRatingsIntercepts();

    function rateNextConnection() {
      const newRatingIndex = currentRatings.length;
      const connection = BRIGHT_ID_BACKUP.connections.find(
        (c) => c.id === newRatings[newRatingIndex].toBrightId,
      );
      if (!connection) throw Error('connection not found');
      cy.get(getTestSelector(`subject-card-${connection.id}`)).click();
      doRate(connection);
    }

    cy.visit(RoutePath.HOME).then(() => {
      cy.get(
        getTestSelector(
          `subjects-evaluation-onboarding-guide-step-button-${SUBJECTS_EVALUATION_ONBOARDING_GUIDE_STEP_COUNT}`,
        ),
      ).click();
      cy.get(
        getTestSelector(`subjects-evaluation-onboarding-guide-finish-button`),
      )
        .click()
        .then(() => {
          while (
            currentRatings.length <
            PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING - 1
          ) {
            rateNextConnection();
            cy.get(getTestSelector('ratings-remaining-before-training')).should(
              'have.text',
              String(
                PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING -
                  currentRatings.length,
              ),
            );
            cy.get(
              getTestSelector('evaluation-onboarding-action-button'),
            ).click();
          }
          rateNextConnection();
          cy.get(getTestSelector('ratings-done-count')).should(
            'have.text',
            String(PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING),
          );
          cy.get(getTestSelector('find-trainers-button')).click();
          cy.url().should('include', RoutePath.HOME);
        });
    });
  });

  // it('regenerates keypair if the user if the privateKey is invalid', () => {
  //   cy.intercept(
  //     {
  //       url: `/v1/connect/explorer-code`,
  //       method: 'POST',
  //     },
  //     {
  //       body: 'OK',
  //     },
  //   ).as('explorerCode');
  //   let publicKey1: string | null;
  //   let privateKey1: string | null;
  //   cy.visit(`/profile/` + unratedConnection.id).then(() => {
  //     publicKey1 = window.localStorage.getItem('publicKey');
  //     privateKey1 = window.localStorage.getItem('privateKey');
  //   });
  //   showsRateValue(unratedConnection, oldRatings);
  //   enterNewRateValue(unratedConnection);
  //
  //   let firstTime = true;
  //   cy.intercept(
  //     {
  //       url: `/v1/ratings/${FAKE_BRIGHT_ID}/${unratedConnection.id}`,
  //       method: 'POST',
  //     },
  //     (req) => {
  //       if (firstTime) {
  //         firstTime = false;
  //         req.reply({
  //           statusCode: 500,
  //           body: `Could not decrypt using publicKey: ${FAKE_BRIGHT_ID}`,
  //         });
  //       } else {
  //         req.reply({
  //           statusCode: 200,
  //         });
  //       }
  //     },
  //   ).as('submitRatingEncryptErrorFirstTime');
  //   cy.get('[data-testid=feedback-quality-confirm]').click();
  //
  //   cy.wait('@explorerCode')
  //     .its('request.body')
  //     .should((body) => {
  //       expect(body.brightId).to.eq(FAKE_BRIGHT_ID);
  //       expect(body.password).to.eq(FAKE_BRIGHT_ID_PASSWORD);
  //       expect(body.key).to.eq(FAKE_AUTH_KEY);
  //       expect(body.publicKey).to.be.not.null;
  //     })
  //     .then(() => {
  //       expect(window.localStorage.getItem('publicKey')).to.not.eq(publicKey1);
  //       expect(window.localStorage.getItem('privateKey')).to.not.eq(
  //         privateKey1,
  //       );
  //     });
  //   cy.get('@submitRatingEncryptErrorFirstTime.all').should('have.length', 2);
  // });
});
