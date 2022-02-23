import { addDays, format } from 'date-fns';

export const DELAY_TIME_LOAD_PAGE = 2000;
export const DELAY_LOGIN_API = 4000;
export const DELAY_LOAD_API = 3000;
export const GET_TEAM_API_LOAD_TIME = 3000;
export const UPDATE_TEAM_API_LOAD_TIME = 6000;
export const DELAY_TRIGGER_PAGE = 62 * 1000;
export const LEAD_DETAIL_URL = '/lead/c374805c-ced4-4135-9908-7d8d6989fd95';
export const DELAY_LOADING_API = 4000;

export const TIMEOUT = {
  WAIT_API: 10000,
  WAIT_ELEMENT: 5000,
};

export const ACTION_PAGE = {
  NEXT: 'next',
  PREV: 'prev',
  FIRST: 'first',
};

export const SCORING_TABLE = {
  NEW: 'new',
  RENEWAL: 'renewal',
  RETAINER: 'retainer',
};

export const OVERFLOW_TABLE = {
  NEW: 'new',
  RETAINER: 'retainer',
};

export const OVERFLOW_ROW = {
  LEAD1: 'lead1',
  LEAD2: 'lead2',
  LEAD3: 'lead3',
  LEAD4: 'lead4',
};

export const VIEW_PORT_VALUE = {
  width: 1536,
  height: 960,
};

export const NAVIGATE_PAGE_VALUE = {
  LEADS: 'leads',
  ORDER: 'orders',
  USER_MANAGEMENT: 'usermanagement',
  PACKAGE: 'package',
  CAR_DISCOUNT_IMPORT: 'cardiscount-import',
};

export const NAVIGATE_ADMIN_SUB = {
  TEAMS: 'Teams',
  USERS: 'Users',
};

export const NAVIGATE_LEAD_SUB = {
  ASSIGNMENT: 'Assignment',
  REJECTIONS: 'Rejections',
  ALL: 'All',
  IMPORT: 'Import',
  DISTRIBUTION: 'Overflow',
  SOURCES: 'Sources',
  SCORING: 'Scoring',
  OVERFLOW: 'Overflow',
  SEGMENTATION: 'Segmentation',
};

export const FAKE_CREATE_SOURCE_DATA = {
  source: 'Source test cypress',
  product: 'products/car-insurance',
  hidden: true,
  online: false,
};

export const FAKE_UPDATE_SOURCE_DATA = {
  source: 'Source test cypress update',
  product: 'products/car-insurance',
  hidden: false,
  online: false,
};

export const FAKE_CREATE_TEAM_DATA = {
  displayName: 'Team test cypress',
  productType: 'products/car-insurance',
  customerType: 'new',
  manager: '',
  supervisor: '',
};

export const FAKE_UPDATE_TEAM_DATA = {
  displayName: 'Team test cypress updated',
  productType: 'products/car-insurance',
  customerType: 'new',
  manager: '',
  supervisor: '',
};

export const FAKE_CREATE_USER_DATA = {
  role: 'roles/manager',
  firstName: 'Vu',
  lastName: 'Pham',
  humanId: 'vupt93',
  dailyLimit: 3,
  totalLimit: 7,
};

export const users = {
  firstName: 'Cypress',
  lastName: 'Test',
  username: '',
  dailyLeadLimit: '4',
  totalLeadlimit: '20',
  dropdownRole: '',
  listRole: '',
  team: '',
  updateFirstName: 'CypressUpd',
  updateLastName: 'TestUpd',
  updateDailyLeadLimit: '400',
  updateTotalLeadlimit: '200',
};

// Define User Roles from the User List page
export const UserListRoles = {
  admin: 'Admin',
  manager: 'Manager',
  supervisor: 'Supervisor',
  sales: 'Sales agent',
  inbound: 'Inbound agent',
  customerService: 'Customer Service Agent',
  documentCollection: 'Documents Collection Agent',
  qualityControl: 'Quality Control Agent',
  submission: 'Submission Agent',
  problemCase: 'Problem Case Agent',
};

export const leadsSettingValue = [
  100, 0, 0, 0, 0, 95, 1, 4, 0, 0, 99, 1, 0, 5, 0, 95,
];

