import { useFetchLikedUser } from "@/widgets/home/api";
import { UserListItem } from "@/widgets/home/components";
import React from "react";
import { ScrollView } from "react-native";

export default function UsersScreen() {
  const { data } = useFetchLikedUser(0);

  const renderItem = () => {
    if (data) {
      return data.content.map((user) => (
        <UserListItem key={user.userId} {...user} />
      ));
    }
    return null;
  };

  return <ScrollView>{renderItem()}</ScrollView>;
}
