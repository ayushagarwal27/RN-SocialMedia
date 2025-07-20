import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import dummyPosts from "@/dummyPosts";
import FeedPostItem from "@/components/FeedPostItem";

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const post = dummyPosts.find((post) => post.id === Number(id));

  if (!post) {
    return <Text>No Post Found</Text>;
  }
  return <FeedPostItem post={post} />;
}
