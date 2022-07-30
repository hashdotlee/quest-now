export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    return;
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    return;
  }
  return null;
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user"));
  }
  return null;
};

export const setUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
    return;
  }
  return null;
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    return;
  }
  return null;
};
