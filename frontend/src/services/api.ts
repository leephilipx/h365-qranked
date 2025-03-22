import axios from "axios";
import { dummyGetLeaderboard, dummyGetTableData } from "../utils/dummy";

const baseUrl = () => {
  if (process.env.REACT_APP_BACKEND_API_URL) return process.env.REACT_APP_BACKEND_API_URL;
  console.log("`REACT_APP_BACKEND_API_URL` environment variable not set, API calls will fail");
  return "http://localhost/"
};

const api = axios.create({
  baseURL: baseUrl(),
  data: {},
});

const useDummyData = true; // (process.env.REACT_APP_USE_DUMMY_DATA === "true");

export const getLeaderboard = async () => {
  try {
    if (useDummyData) return dummyGetLeaderboard;
    const response = await api.get('view-leaderboard');
    return response.data.map((entry: any) => {
      return {
        userAlias: entry.UserAlias,
        codeCountRedeemedTOT: parseInt(entry.CodeCountRedeemedTOT, 10),
      }
    });
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    return [];
  }
};

export const getTableData = async () => {
  try {
    if (useDummyData) return dummyGetTableData;
    console.log("Not implemented yet")
    return [];
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    return [];
  }
};

export const loginUser = async (email: string, hashedPassword: string) => {
  console.log("loginUser", email, hashedPassword);
  // return api.post("/api/login", { email, password: hashedPassword });
};

export const registerUser = async (email: string, hashedPassword: string, userAlias: string) => {
  console.log("registerUser", email, hashedPassword, userAlias);
  // return api.post("/api/register", { email, password: hashedPassword, userAlias });
};