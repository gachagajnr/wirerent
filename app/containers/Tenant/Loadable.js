/**
 *
 * Asynchronously loads the component for Tenant
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
