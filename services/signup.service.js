export default async function signup(username, password, email) {
  const response = await fetchWrapper(`${process.env.API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });

  const data = await response.json();
  return data;
}
