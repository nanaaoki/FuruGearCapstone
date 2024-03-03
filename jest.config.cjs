module.exports = {
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.avif$": "<rootDir>/__mocks__/filemock.js"
  },
  extensionsToTreatAsEsm: [".jsx"],
  transform: {
    "^.+\\.js?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  verbose: true,
};
