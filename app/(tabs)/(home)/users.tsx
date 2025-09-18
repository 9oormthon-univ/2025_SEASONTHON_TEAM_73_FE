import { EmptyStatus } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { useFetchLikedUser } from "@/widgets/home/api";
import {
  RecommendUser,
  useSubmitRecommendUser,
} from "@/widgets/home/api/submitRecommendUser";
import { RecommendUserItem, UserListItem } from "@/widgets/home/components";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function UsersScreen() {
  const { type } = useLocalSearchParams();
  const { data, isLoading } = useFetchLikedUser(0);
  const [recommendData, setRecommendData] = useState<RecommendUser[]>([]);

  const { mutate: submitRecommendUser, isPending: isRecommendLoading } =
    useSubmitRecommendUser();

  useEffect(() => {
    if (type === "recommend") {
      submitRecommendUser(undefined, {
        onSuccess: (data) => {
          setRecommendData(data);
        },
      });
    }
  }, [type, submitRecommendUser]);

  const renderItem = () => {
    if (type === "recommend") {
      if (isRecommendLoading) {
        return <Text>추천 사용자를 불러오는 중...</Text>;
      }

      if (recommendData.length > 0) {
        return recommendData.map((recommendUser) => (
          <RecommendUserItem
            key={recommendUser.user.id}
            recommendUser={recommendUser}
          />
        ));
      }
    }

    if (data && data.content.length > 0) {
      return data.content.map((user) => (
        <UserListItem key={user.id} user={user} />
      ));
    }
    return null;
  };

  const renderEmptyComponent = () => {
    if (isLoading || isRecommendLoading) {
      return null;
    }

    if (type === "recommend") {
      return (
        <EmptyStatus
          title="추천할 사용자가 없어요"
          description="조건에 맞는 사용자를 찾을 수 없습니다"
          icon="people-outline"
        />
      );
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
      {((type === "recommend" && recommendData.length === 0) ||
        (type !== "recommend" && (!data || data.content.length === 0))) &&
        renderEmptyComponent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
