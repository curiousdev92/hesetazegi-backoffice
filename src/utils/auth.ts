import { jwtDecode, JwtPayload } from "jwt-decode";
import { getCookie } from "./cookies";

const token = getCookie("bo-tkn");

const isTokenValid = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp && decoded.exp > currentTime; // Check if token is expired
  } catch (error) {
    return false; // Invalid token
  }
};

const isAuth = isTokenValid(token);

export default isAuth;
