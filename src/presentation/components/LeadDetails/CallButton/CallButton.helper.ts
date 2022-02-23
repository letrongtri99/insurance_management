import SessionStorage, {
  SESSION_STORAGE_KEY,
} from 'shared/helper/SessionStorage';

export const sessionStorageService = new SessionStorage();

export const setSessionPhoneNumber = (phoneIndex: number, leadId: string) => {
  const listPhoneSession = JSON.parse(
    sessionStorageService.getItemByKey(SESSION_STORAGE_KEY.LIST_PHONE_NUMBER) ||
      '[]'
  );
  if (phoneIndex > -1 && leadId) {
    const selectedPhoneNumber = {
      index: phoneIndex,
      value: leadId,
    };
    let newListPhoneNumber = [];
    if (listPhoneSession.length) {
      const existLead = listPhoneSession.find(
        (item: any) => item.value === selectedPhoneNumber.value
      );
      if (existLead) {
        newListPhoneNumber = listPhoneSession.map((item: any) => {
          const temp = { ...item };
          if (temp.value === selectedPhoneNumber.value) {
            temp.index = phoneIndex;
          }
          return temp;
        });
      } else {
        newListPhoneNumber.push(selectedPhoneNumber);
      }
    } else {
      newListPhoneNumber.push(selectedPhoneNumber);
    }

    sessionStorageService.setItemByKey(
      SESSION_STORAGE_KEY.LIST_PHONE_NUMBER,
      JSON.stringify(newListPhoneNumber)
    );
  }
};
