import { COLORS } from "@/shared/styles";
import { useFetchLikedUser } from "@/widgets/home/api";
import { UserListItem } from "@/widgets/home/components";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function UsersScreen() {
  const { data } = useFetchLikedUser(0);

  const renderItem = () => {
    if (data) {
      return data.content.map((user) => (
        <UserListItem key={user.userId} user={user} />
      ));
    }
    return null;
  };

  return <ScrollView style={styles.container}>{renderItem()}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
