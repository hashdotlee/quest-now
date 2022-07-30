import { getToken, isLoggedIn } from "./authUtils";

export const fetchWrapper = (url, options) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      if (response.status === 401) {
        // check if the user is logged in
        if (isLoggedIn()) {
          // if the user is logged in, log them out
          localStorage.removeItem("token");
          // redirect to the login page
        }
        // if not, redirect to login page
        window.location.href = "/login";
      }
      throw new Error(response.statusText);
    })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};