export const FAKE_CREATE_APPOINTMENT = {
  subject: 'cypress test appointment',
};
export const CYPRESS_BASE_URL = 'https://staging-crm.sabye-songkran.com';
export const API_URL = 'https://staging-crm.sabye-songkran.com/api';
export const WEBSITE_URL = 'https://staging-finance.rabbitinternet.com';

export const listPageValues = {
  username: '129324595@gmail.com',
  fullname: 'CypressUpd TestUpd',
  agentScore: '2',
  product: 'Car Insurance',
  role: 'Supervisor',
  status: 'Suspended',
  createdBy: 'Odertest Account',
  createdOn: 'Created on Last Month',
};

export function stubNewRelic() {
  // Block newrelic js outright due to issues with Cypress networking code.
  cy.log('Blocking NewRelic scripts');
  // Will block
  //  https://js-agent.newrelic.com/nr-spa-1208.js
  cy.intercept(/\.*newrelic.*$/, (req) => {
    console.log('NEW RELIC INTERCEPTED');
    req.reply("console.log('Fake New Relic script loaded');");
  });
}

export function setupLogin(): void {
  // Set viewport width and height
  // cy.viewport(VIEW_PORT_VALUE.width, VIEW_PORT_VALUE.height);
  // Stub new relic
  stubNewRelic();
  // Clear cookies
  cy.clearCookie('ory_kratos_session');
  cy.clearCookies();
  cy.getCookies().should('be.empty');

  // Visit main url
  cy.visit(CYPRESS_BASE_URL);

  // Login

  const username = Cypress.env('username');
  const password = Cypress.env('password');

  if (typeof username !== 'string') {
    throw new Error(
      'Missing username value, set using local file cypress.env.json'
    );
  }
  // but the password value should not be shown
  if (typeof password !== 'string' || !password) {
    throw new Error(
      'Missing password value, set using local file cypress.env.json'
    );
  }

  cy.get('#identifier').as('username');
  cy.get('@username').type(username);
  cy.get('#password').as('password');
  cy.get('@password').type(password);
  cy.get('.cypress-btn-login span').as('loginButton');
  cy.get('@loginButton').click();

  // Save cookies
  Cypress.Cookies.defaults({
    preserve: ['ory_kratos_session'],
  });
}

export function getLeadID(): void {
  const selector = '[data-cy=checkbox-lead] [type="checkbox"]';
  cy.get(selector).first().check({ force: true });

  // Get lead ID
  cy.get(selector)
    .first()
    .closest('tr')
    .within(() => {
      cy.get('td')
        .eq(10)
        .invoke('text')
        .then((leadId) => {
          cy.wrap(leadId.trim().toString()).as('Lead_id');
        });
    });
}

export function translateTo(language: string): void {
  cy.get('img[alt="English"]').click();
  cy.get('li').contains(language).click({ force: true });
}

export function createUniqueID() {
  function S4() {
    return (1 + Math.random()) * 0x10000;
  }
  return (S4() + S4()).toString().replace('.', '');
}

// This function can used when PO decided to upload new users with the import functionality
// export function manipulateEmails(): void {
//   cy.readFile('cypress/fixtures/user-import.csv').then((file) => {
//     const lines = file.split('\n');
//     const lineArray = [];
//     let csvContent = '';

//     for (let index = 0; index < lines.length; index += 1) {
//       const values = lines[index].split(',');
//       lineArray.push(values);
//     }
//     for (let index = 0; index < lineArray.length; index += 1) {
//       if (index === 0 || index === lineArray.length - 1) {
//         const content = lineArray[index].toString();
//         if (index === 0) {
//           csvContent += `${content}\n`;
//         } else {
//           csvContent += `${content}`;
//         }
//       } else {
//         const id = createUniqueID();
//         lineArray[index][3] = `${id}@cypress.co.th`;
//         const content = lineArray[index].toString();
//         csvContent += `${content}\n`;
//       }
//     }
//     cy.writeFile('cypress/fixtures/user-import.csv', csvContent);
//   });
// }

