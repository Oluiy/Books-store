// All configuration must come from environment variables.
// Do NOT hardcode secrets or ports in source files.
export const PORT = process.env.PORT ? Number(process.env.PORT) : undefined;
export const mongoDBURL = process.env.DBURL || "";