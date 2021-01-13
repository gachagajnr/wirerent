import { agencies } from 'utils/api';

export function addNewAgency(data) {
  return agencies.create(data.data);
}
