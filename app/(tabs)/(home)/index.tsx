import { Button } from "@/shared/components";
import { COLORS, SPACING } from "@/shared/styles";
import { useFetchPostList } from "@/widgets/home/api";
import { RoomListItem, RoomSearchFilter } from "@/widgets/home/components";
import { Room } from "@/widgets/home/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchPostList();

  const onCreatePress = () => {
    router.push("/post-create");
  };

  const allRooms = data?.pages.flatMap((page) => page.content) ?? [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem: ListRenderItem<Room> = ({ item }) => (
    <RoomListItem room={item} />
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.black} />
      </View>
    );
  };

  const keyExtractor = (item: Room) => item.id.toString();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <RoomSearchFilter />
        <View style={styles.loadingContainer}>
          <RoomListItem.Skeleton />
          <RoomListItem.Skeleton />
          <RoomListItem.Skeleton />
          <RoomListItem.Skeleton />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>{/* 에러 처리는 추후 개선 */}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <RoomSearchFilter />
      <FlatList
        data={allRooms}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        style={styles.roomList}
      />

      {/* 요거는 임시로 만들어둔 글 작성하기 화면 버튼이에용! */}
      <Button
        text="글 작성하기"
        size="md"
        variant="primary"
        onPress={onCreatePress}
        style={styles.createButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  roomList: {
    flex: 1,
  },
  createButton: {
    position: "absolute",
    right: SPACING.normal,
    bottom: SPACING.md,
    zIndex: 1000,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLoader: {
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
});
