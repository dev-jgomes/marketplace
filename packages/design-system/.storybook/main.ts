import type { StorybookConfig } from "@storybook/react-vite";
import type { Alias } from "vite";

import path from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/postcss";
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
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: getAbsolutePath("@storybook/react-vite"),
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    const baseAlias = (config.resolve?.alias ?? []) as Alias[];

    return {
      ...config,
      css: {
        postcss: {
          plugins: [tailwindcss()],
        },
      },
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
          {
            find: /^@\/(.*)/,
            replacement: path.resolve(configDir, "../src/$1"),
          },
        ],
      },
    };
  },
};
export default config;
