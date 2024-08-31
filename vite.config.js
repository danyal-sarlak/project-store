import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html', // مسیر فایل گزارش
      open: true,                    // باز کردن گزارش در مرورگر پس از ساختن
      gzipSize: true,                // محاسبه اندازه فایل gzip شده
      brotliSize: true               // محاسبه اندازه فایل brotli شده
    })
  ],
});
