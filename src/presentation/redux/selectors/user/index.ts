// Selector
export const getUsersToImport = (state: any) => {
  return state.importFileReducer?.setFileReducer?.data?.content;
};
