import { users } from 'utils/api';

export function createUser(data) {
  return users.create(data.data);
}
