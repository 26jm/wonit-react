import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']), // 테스트를 제외할 경로
  {
    files: ['**/*.{js,jsx}'], //테스트를 실행할 경로
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])

//eslint로 자바스크립트와 리액트 훅, 리액트 리프레시 관련 규칙을 적용합니다. 정적분석하게 된다.
//