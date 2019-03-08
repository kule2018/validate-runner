module.exports = {
    preset: "ts-jest",
    testMatch: ["<rootDir>/tests/**/*.(spec|test).ts?(x)"],
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(validate-methods/es|validate-provider/es))"]
};
