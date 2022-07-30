import {useRouter} from "next/router";
import { useEffect } from "react";
import { isLoggedIn, removeToken, removeUser } from "../utils/authUtils";
export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn()) {
      removeToken();
      removeUser();
      router.push("/login");
    } else {
      router.push("/login");
    }
  }, [router]);
  return null;
}
