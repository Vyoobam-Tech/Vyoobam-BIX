import { useMemo } from "react";
import { COMMON_ACTIONS } from "../components/ReusableTable";

const useTableActions = (role) => {
  return useMemo(() => {
    return [
      {
        ...COMMON_ACTIONS.EDIT,
        show: () => ["super_admin", "admin"].includes(role),
      },
      {
        ...COMMON_ACTIONS.DELETE,
        show: () => ["super_admin", "admin"].includes(role),
      },
      {
        ...COMMON_ACTIONS.HISTORY,
        show: () => ["super_admin", "admin", "user"].includes(role),
      },
    ];
  }, [role]);
};

export default useTableActions;
