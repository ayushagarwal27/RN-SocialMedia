export default {
  expo: {
    name: "SocialMedia",
    slug: "SocialMedia",
    scheme: "ayush-socilamedia",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.ayush-react.SocialMedia",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
      output: "server",
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "http://localhost:8081",
        },
      ],
      "expo-secure-store",
    ],
  },
};
