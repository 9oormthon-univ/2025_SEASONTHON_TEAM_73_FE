module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // .env 파일 읽기용
      ["module:react-native-dotenv", {
        "moduleName": "@env",   // import { API_URL } from '@env'
        "path": ".env",         // 기본 경로
        "safe": false,
        "allowUndefined": true
      }],
      // expo-router & react-native-reanimated 에 필요
      "react-native-reanimated/plugin"
    ]
  };
};
