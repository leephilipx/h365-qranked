import CryptoJS from "crypto-js";

const SALT = "random_salt_string"; // Keep this constant across sessions

export const hashPassword = (password: string): string => {
  const saltedPassword = SALT + password;
  return CryptoJS.SHA256(saltedPassword).toString();
};

export const isUserLoggedIn = (): boolean => {
  const storedLoginTime = localStorage.getItem("loginTimestamp");
  if (!storedLoginTime) return false;

  const now = new Date().getTime();
  const loginTime = parseInt(storedLoginTime, 10);
  return now - loginTime < 30 * 24 * 60 * 60 * 1000; // 30 days
};

export const setLoginTimestamp = () => {
  localStorage.setItem("loginTimestamp", new Date().getTime().toString());
};
