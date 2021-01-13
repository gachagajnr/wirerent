/**
 *
 * Asynchronously loads the component for LoginPage
 *
 */
import React from 'react';
import { Spin } from 'antd';
import loadable from 'utils/loadable';

export default loadable(() => import('./index'), {
  fallback: (
    <div style={{ margin: 'auto' }}>
      <Spin size="large" style={{ textAlign: 'center' }} />
    </div>
  ),
});
