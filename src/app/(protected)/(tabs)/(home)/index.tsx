import React, { useEffect, useState } from "react";
import FeedPostItem from "@/components/FeedPostItem";
import { FlatList, Pressable } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Post } from "@/types/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: HelloWorld,
  });

  async function HelloWorld() {
    return "hello";
  }

  console.log({ data, error });

  async function fetchPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

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
      />
      <Link href="/new" asChild>
        <Pressable className="absolute right-5 bottom-5 bg-[#007AFF] rounded-full w-[60px] h-[60px] items-center justify-center shadow-lg">
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </Link>
    </>
  );
}
