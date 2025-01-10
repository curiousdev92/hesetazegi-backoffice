export function setCookie(cname: string, cvalue: string, exdays: number): void {
  const d: Date = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires: string = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname: string): string {
  const name: string = `${cname}=`;
  const ca: string[] = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c: string = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
