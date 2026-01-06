const allowedUsers = [
  {
    username: "admin",
    password: "admin123",
    role: "admin"
  },
  {
    username: "employee",
    password: "emp123",
    role: "employee"
  },
  {
    username: "teja",
    password: "teja@123",
    role: "employee"
  }
];

export const login = (username, password) => {
  if (!username || !password) return false;

  const user = allowedUsers.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("auth", "true");
    localStorage.setItem("authUser", JSON.stringify(user));
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("authUser");
  localStorage.removeItem("employees");
};

export const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};

export const getAuthUser = () => {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};
