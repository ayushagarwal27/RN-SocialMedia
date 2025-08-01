import "../../global.css";
import { Slot } from "expo-router";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { AuthProvider } from "@/providers/AuthProvider";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { AppState, AppStateStatus, Platform } from "react-native";
import { useEffect } from "react";
import NotificationsProvider from "@/providers/Notifications";

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const CustomTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "white", primary: "#0A0A0A" },
};

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  function onAppStateChange(status: AppStateStatus) {
    console.log(status);

    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationsProvider>
          <ThemeProvider value={CustomTheme}>
            <Slot />
          </ThemeProvider>
        </NotificationsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
