export default class MockData {
  static getProducts() {
    return [
      { id: 1, title: 'Car Insurance' },
      { id: 2, title: 'Health Insurance' },
      { id: 3, title: 'Life Insurance' },
    ];
  }

  static getLeadTypes() {
    return [
      { id: 1, title: 'New' },
      { id: 2, title: 'Renewal' },
      { id: 3, title: 'Retainer' },
    ];
  }

  static getManagers() {
    return [
      { id: 1, title: 'Siriwan' },
      { id: 2, title: 'Somsi' },
      { id: 3, title: 'Prapat' },
    ];
  }

  static getTeamNames() {
    return [
      { id: 1, title: 'Team A' },
      { id: 2, title: 'Team B' },
      { id: 3, title: 'Team C' },
    ];
  }

  static getUserRoles() {
    return [
      { id: 1, title: 'Admin' },
      { id: 2, title: 'Contact Center Manager' },
      { id: 3, title: 'Contact Center Supervisor' },
      { id: 4, title: 'Contact Center Sale Agent' },
      { id: 5, title: 'Contact Center Inbound Agen' },
    ];
  }
}