export function insertExistingEmailToCSV(
  email1: string,
  email2: string,
  email3: string
): void {
  cy.readFile('cypress/fixtures/user-import.csv').then((file) => {
    const lines = file.split('\n');
    const lineArray = [];
    let csvContent = '';
    let content: string[];

    for (let index = 0; index < lines.length; index += 1) {
      const values = lines[index].split(',');
      lineArray.push(values);
    }
    for (let index = 0; index < lineArray.length; index += 1) {
      switch (index) {
        case 1:
          lineArray[index][3] = email1;
          content = lineArray[index].toString();
          csvContent += `${content}\n`;
          content = [];
          break;
        case 2:
          lineArray[index][3] = email2;
          content = lineArray[index].toString();
          csvContent += `${content}\n`;
          content = [];
          break;
        case 3:
          lineArray[index][3] = email3;
          content = lineArray[index].toString();
          csvContent += `${content}`;
          content = [];
          break;
        default:
          content = lineArray[index].toString();
          csvContent += `${content}\n`;
          content = [];
          break;
      }
    }
    cy.writeFile('cypress/fixtures/user-import.csv', csvContent);
  });
}

export function getDateWithOffset(dateFormat: string, offset?: any): string {
  const date = new Date();
  let formattedDate: string;
  if (offset == null && offset === undefined) {
    formattedDate = format(date, dateFormat);
  } else {
    formattedDate = format(addDays(date, offset), dateFormat);
  }
  return formattedDate;
}

export function importData(apiEndpoint: string, dataLocation: string) {
  const tomorrow = getDateWithOffset('yyyy-MM-dd', 1);
  cy.fixture(dataLocation).then((body: any) => {
    cy.request('POST', apiEndpoint, body).its('body').as('leadId');
  });
  cy.get('@leadId').then((res: any) => {
    cy.fixture('patch-lead').then((data: any) => {
      // eslint-disable-next-line no-param-reassign
      data.id = res?.name;
      // eslint-disable-next-line no-param-reassign
      data.policy_start = tomorrow;
      cy.wait(TIMEOUT.WAIT_API);
      cy.request('PATCH', `${WEBSITE_URL}/api/sales/motor/lead`, data);
      return cy.wrap(res);
    });
  });
}

export function saleAgentData(daily: string, total: string, position: number) {
  cy.get('input[name="dailyLimit"]').clear().type(daily);
  cy.get('input[name="totalLimit"]').clear().type(total);
  cy.get('#mui-component-select-agentScore').click();
  cy.get('ul').find('li').eq(position).click();
}

export function verifyAgentData() {
  cy.get('#mui-component-select-team').should('have.text', users.team);
  cy.get('input[name="dailyLimit"]').type(users.dailyLeadLimit);
  cy.get('input[name="totalLimit"]').type(users.totalLeadlimit);
}

export function verifyUserRole(role: string) {
  let position = 0;
  switch (role) {
    case 'Admin':
      users.listRole = role;
      break;
    case 'Manager':
      position = 1;
      users.listRole = role;
      break;
    case 'Supervisor':
      position = 2;
      users.listRole = role;
      break;
    case 'Sales agent':
      position = 3;
      users.listRole = role;
      break;
    case 'Inbound agent':
      position = 4;
      users.listRole = role;
      break;
    case 'Customer Service Agent':
      position = 5;
      users.listRole = role;
      break;
    case 'Documents Collection Agent':
      position = 6;
      users.listRole = role;
      break;
    case 'Quality Control Agent':
      position = 7;
      users.listRole = role;
      break;
    case 'Submission Agent':
      position = 8;
      users.listRole = role;
      break;
    case 'Problem Case Agent':
      position = 9;
      users.listRole = role;
      break;
    default:
      break;
  }
  return position;
}

export function verifyUpdateFormButtons() {
  cy.get('button')
    .contains('span', 'Suspend')
    .should('be.visible', { timeout: TIMEOUT.WAIT_ELEMENT });
  cy.get('button')
    .contains('span', 'Recovery Link')
    .should('be.visible', { timeout: TIMEOUT.WAIT_ELEMENT });
  cy.get('button')
    .contains('span', 'Cancel')
    .should('be.visible', { timeout: TIMEOUT.WAIT_ELEMENT });
  cy.get('button')
    .contains('span', 'Update')
    .should('be.visible', { timeout: TIMEOUT.WAIT_ELEMENT });
}

export function verifyClearButton() {
  cy.get('button')
    .contains('span', 'Clear All')
    .should('not.be.disabled')
    .click();
}

export function getLastMonth() {
  const m = new Date();
  const lastMonth = m.getMonth();
  // Returns current month BUT starting from 0 (Ex: January=0, February=1...)
  return lastMonth;
}
