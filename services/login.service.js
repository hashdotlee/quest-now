import { fetchWrapper } from "../utils/fetchWrapper";
import jwtDecode from "jwt-decode";
import API_URL from "../utils/constants/apiURL";
import { setUser } from "../utils/authUtils";

const loginService = async (email, password) => {
  const response = await fetchWrapper(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // set the token in local storage
  localStorage.setItem("token", response.accessToken);

  const decodedToken = jwtDecode(response.accessToken);

  // set the user in local storage
  setUser(decodedToken);

  return response;
};

export default loginService;
