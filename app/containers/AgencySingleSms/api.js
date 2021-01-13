import { smsS } from 'utils/api';

export function fetchSmss(id) {
  return smsS.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agency: id.id,
    },
  });
}

