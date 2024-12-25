const defineAbilitiesFor = (role) => {
  if (typeof role !== "number") {
    console.error("Invalid role type:", typeof role, "Value:", role);
    return [];
  }

  console.log(">>>>>CHECK ROLE At define:", role);

  switch (role) {
    case 1: // Admin
      return [
        { action: "manage", subject: "Category" },
        { action: "manage", subject: "Account" },
        { action: "manage", subject: "Role" },
        { action: "manage", subject: "Item" },
        { action: "read", subject: "Request" },
        { action: "manage", subject: "Request" },
        { action: "manage", subject: "Dashboard" },
        { action: "manage", subject: "all" },
      ];
    case 2: // Artist
      return [
        { action: "manage", subject: "Item" },
        { action: "create", subject: "Request" },
        { action: "create", subject: "Category" },
        { action: "delete", subject: "Request" },
      ];
    case 3: // NormalUser
      return [
        { action: "purchase", subject: "Item" },
        { action: "create", subject: "Request" },
        { action: "delete", subject: "Request" },
        { action: "update", subject: "Account" },
      ];
    case 4: // Guest
      return [
        { action: "read", subject: "Item" },
        { action: "read", subject: "Account" },
        { action: "read", subject: "Category" },
      ];
    default:
      return [];
  }
};

export default defineAbilitiesFor;
