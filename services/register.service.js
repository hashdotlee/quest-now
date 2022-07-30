import API_URL from "../utils/constants/apiURL";
import {fetchWrapper} from "../utils/fetchWrapper";

export default async function registerService(email, password, username) {
  return fetchWrapper(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });
}
