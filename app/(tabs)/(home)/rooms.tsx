import { Header } from "@/shared/components";
import { COLORS, FONTS, SPACING } from "@/shared/styles";
import { useFetchPostList, useSubmitPostSearch } from "@/widgets/home/api";
import { RoomListItem, RoomSearchFilter } from "@/widgets/home/components";
import { FILTER_DEFAULT } from "@/widgets/home/constants";
import { useDefaultFilter } from "@/widgets/home/contexts";
import { Room } from "@/widgets/home/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const { defaultFilter, userFilter, resetFilter } = useDefaultFilter();
  const [searchResults, setSearchResults] = useState<Room[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

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
    resetFilter();
  }, [resetFilter]);

  useEffect(() => {
    console.log("필터 변경 감지:", defaultFilter);
    if (!isFirstRender) {
      const isFilterChanged =
        JSON.stringify(defaultFilter) !== JSON.stringify(FILTER_DEFAULT);

      if (isFilterChanged) {
        const searchData = {
          ...defaultFilter,
          userFilter: userFilter,
        };
        console.log("POST 요청으로 검색 실행:", searchData);
        submitPostSearch(searchData, {
          onSuccess: (data) => {
            console.log("검색 결과:", data.content.length, "개");
            setSearchResults(data.content);
          },
        });
      } else {
        console.log("필터가 기본값이므로 검색하지 않음");
        setSearchResults([]);
      }
    }
  }, [defaultFilter, userFilter, submitPostSearch, isFirstRender]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  // 필터가 기본값인지 확인
  const isDefaultFilter =
    JSON.stringify(defaultFilter) === JSON.stringify(FILTER_DEFAULT);

  const allRooms =
    isFirstRender || isDefaultFilter
      ? data?.pages.flatMap((page) => page.content) ?? []
      : searchResults;

  const handleLoadMore = () => {
    if (
      (isFirstRender || isDefaultFilter) &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // TODO: 필터 검색 결과에 대한 페이지네이션 구현 필요
  };

  const renderItem: ListRenderItem<Room> = ({ item }) => (
    <RoomListItem room={item} />
  );

  const renderFooter = () => {
    if ((isFirstRender || isDefaultFilter) && isFetchingNextPage) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.black} />
        </View>
      );
    }

    if (!isDefaultFilter && isSearchLoading) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.black} />
        </View>
      );
    }

    return null;
  };

  const renderEmptyComponent = () => {
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollThreshold = 50;

    if (
      currentScrollY > lastScrollY.current &&
      currentScrollY > scrollThreshold
    ) {
      setIsHeaderVisible(false);
    } else if (
      currentScrollY < lastScrollY.current ||
      currentScrollY <= scrollThreshold
    ) {
      setIsHeaderVisible(true);
    }

    lastScrollY.current = currentScrollY;
    scrollY.setValue(currentScrollY);
  };

  const renderHeader = () => (
    <Animated.View
      style={[
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 80],
                outputRange: [0, -80],
                extrapolate: "clamp",
              }),
            },
          ],
          opacity: scrollY.interpolate({
            inputRange: [0, 40],
            outputRange: [1, 0],
            extrapolate: "clamp",
          }),
        },
      ]}
    >
      <Header title="Sharer 게시글" />
    </Animated.View>
  );

  if (
    isLoading ||
    (!isDefaultFilter && isSearchLoading && searchResults.length === 0)
  ) {
    return (
      <View style={styles.container}>
        <RoomSearchFilter scrollY={scrollY} isHeaderVisible={isHeaderVisible} />
        {renderHeader()}
        <View
          style={[
            styles.loadingContainer,
            { paddingBottom: SPACING.md, paddingTop: 60 },
          ]}
        >
          <RoomListItem.Skeleton />
          <RoomListItem.Skeleton />
          <RoomListItem.Skeleton />
          <RoomListItem.Skeleton />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <RoomSearchFilter scrollY={scrollY} isHeaderVisible={isHeaderVisible} />
        {renderHeader()}
        <View style={[styles.errorContainer, { paddingTop: 60 }]}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={COLORS.gray[30]}
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>에러가 발생했어요</Text>
          <Text style={styles.errorSubText}>
            방들을 받아오던 중 문제가 발생했습니다
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RoomSearchFilter scrollY={scrollY} isHeaderVisible={isHeaderVisible} />
      {renderHeader()}
      <FlatList
        data={allRooms}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        style={styles.roomList}
        contentContainerStyle={{ paddingTop: 74 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  roomList: {
    flex: 1,
  },
  createButton: {
    position: "absolute",
    right: SPACING.normal,
    zIndex: 1000,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "flex-start",
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
  errorIcon: {
    marginBottom: SPACING.xs,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.gray[70],
    textAlign: "center",
    marginBottom: SPACING.xs,
    fontFamily: FONTS.medium,
  },
  errorSubText: {
    fontSize: 14,
    color: COLORS.gray[50],
    textAlign: "center",
    fontFamily: FONTS.regular,
  },
  logo: {
    width: 44,
    height: 30,
  },
});
