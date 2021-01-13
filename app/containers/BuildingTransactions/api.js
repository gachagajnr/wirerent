import { receipts } from 'utils/api';

export function fetchTransactions(id) {
  return receipts.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      building: id.id,
    },
  });
}
