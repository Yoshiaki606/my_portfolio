import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Ép Vite sử dụng một phiên bản duy nhất cho React
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    // Ép đóng gói chung các thư viện này ngay từ đầu
    include: ['react', 'react-dom', 'react-router-dom']
  }
})