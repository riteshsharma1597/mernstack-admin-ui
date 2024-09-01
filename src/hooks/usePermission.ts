import { User } from "../store";

const usePermission = () => {
  const allowedRoles = ["admin", "manager"];

  const _hasPermission = (user: null | User) => {
    if (user) allowedRoles.includes(user.role);
    return false;
  };

  return { isAllowed: _hasPermission };
};

export default usePermission;
