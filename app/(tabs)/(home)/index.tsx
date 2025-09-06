import { Button } from "@/shared/components";
import { COLORS, SPACING } from "@/shared/styles";
import { useFetchPostList, useSubmitPostSearch } from "@/widgets/home/api";
import { RoomListItem, RoomSearchFilter } from "@/widgets/home/components";
import { useDefaultFilter } from "@/widgets/home/contexts";
import { Room } from "@/widgets/home/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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
  const { defaultFilter, applied } = useDefaultFilter();
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
    if (applied && !isFirstRender) {
      submitPostSearch(defaultFilter, {
        onSuccess: (data) => {
          setSearchResults(data.content);
        },
      });
    }
  }, [applied, defaultFilter, submitPostSearch, isFirstRender]);

  useEffect(() => {
    if (applied && isFirstRender) {
      setIsFirstRender(false);
    }
  }, [applied, isFirstRender]);

  const onCreatePress = () => {
    router.push("/post-create");
  };

  // 첫 렌더링이거나 아직 필터를 적용하지 않았으면 useFetchPostList 데이터 사용
  // 필터를 적용했으면 검색 결과 사용
  const allRooms =
    !applied || isFirstRender
      ? data?.pages.flatMap((page) => page.content) ?? []
      : searchResults;

  const handleLoadMore = () => {
    // 첫 렌더링이거나 필터가 적용되지 않은 경우에만 페이지네이션 동작
    if ((!applied || isFirstRender) && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem: ListRenderItem<Room> = ({ item }) => (
    <RoomListItem room={item} />
  );

  const renderFooter = () => {
    // 첫 렌더링이거나 필터가 적용되지 않은 경우에만 페이지네이션 로더 표시
    if ((!applied || isFirstRender) && isFetchingNextPage) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.black} />
        </View>
      );
    }

    // 검색 중일 때 로더 표시
    if (applied && !isFirstRender && isSearchLoading) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.black} />
        </View>
      );
    }

    return null;
  };

  const keyExtractor = (item: Room) => item.id.toString();

  // 첫 로딩이거나 검색 로딩 중일 때 스켈레톤 표시
  if (
    isLoading ||
    (applied && !isFirstRender && isSearchLoading && searchResults.length === 0)
  ) {
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
