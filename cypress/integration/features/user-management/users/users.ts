import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import path from 'path';
import {
  createUniqueID,
  CYPRESS_BASE_URL,
  insertExistingEmailToCSV,
  setupLogin,
  TIMEOUT,
  users,
  saleAgentData,
  UserListRoles,
  verifyAgentData,
  verifyUserRole,
  verifyUpdateFormButtons,
  stubNewRelic,
} from '../../../../cypress-variable';

before('Login before the test', () => {
  setupLogin();
});

beforeEach(() => {
  stubNewRelic();
});

Given('I am on the users page', () => {
  cy.intercept(
    'GET',
    '**/api/view/v1alpha1/views/users/users?pageSize=15&showDeleted=true'
  ).as('pageload');
  cy.intercept(
    'GET',
    '/api/view/v1alpha1/views/users/users?pageSize=100&showDeleted=true&orderBy=humanId'
  ).as('humanId');
  cy.intercept('GET', '/api/bff/api/users/lookup/create-by').as('createBy');

  cy.visit(`${CYPRESS_BASE_URL}/admin/users`);
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  cy.wait('@pageload', { timeout: TIMEOUT.WAIT_API });
});

When(
  'I fill the form for adding a user with the role {string} correctly',
  (userRole) => {
    const id = createUniqueID();
    cy.wrap(id).as('id');
    users.username = '';
    users.username = `${id}@cypress.co.th`;

    cy.intercept('GET', '**/api/view/v1alpha1/views/users/*').as('userload');
    cy.intercept('GET', '**/api/user/v1alpha1/roles*').as('rolesload');

    cy.get('#mui-component-select-role').click();
    cy.waitForReact(5000);

    const position = verifyUserRole(userRole);

    // Save the dropdown User Role
    cy.react('ul li')
      .eq(position)
      .invoke('text')
      .then((text) => {
        users.dropdownRole = text;
      });
    cy.react('ul li').eq(position).click();
    cy.get('input[name="firstName"]').clear().type(users.firstName);
    cy.get('input[name="lastName"]').clear().type(users.lastName);
    cy.get('input[name=humanId]').eq(1).clear().type(users.username);

    if (
      userRole === UserListRoles.sales ||
      userRole === UserListRoles.customerService ||
      userRole === UserListRoles.documentCollection ||
      userRole === UserListRoles.qualityControl ||
      userRole === UserListRoles.submission
    ) {
      cy.get('#mui-component-select-team').click();
      cy.react('ul li')
        .eq(0)
        .invoke('text')
        .then((text) => {
          users.team = text;
        });
      cy.react('ul li').eq(0).click();
    }

    if (userRole === UserListRoles.sales) {
      // Dropdown item will be in position=2
      saleAgentData(users.dailyLeadLimit, users.totalLeadlimit, 2);
    }

    cy.intercept('POST', '**/api/user/v1alpha1/users').as('post');
  }
);

Then('expect {string} user to be created', (userRole) => {
  cy.wait('@userload', { timeout: TIMEOUT.WAIT_API });
  cy.wait('@post', { timeout: TIMEOUT.WAIT_API });

  // due to some small page load
  cy.contains('tbody td', users.username).should('be.visible');
  cy.get('td').eq(1).should('have.text', users.username, {
    timeout: TIMEOUT.WAIT_ELEMENT,
  });

  cy.get('td')
    .eq(2)
    .should('have.text', `${users.firstName} ${users.lastName}`);
  cy.get('td').eq(5).should('have.text', userRole);
  cy.get('td').eq(7).should('have.text', 'Active');
});

Then(
  'expect the form to be visible with the {string} user data filled',
  (role) => {
    cy.get('#mui-component-select-role').should(
      'have.text',
      users.dropdownRole
    );
    cy.get('input[name="firstName"]').should('have.value', users.firstName);
    cy.get('input[name="lastName"]').should('have.value', users.lastName);
    cy.get('input[name=humanId]').eq(1).should('have.value', users.username);

    if (
      role === UserListRoles.sales ||
      role === UserListRoles.customerService ||
      role === UserListRoles.documentCollection ||
      role === UserListRoles.qualityControl ||
      role === UserListRoles.submission
    ) {
      cy.get('#mui-component-select-team').should('have.text', users.team);
    }

    if (role === UserListRoles.sales) {
      verifyAgentData();
    }
    verifyUpdateFormButtons();
  }
);

