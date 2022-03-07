import jwt from 'jsonwebtoken';
export default function getRoles(token) {
  const decoded = jwt.decode(token);
  return decoded.roles;
}
