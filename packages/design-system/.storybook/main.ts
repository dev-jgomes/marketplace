import type { StorybookConfig } from "@storybook/react-vite";
import type { Alias } from "vite";

import path from "path";
import { fileURLToPath } from "url";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return path.dirname(
    fileURLToPath(import.meta.resolve(`${value}/package.json`)),
  );
}
const configDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.{js,jsx,mjs,ts,tsx}"],
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-onboarding"),
  ],
  framework: getAbsolutePath("@storybook/react-vite"),
  async viteFinal(config, { configType }) {
    const baseAlias = (config.resolve?.alias ?? []) as Alias[];

    return {
      ...config,
      resolve: {
        ...(config.resolve ?? {}),
        alias: [
          ...baseAlias,
          {
            find: "@marketplace/design-system",
            replacement: path.resolve(configDir, "../src/index.ts"),
          },
          {
            find: /^@marketplace\/design-system\/(.*)/,
            replacement: path.resolve(configDir, "../src/$1"),
          },
        ],
      },
    };
  },
};
export default config;
