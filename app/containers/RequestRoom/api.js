import { add_requests } from 'utils/api';

export function createRequest(data) {
  return add_requests.create(data.data);
}
