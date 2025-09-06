import { COLORS, FONTS, SPACING } from "@/shared/styles";
import { useFetchPostList, useSubmitPostSearch } from "@/widgets/home/api";
import { RoomListItem, RoomSearchFilter } from "@/widgets/home/components";
import { useDefaultFilter } from "@/widgets/home/contexts";
import { Room } from "@/widgets/home/types";
import { SIZES } from "@/widgets/menu/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { defaultFilter } = useDefaultFilter();
  const [searchResults, setSearchResults] = useState<Room[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchPostList();

  const { mutate: submitPostSearch, isPending: isSearchLoading } =
    useSubmitPostSearch();

  useEffect(() => {
    if (!isFirstRender) {
      submitPostSearch(defaultFilter, {
        onSuccess: (data) => {
          setSearchResults(data.content);
        },
      });
    }
  }, [defaultFilter, submitPostSearch, isFirstRender]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const onCreatePress = () => {
    router.push("/post-create");
  };

  const allRooms = isFirstRender
    ? data?.pages.flatMap((page) => page.content) ?? []
    : searchResults;

  const handleLoadMore = () => {
    if (isFirstRender && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem: ListRenderItem<Room> = ({ item }) => (
    <RoomListItem room={item} />
  );

  const renderFooter = () => {
    if (isFirstRender && isFetchingNextPage) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.black} />
        </View>
      );
    }

    if (!isFirstRender && isSearchLoading) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.black} />
        </View>
      );
    }

    return null;
  };

  const renderEmptyComponent = () => {
    // 로딩 중이면 empty component를 표시하지 않음
    if (isLoading || isSearchLoading) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="home-outline"
          size={48}
          color={COLORS.gray[30]}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>방이 없어요</Text>
        <Text style={styles.emptySubText}>
          조건에 맞는 방을 찾을 수 없습니다
        </Text>
      </View>
    );
  };

  const keyExtractor = (item: Room) => item.id.toString();

  if (
    isLoading ||
    (!isFirstRender && isSearchLoading && searchResults.length === 0)
  ) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <RoomSearchFilter />
        <View
          style={[
            styles.loadingContainer,
            { paddingBottom: NAVIGATION_BOTTOM_TABS_HEIGHT + SPACING.md },
          ]}
        >
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
        <View style={styles.errorContainer}>
          <Text>방들을 받아오던 중 에러가 발생했어요.</Text>
        </View>
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
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        style={styles.roomList}
        contentContainerStyle={{
          paddingBottom: NAVIGATION_BOTTOM_TABS_HEIGHT + SPACING.md,
        }}
      />
    </SafeAreaView>
  );
}

const { NAVIGATION_BOTTOM_TABS_HEIGHT } = SIZES;

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
    bottom: NAVIGATION_BOTTOM_TABS_HEIGHT + SPACING.md,
    zIndex: 1000,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLoader: {
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  emptyContainer: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.gray[70],
    textAlign: "center",
    marginBottom: SPACING.xs,
    fontFamily: FONTS.medium,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.gray[50],
    textAlign: "center",
    fontFamily: FONTS.regular,
  },
});
