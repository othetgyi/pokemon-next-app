import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
    {
        ignores: ["**/node_modules/**", "**/.next/**", "**/out/**", "**/coverage/**", "**/dist/**", "**/build/**"]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        ...pluginReact.configs.flat.recommended,
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...pluginReact.configs.flat.recommended.rules,
            "no-unused-vars": "error",
            "prefer-const": ["error", {ignoreReadBeforeAssign: true}],
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
        },
    },
);

