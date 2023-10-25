import React from "react"
import type { Preview } from "@storybook/react";
import { MantineProvider as TheMantineProvider, createTheme } from '@mantine/core';
const theme = createTheme({
  /** Put your mantine theme override here */
});
import '@mantine/core/styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <TheMantineProvider theme={theme}>
      <Story />
    </TheMantineProvider>
  ),
];

export default preview;
