import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