When(
  'I fill the form for updating a user with the role {string}',
  (updateRole) => {
    cy.get('#mui-component-select-role').click();
    cy.waitForReact(5000);
    const position = verifyUserRole(updateRole);

    // cy.react('ul li') does not work so cy.get will be used it instead.
    // If cy.get is used, there will be 12 'li' instead of 10, therefore +2 need to add to the position received
    cy.get('ul')
      .find('li')
      .eq(position + 2)
      .click();
    cy.get('input[name="firstName"]').clear().type(users.updateFirstName);
    cy.get('input[name="lastName"]').clear().type(users.updateLastName);
    if (
      updateRole === UserListRoles.sales ||
      updateRole === UserListRoles.customerService ||
      updateRole === UserListRoles.documentCollection ||
      updateRole === UserListRoles.qualityControl ||
      updateRole === UserListRoles.submission
    ) {
      cy.get('#mui-component-select-team').click();
      cy.get('ul').find('li').eq(3).click();
    }
    if (updateRole === UserListRoles.sales) {
      // Dropdown item will be in position=4
      saleAgentData(users.updateDailyLeadLimit, users.updateTotalLeadlimit, 4);
    }
  }
);

Then('expect {string} user to be updated', (updateRoles) => {
  cy.wait('@userload', { timeout: TIMEOUT.WAIT_API });

  // due to some small page load
  cy.contains('tbody td', users.username).should('be.visible');
  cy.get('td').eq(1).should('have.text', users.username, {
    timeout: TIMEOUT.WAIT_ELEMENT,
  });
  cy.get('td')
    .eq(2)
    .should('have.text', `${users.updateFirstName} ${users.updateLastName}`);
  cy.get('td').eq(5).should('have.text', updateRoles);
  cy.get('td').eq(7).should('have.text', 'Active');
});

When('I get the first 3 existing leads email addresses', () => {
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  cy.get('tr > td')
    .eq(1)
    .should('include.text', '@', { timeout: TIMEOUT.WAIT_ELEMENT })
    .invoke('text')
    .then((text: any) => {
      cy.log(text);
    })
    .as('firstEmail');
  cy.get('tr:nth-child(2) > td')
    .eq(1)
    .should('include.text', '@', { timeout: TIMEOUT.WAIT_ELEMENT })
    .invoke('text')
    .then((text: any) => {
      cy.log(text);
    })
    .as('secondEmail');
  cy.get('tr:nth-child(3) > td')
    .eq(1)
    .should('include.text', '@', { timeout: TIMEOUT.WAIT_ELEMENT })
    .invoke('text')
    .then((text: any) => {
      cy.log(text);
    })
    .as('thirdEmail');

  cy.get('@firstEmail').then((firstEmail: any) => {
    cy.get('@secondEmail').then((secondEmail: any) => {
      cy.get('@thirdEmail').then((thirdEmail: any) => {
        insertExistingEmailToCSV(firstEmail, secondEmail, thirdEmail);
      });
    });
  });
});

When('I submit the csv file', () => {
  cy.get('.select-box').within(() => {
    cy.get('input').attachFile('user-import.csv', {
      subjectType: 'drag-n-drop',
    });
  });
  // Wait for validation of the csv file
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2000);

  cy.intercept('POST', '**/api/bff/api/users/import').as('post');
  cy.selectElementWithText('span', 'Confirm Import').click({ force: true });
});

Then('expect the first 3 users to be updated', () => {
  cy.wait('@post').should((xhr) => {
    expect(xhr.response?.body).deep.equal({
      message: 'Import user successfully !',
      success: true,
    });
    expect(xhr?.response?.statusCode).to.equal(201);
  });
  cy.readFile('cypress/fixtures/user-import.csv').then((file) => {
    const lines = file.split('\n');
    const lineArray = [];

    for (let index = 0; index < lines.length; index += 1) {
      const values = lines[index].split(',');
      lineArray.push(values);
    }
    cy.wait(TIMEOUT.WAIT_ELEMENT);
    cy.get('tr > td').eq(1).should('include.text', lineArray[1][3], {
      timeout: TIMEOUT.WAIT_ELEMENT,
    });
    cy.get('tr > td')
      .eq(2)
      .should('include.text', `${lineArray[1][1]} ${lineArray[1][2]}`, {
        timeout: TIMEOUT.WAIT_ELEMENT,
      });
    cy.get('tr > td').eq(5).should('include.text', lineArray[1][0], {
      timeout: TIMEOUT.WAIT_ELEMENT,
    });

    cy.get('tr:nth-child(2) > td')
      .eq(1)
      .should('include.text', lineArray[2][3], {
        timeout: TIMEOUT.WAIT_ELEMENT,
      });
    cy.get('tr:nth-child(2) > td')
      .eq(2)
      .should('include.text', `${lineArray[2][1]} ${lineArray[2][2]}`, {
        timeout: TIMEOUT.WAIT_ELEMENT,
      });
    cy.get('tr:nth-child(2) > td')
      .eq(5)
      .should('include.text', lineArray[2][0], {
        timeout: TIMEOUT.WAIT_ELEMENT,
      });

    cy.get('tr:nth-child(3) > td')
      .eq(1)
      .should('include.text', lineArray[3][3], {
        timeout: TIMEOUT.WAIT_ELEMENT,
      });
    cy.get('tr:nth-child(3) > td')
      .eq(2)
      .should('include.text', `${lineArray[3][1]} ${lineArray[3][2]}`, {
        timeout: TIMEOUT.WAIT_ELEMENT,
      });
    cy.get('tr:nth-child(3) > td')
      .eq(5)
      .should('include.text', lineArray[3][0], {
        timeout: TIMEOUT.WAIT_ELEMENT,
      });
  });
});

