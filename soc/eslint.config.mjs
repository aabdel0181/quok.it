import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
// export default eslintConfig;

module.exports = {
  eslintConfig,
  rules: {
    // Disable the no-unused-vars rule for TypeScript
    "@typescript-eslint/no-unused-vars": "off",
    // You can also disable the rule for JavaScript if needed
    "no-unused-vars": "off",
  },
};
