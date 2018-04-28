export const decodeJwt = t => JSON.parse(window.atob(t.split('.')[1]));
