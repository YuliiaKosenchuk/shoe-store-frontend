export function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

// No Max-Age/Expires — a session cookie, cleared when the browser fully
// closes (shared across all tabs/windows, unlike sessionStorage).
export function setSessionCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
}
