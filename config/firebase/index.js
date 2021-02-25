import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

export const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: `${AUTH_DOMAIN}`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: `${PROJECT_ID}`,
  storageBucket: `${STORAGE_BUCKET}`,
  messagingSenderId: `${MESSAGING_SENDER_ID}`,
  appId: `${APP_ID}`,
};
