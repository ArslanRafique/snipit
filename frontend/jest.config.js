const {defaults} = require('jest-config');

module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.+(ts|tsx|js|scss)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$":
      "<rootDir>/node_modules/jest-css-modules-transform",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.js"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/src/setupEnzyme.ts"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};