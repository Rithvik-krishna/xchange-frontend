// src/utils/auth.js

// Returns true if user is logged in (token exists)
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

// Log user out
export function logout() {
  localStorage.removeItem("token");
}