Then('expect the User file to be downloaded', () => {
  cy.readFile('cypress/downloads/template.csv', {
    timeout: TIMEOUT.WAIT_API,
  }).should('exist');
});

Then('expect to get all Users Names', () => {
  cy.wait('@humanId', { timeout: TIMEOUT.WAIT_API }).then((xhr) => {
    expect(xhr?.response?.statusCode).to.equal(200);
    cy.writeFile(
      'cypress/fixtures/data/usersId.json',
      xhr?.response?.body.usersWithTeam
    );
  });
  cy.readFile('cypress/fixtures/data/usersId.json').then((arr) => {
    // Just check the first 10 values. No need to check the whole array cause its more than 1500 values
    for (let index = 0; index < 10; index += 1) {
      // Select the first value from the API Array
      cy.contains(arr[index].humanId, { timeout: TIMEOUT.WAIT_API })
        .parent('div')
        .within(() => {
          // Inside the DIV parent, check span has the values by following the API Array
          cy.get('span').should('have.text', arr[index].humanId);
        });
    }
  });
});

Then('expect to get {string} values', (value: string) => {
  if (value === 'Agent scores') {
    const agentScore = ['1 (best)', '2', '3', '4 (worst)'];
    for (let index = 0; index < agentScore.length; index += 1) {
      cy.get(`ul[class="MuiAutocomplete-listbox"] li`)
        .eq(index)
        .should('contain', agentScore[index]);
    }
  }
  if (value === 'Roles') {
    const roles = [
      UserListRoles.admin,
      UserListRoles.manager,
      UserListRoles.supervisor,
      'Sale Agent',
      'Inbound Agent',
      'Customer Service',
      'Documents Collection',
      'Quality Control',
      'Submission',
      'Problem Case',
    ];
    for (let index = 0; index < roles.length; index += 1) {
      cy.get(`ul[class="MuiAutocomplete-listbox"] li`)
        .eq(index)
        .should('contain', roles[index]);
    }
  }
  if (value === 'Product') {
    const product = 'Car Insurance';
    cy.get(`ul[class="MuiAutocomplete-listbox"] li`)
      .eq(0)
      .should('contain', product);
  }
  if (value === 'Status') {
    const status = ['Active', 'Suspended'];
    for (let index = 0; index < status.length; index += 1) {
      cy.get(`ul[class="MuiAutocomplete-listbox"] li`)
        .eq(index)
        .should('contain', status[index]);
    }
  }
  if (value === 'CreateBy') {
    cy.wait('@createBy', { timeout: TIMEOUT.WAIT_API }).then((xhr) => {
      expect(xhr?.response?.statusCode).to.equal(200);
      cy.writeFile('cypress/fixtures/data/createBy.json', xhr?.response?.body);
    });
    cy.readFile('cypress/fixtures/data/createBy.json').then((arr) => {
      // Just check the first 10 values. No need to check the whole array cause its more than 1500 values
      for (let index = 0; index < 10; index += 1) {
        // Select the first value from the API Array
        cy.contains(arr[index].value, { timeout: TIMEOUT.WAIT_API })
          .parent('div')
          .within(() => {
            // Inside the DIV parent, check span has the values by following the API Array
            cy.get('span').should('have.text', arr[index].value);
          });
      }
    });
  }
  if (value === 'Date Type') {
    const dateType = ['Select', 'Created on', 'Updated on'];
    for (let index = 0; index < dateType.length; index += 1) {
      cy.get(`ul li`).should('contain', dateType[index]);
    }
  }
});

When('I click on date type dropdown', () => {
  cy.get('#mui-component-select-criteria').click();
});

When('I click on {string} item', (value: string) => {
  // created on will be in the 4 position from <li> list
  cy.get(`ul li`).eq(3).should('contain', value).click();
});
