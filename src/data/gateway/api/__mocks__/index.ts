export const mockDoGetAjaxRequest = jest.fn();
export const mockDoPatchAjaxRequest = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  // Spy on these methods
  return {
    doGetAjaxRequest: mockDoGetAjaxRequest,
    doPatchAjaxRequest: mockDoPatchAjaxRequest,
  };
});

export default mock;
