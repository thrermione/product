module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:jest/recommended",
        "airbnb",
        "airbnb/hooks",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest",
    ],
    "settings": {
        "import/extensions": [
            ".js",
            ".jsx"
        ]
    },
    "rules": {
        "no-console": "off",
    },
};