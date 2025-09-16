import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    KAKAO_MAP_JS_KEY: process.env.KAKAO_MAP_JS_KEY,
    WS_BASE_URL: process.env.WS_BASE_URL,
  },
  plugins: [],
});
