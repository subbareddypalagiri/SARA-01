/**
 * Vite Configuration for Selective Regenerate AI
 * 
 * CSP Compliance:
 * - Disables sourcemap to avoid 'unsafe-eval' violations
 * - Disables HMR plugins that inject eval statements
 * - No inline eval or code generation at runtime
 */

export default {
  build: {
    // Disable sourcemaps to prevent 'unsafe-eval' CSP violation
    sourcemap: false,
    
    // Rollup options for the build
    rollupOptions: {
      output: {
        // No eval-based bundling
        format: 'iife',
        indent: false,
        // Prevent inline scripts
        inlineDynamicImports: false
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove eval calls if any
        pure_funcs: ['eval']
      },
      output: {
        // Don't format comments containing eval
        comments: 'some'
      }
    }
  },

  server: {
    // Disable HMR (Hot Module Replacement) which can inject eval
    hmr: false,
    
    // Disable watch mode in development
    watch: null
  },

  // Ensure no dynamic imports that require eval
  resolve: {
    // No special dynamic import handling
    preserveSymlinks: true
  },

  // Dev server plugins - keep minimal
  plugins: []
};
