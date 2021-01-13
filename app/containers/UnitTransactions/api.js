import { receipts, transactions } from 'utils/api';

export function fetchTransactions(id) {
  return receipts.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      room: id.id,
      // author: id.author,
    },
  });
}
// create room
export function newReceipt(receipt) {
  return transactions.create(receipt.receipt);
}

// create receipt
export function newTransaction(data) {
  console.log(data)
  return receipts.create(data.data);
}
