import { payments } from 'utils/api';

export function fetchB_PayInfo(id) {
  return payments.find({
    query: {
      building: id.id,
    },
  });
}

export function createB_PayInfo(data) {
  return payments.create(data.data);
}
