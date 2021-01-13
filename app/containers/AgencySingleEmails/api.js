import { emails } from 'utils/api';

export function fetchEmails(id) {
  return emails.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agency: id.id,
    },
  });
}

