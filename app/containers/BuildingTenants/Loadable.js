/**
 *
 * Asynchronously loads the component for BuildingTenants
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
