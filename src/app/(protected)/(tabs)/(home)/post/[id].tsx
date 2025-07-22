import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import dummyPosts from "@/dummyPosts";
import FeedPostItem from "@/components/FeedPostItem";
import { fetchPost } from "@/services/postService";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { session } = useAuth();

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id, session?.accessToken),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!post) {
    return <Text>No Post Found</Text>;
  }
  return <FeedPostItem post={post} />;
}
