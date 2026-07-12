import { getAuth } from "firebase/auth";
import { app } from "./config";

export const firebaseAuth = getAuth(app);