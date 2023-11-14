import { defineConfig } from "vite"
import typescript from "@rollup/plugin-typescript"
import path from "path"
import { typescriptPaths } from "rollup-plugin-typescript-paths"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: false,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
      output: {
        sourcemap: true,
      },
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: true,
          declaration: true,
          outDir: "dist",
          allowImportingTsExtensions: false,
          // include: ["**/src/components/**", "**/src/hooks/**"],
          exclude: [
            "**/__tests__/**",
            "**/*.test.ts",
            "**/stories/**",
            "**/*.stories.ts",
            "**/storybook_utils/**",
            "**/test_utils/**",
          ],
        }),
      ],
    },
  },
})
