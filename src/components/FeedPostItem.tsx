import { View, Text, Image } from "react-native";
import React from "react";
import { Post } from "@/types/models";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePostRequest, unlikePostRequest } from "@/services/postService";
import { useAuth } from "@/providers/AuthProvider";

dayjs.extend(relativeTime);

interface FeedPostItemProps {
  post: Post;
}

export default function FeedPostItem({ post }: FeedPostItemProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: () => likePostRequest(post.id, session?.accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {},
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikePostRequest(post.id, session?.accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {},
  });

  return (
    <View className="flex-row gap-3 p-4 border-b border-b-gray-200">
      <Image
        source={{ uri: post.author.avatar }}
        className="w-12 h-12 rounded-full"
      />
      <View className="gap-2 flex-1">
        <View className="flex-row gap-1">
          <Text className="font-semibold">{post.author.name}</Text>
          <Text className="text-gray-500">{post.author.handle}</Text>
          <Text className="text-gray-500">·</Text>
          <Text className="text-gray-500">
            {dayjs(post.created_at).fromNow(true)}
          </Text>
        </View>
        <Text className="leading-5">{post.content}</Text>

        <View className="flex-row gap-5">
          <View className="flex-row items-center gap-1">
            <MaterialCommunityIcons
              name="message-outline"
              size={20}
              color="gray"
            />
            <Text className="text-gray-500">{post.replies_count}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <MaterialCommunityIcons name="repeat" size={20} color="gray" />
            <Text className="text-gray-500">{post.retweets_count}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <MaterialCommunityIcons
              name={post.is_liked ? "heart" : "heart-outline"}
              size={20}
              color={post.is_liked ? "crimson" : "gray"}
              e
              onPress={() => {
                if (post.is_liked) {
                  unlikeMutation.mutate();
                } else {
                  likeMutation.mutate();
                }
              }}
            />
            <Text className="text-gray-500">{post.likes_count}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
