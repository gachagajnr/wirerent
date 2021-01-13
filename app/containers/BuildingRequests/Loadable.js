/**
 *
 * Asynchronously loads the component for BuildingRequests
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
