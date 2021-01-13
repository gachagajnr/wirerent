/**
 *
 * Asynchronously loads the component for AssignRoom
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
