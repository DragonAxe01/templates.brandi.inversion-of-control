require("dotenv").config({
  path: ".env",
});

const getConnString = (): string => {
  const val = process.env.CONN_STRING_MOCK;
  if (typeof val === "undefined") {
    throw "Config value not defined.";
  }
  return val;
};

export const connString = getConnString();
