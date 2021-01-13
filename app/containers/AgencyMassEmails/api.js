import { mass_emails } from 'utils/api';

export function createEmail(data) {
  return mass_emails.create(data.data);
}

export function fetchEmails(id) {
  return mass_emails.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      organization: id.id,
    },
  });
}

export function deleteEmail(rec) {
  return mass_emails.remove(rec.rec);
}
