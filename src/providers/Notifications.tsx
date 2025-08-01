import { createContext, PropsWithChildren, useEffect, useState } from "react";
import * as Notification from "expo-notifications";
import { Alert, Platform } from "react-native";

type NotificationsContextType = {};

const NotificationsContext = createContext<NotificationsContextType>({});

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationsProvider({ children }: PropsWithChildren) {
  const [permissions, setPermissions] =
    useState<Notification.PermissionStatus | null>(null);

  const ensurePermissions = async () => {
    if (Platform.OS === "android") {
      Notification.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notification.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const existingPermissions = await Notification.getPermissionsAsync();

    if (existingPermissions.status === "granted") {
      setPermissions(existingPermissions.status);
      return;
    }

    if (!existingPermissions.canAskAgain) {
      Alert.alert(
        "Enable permissions",
        "Please go to settings and enable push notifications"
      );
    }

    const newPermissions = await Notification.requestPermissionsAsync();
    setPermissions(newPermissions.status);
  };

  useEffect(() => {
    ensurePermissions();
  }, []);

  function scheduleNotification(
    title: string,
    body: string,
    trigger: Notification.NotificationTriggerInput = null
  ) {
    Notification.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger,
    });
  }

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
}
