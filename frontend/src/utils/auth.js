export const getUserRole = (user) => user?.role ?? null;


export const isSuperAdmin = () => getUserRole() === "super_admin";
export const isAdmin = () => getUserRole() === "admin";
export const isEntryUser = () => getUserRole() === "user";
