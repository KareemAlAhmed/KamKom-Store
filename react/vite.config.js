import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteReact from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  //   new viteReact.ProvidePlugin({
  //     $: "jquery",
  //     'window.jQuery': "jquery",
  //     jQuery: "jquery"
  //  })
  ],
})
