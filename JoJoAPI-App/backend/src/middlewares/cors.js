import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:5500",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://jojostats.netlify.app",
  "https://jo-jo-stats-50kaqn0wh-mir4i-devs-projects.vercel.app"
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  });
