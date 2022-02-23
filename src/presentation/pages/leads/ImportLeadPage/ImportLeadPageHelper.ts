const isCanCreateLead = (useRole: string) => {
  const rolesCreateLead = ['roles/admin', 'roles/manager', 'roles/supervisor'];
  return rolesCreateLead.includes(useRole);
};
export default isCanCreateLead;

export const canDownload = (userRole: string) => {
  const rolesCreateLead = ['roles/admin'];
  return rolesCreateLead.includes(userRole);
};
