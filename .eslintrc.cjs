module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "./asParser.cjs",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: ['no-var'],
    rules: {
        'no-var/var2let': ["error"]
    },
    // extends: ['plugin:no-var/recommended'],
    // globals:{
    //     custom: "writable"
    // },
}
