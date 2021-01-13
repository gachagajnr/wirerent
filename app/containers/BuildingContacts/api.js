import { contacts } from 'utils/api';

export function fetchB_Contacts(id) {
  return contacts.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      building: id.id,
    },
  });
}

export function newB_Contact(data) {
  return contacts.create(data.data);
}
