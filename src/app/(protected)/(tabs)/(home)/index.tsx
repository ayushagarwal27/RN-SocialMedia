import React from "react";
import FeedPostItem from "@/components/FeedPostItem";
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { fetchPosts } from "@/services/postService";

export default function FeedScreen() {
  const { session } = useAuth();

  const {
    data: posts,
    error,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(session?.accessToken),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return (
            <Link href={`/post/${item.id}`}>
              <FeedPostItem post={item} />
            </Link>
          );
        }}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
      <Link href="/new" asChild>
        <Pressable className="absolute right-5 bottom-5 bg-[#007AFF] rounded-full w-[60px] h-[60px] items-center justify-center shadow-lg">
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </Link>
    </>
  );
}
