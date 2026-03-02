import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), visualizer({ open: true, filename: 'bundle-analysis.html' })],
    base: process.env.BASE_URL || '/',
    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': [
                        'react',
                        'react-dom',
                        'react-router-dom',
                        'react-redux',
                        '@reduxjs/toolkit',
                    ],
                    'vendor-mui': [
                        '@mui/material',
                        '@mui/icons-material',
                        '@emotion/react',
                        '@emotion/styled',
                    ],
                    'vendor-utils': ['@tanstack/react-query', 'axios', 'nprogress'],
                    'vendor-forms': ['formik', 'yup', 'react-hook-form', '@hookform/resolvers'],
                    'vendor-backend-mock': ['@sidekick-monorepo/internship-backend'],
                },
            },
        },
    },
});
