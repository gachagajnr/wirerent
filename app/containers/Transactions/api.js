import { receipts } from 'utils/api';

export function fetchTransactions(organization) {
  console.log(organization);
  return receipts.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      // createdAt: {
      //   $lt:  organization.time-new Date().getTime() ,
      // },
      agency: organization.organization,
    },
  });
}

export function verifyReceipt(id) {
  return receipts.patch(id.id, {
    isVerified: true,
    hasRequestedReceipt: false,
  });
}

export function requestReceipt(id) {
  return receipts.patch(id.id, {
    hasRequestedReceipt: true,
    isVerified: false,
  });
}
