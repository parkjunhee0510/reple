// src/config/env.ts
interface EnvConfig {
    API_BASE_URL: string;
    MODE: string;
}

const env: EnvConfig = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL ?? "",
    MODE: process.env.NODE_ENV ?? "development",
};

export default env;