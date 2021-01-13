import { agencies } from 'utils/api';

export async function fetchAgency(organization) {
  return await agencies.get(organization.organization);
}

export function addNewAgency(data) {
  return agencies.create(data.data);
}
