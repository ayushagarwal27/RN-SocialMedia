import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostRequest } from "@/services/postService";
import { useAuth } from "@/providers/AuthProvider";

export default function NewPost() {
  const [content, setContent] = useState("");
  const { session } = useAuth();

  const queryClient = useQueryClient();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: () => createPostRequest({ content }, session?.accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setContent("");
      router.back();
    },
    onError: (error) => {
      Alert.alert("Failed to create post");
    },
  });

  return (
    <View className="flex-1 p-4">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text onPress={() => router.back()} className="text-lg">
              Cancel
            </Text>
          ),
          headerRight: () => (
            <Button
              title="Post"
              disabled={content.trim().length === 0 || isPending}
              onPress={() => createPost()}
            />
          ),
        }}
      />
      <TextInput
        placeholder="What's happening?"
        className="text-lg min-g-40"
        multiline
        value={content}
        onChangeText={setContent}
        autoFocus
      />
    </View>
  );
}
