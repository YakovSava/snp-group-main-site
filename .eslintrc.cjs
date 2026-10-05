module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.mjs'] } },
  },
  ignorePatterns: ['dist', 'dist-server', 'node_modules'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', mjs: 'always' }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['vite.config.js', 'tailwind.config.cjs', 'scripts/**'],
    }],
    'react/no-unknown-property': ['error', { ignore: ['hreflang', 'fetchpriority'] }],
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either', depth: 5 }],
  },
};
