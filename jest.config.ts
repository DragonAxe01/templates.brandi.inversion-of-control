import type { Config } from "@jest/types";

require("dotenv").config({
  path: ".env",
});
require("dotenv").config({
  path: ".env.tests",
});
require("dotenv").config({
  path: ".env.secrets",
});

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  transformIgnorePatterns: [
    "node_modules/(?!" +
      [
        "node-fetch",
        "fetch-blob",
        "data-uri-to-buffer",
        "jest-runtime",
        "formdata-polyfill",
      ].join("|") +
      ")",
  ],
};

export default config;
