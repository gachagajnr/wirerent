/*
 * Tenant Messages
 *
 * This contains all the text for the Tenant container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Tenant';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Tenant container!',
  },
});
