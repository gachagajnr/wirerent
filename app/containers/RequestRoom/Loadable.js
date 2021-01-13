/**
 *
 * Asynchronously loads the component for RequestRoom
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
