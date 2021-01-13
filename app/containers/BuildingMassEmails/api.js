import { building_mass_emails } from 'utils/api';

export function sendEmail(data) {
  return building_mass_emails.create(data.data);
}

export function fetchEmails(id) {
  return building_mass_emails.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      building: id.id,
    },
  });
}
