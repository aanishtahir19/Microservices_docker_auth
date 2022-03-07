import React from 'react';
import { withAdminRole } from '../../Components/HOC/withRoles';
function Restricted() {
  return <div>Restricted</div>;
}

export default withAdminRole(Restricted);
