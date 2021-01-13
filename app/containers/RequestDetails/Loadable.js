/**
 *
 * Asynchronously loads the component for RequestDetails
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
