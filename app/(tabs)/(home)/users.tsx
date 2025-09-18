import { EmptyStatus } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { useFetchLikedUser } from "@/widgets/home/api";
import { UserListItem } from "@/widgets/home/components";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function UsersScreen() {
  const { type } = useLocalSearchParams();

  const { data, isLoading } = useFetchLikedUser(0);

  console.log(type);

  const renderItem = () => {
    if (type === "recommend") {
      return data.content.map((user) => (
        <RecommendUserItem key={user.id} user={user} />
      ));
    }

    if (data && data.content.length > 0) {
      return data.content.map((user) => (
        <UserListItem key={user.id} user={user} />
      ));
    }
    return null;
  };

  const renderEmptyComponent = () => {
    if (isLoading) {
      return null;
    }

    return (
      <EmptyStatus
        title="아직 찜한 사용자가 없어요"
        description="마음에 드는 사용자를 찜해보세요"
        icon="heart-outline"
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderItem()}
      {(!data || data.content.length === 0) && renderEmptyComponent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

function RecommendUserItem({ user }: { user: RecommendUser }) {}
