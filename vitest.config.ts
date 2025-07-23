import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'node',
        setupFiles: ['./vitest.setup.ts'], // 👈 Vincula o arquivo de setup
    },
})