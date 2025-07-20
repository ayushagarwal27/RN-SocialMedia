import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { router, Stack } from "expo-router";

export default function NewPost() {
  const [content, setContent] = useState("");

  const handleCreate = () => {
    router.back();
  };

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
              disabled={content.trim().length === 0}
              onPress={handleCreate}
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
