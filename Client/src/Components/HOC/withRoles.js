import { useSelector } from 'react-redux';
const withRoles = (role) => (Component) => (props) => {
  const { roles } = useSelector((state) => state.auth);
  if (!roles) return null;
  console.log(roles, role);
  if (roles.includes(role)) {
    return <Component {...props} />;
  }
  return null;
};
export const withAdminRole = withRoles('admin');
export const withEditorRole = withRoles(['editor']);
export const withManagmentRole = withRoles(['admin', 'editor']);
export default withRoles;
