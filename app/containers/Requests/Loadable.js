/**
 *
 * Asynchronously loads the component for Requests
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
