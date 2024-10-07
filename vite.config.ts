/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./setupTest.js",
        coverage: {
            exclude: [
                "node_modules/**",
                "*.config.*",
                "src/main.tsx",
                "src/vite-env.d.ts",
                "src/components/ui/**",
                "src/hooks/use-toast.ts",
            ],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
