export default function insertRole(role) {
  switch (role) {
    case 1:
      return 'SuperAdmin';
    case 2:
      return 'Admin';
    case 3:
      return 'Author';
    case 4:
      return 'Editor';
    default:
      return role;
  }
}
