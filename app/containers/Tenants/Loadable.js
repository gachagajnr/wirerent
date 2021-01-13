/**
 *
 * Asynchronously loads the component for Tenants
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
