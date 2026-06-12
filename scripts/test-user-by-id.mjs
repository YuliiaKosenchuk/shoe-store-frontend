const BASE_URL = "http://localhost:8080";

async function main() {
  // 1. Login to get token
  console.log("→ Logging in...");
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "user@example.com", password: "Password123!" }),
  });

  const loginData = await loginRes.json();
  console.log("Login status:", loginRes.status);
  console.log("Login response:", loginData);

  const token = loginData?.token ?? loginData?.accessToken ?? null;
  if (!token) {
    console.error("No token received — cannot proceed.");
    return;
  }

  const headers = { Authorization: `Bearer ${token}` };

  // 2. Try id=0 and id=1
  for (const id of [0, 1]) {
    console.log(`\n→ Fetching /api/users/${id} ...`);
    const res = await fetch(`${BASE_URL}/api/users/${id}`, { headers });
    let body;
    try { body = await res.json(); } catch { body = await res.text(); }
    console.log(`Status ${id}:`, res.status);
    console.log(`User   ${id}:`, body);
  }
}

main().catch(console.error);
