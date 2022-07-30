import { useEffect } from "react";
import { isLoggedIn, removeToken, removeUser } from "../utils/authUtils";
export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn()) {
      removeToken();
      removeUser();
      router.push("/quest-now/login");
    } else {
      router.push("/quest-now/login");
    }
  }, [router]);
  return null;
}
