import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

export default function AuthLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (session) {
    return <Redirect href={"/"} />;
  }
  return <Slot />;
}
