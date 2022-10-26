module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          // define aliases to shorten the import paths
          store: './src/store',
          screens: './src/screens',

          onboard: './src/screens/onboard',
          books: './src/screens/books',
          changePassword: './src/screens/changePassword',
          courses: './src/screens/courses',
          dashboard: './src/screens/dashboard',
          favorite: './src/screens/favorite',
          notification: './src/screens/notification',
          translate: './src/screens/translate',

          features: './src/features',
          assets: './src/assets',
          utils: './src/utils',
          theme: './src/theme',
          api: './src/store/api',

          hooks: './src/hooks',
          config: './src/config',
        },
        extensions: ['.js', '.jsx', '.tsx', 'ts', '.ios.js', '.android.js'],
      },
    ],
  ],
}
