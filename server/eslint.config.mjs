import config from '@rocketseat/eslint-config/node.mjs'

export default [
  ...config,
  {
    rules: {
      '@stylistic/max-len': ['error', {
        code: 90,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: false,
      }],
      'no-undef': 'off'
    },
  },
]
