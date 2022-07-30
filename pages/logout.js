import { useEffect } from "react";
import { isLoggedIn, removeToken, removeUser } from "../utils/authUtils";
export default function Logout() {
  useEffect(() => {
    if (isLoggedIn()) {
      removeToken();
      removeUser();
      window.location.href = "/login";
    } else {
      window.location.href = "/login";
    }
  }, []);
  return null;
}
