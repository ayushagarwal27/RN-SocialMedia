import React from "react";
import FeedPostItem from "@/components/FeedPostItem";
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { fetchPosts } from "@/services/postService";
import { useIsFocused } from "@react-navigation/native";

export default function FeedScreen() {
  const { session } = useAuth();
  // const isFocused = useIsFocused();

  const {
    data,
    error,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam, session?.accessToken),
    initialPageParam: { limit: 20, cursor: undefined },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }

      return { limit: 3, cursor: lastPage[lastPage.length - 1].id };
    },
    // subscribed: isFocused,
  });

  // useRefreshOnFocus(refetch);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const posts = data?.pages.flat() || [];

  return (
    <>
      <FlatList
        data={posts}
        contentContainerClassName="max-w-lg w-full mx-auto"
        renderItem={({ item }) => {
          return (
            <Link href={`/post/${item.id}`}>
              <FeedPostItem post={item} />
            </Link>
          );
        }}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReachedThreshold={2}
        onEndReached={() =>
          !isFetchingNextPage && hasNextPage && fetchNextPage()
        }
        ListFooterComponent={() => isFetchingNextPage && <ActivityIndicator />}
      />
      <Link href="/new" asChild>
        <Pressable className="absolute right-5 bottom-5 bg-[#007AFF] rounded-full w-[60px] h-[60px] items-center justify-center shadow-lg">
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </Link>
    </>
  );
}
