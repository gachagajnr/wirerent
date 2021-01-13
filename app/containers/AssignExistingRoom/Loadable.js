/**
 *
 * Asynchronously loads the component for AssignExistingRoom
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
