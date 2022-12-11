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

const getPartialConf = (): string => {
  const val = process.env.PARTIAL_SERV_CONF;
  if (typeof val === "undefined") {
    throw "Config value not defined.";
  }
  return val;
};

export const connString = getConnString();
export const partialConf = getPartialConf();
