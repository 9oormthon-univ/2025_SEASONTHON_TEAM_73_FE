import { EmptyStatus, Header } from "@/shared/components";
import { COLORS, FONTS, SPACING } from "@/shared/styles";
import { useSubmitPostSearch } from "@/widgets/home/api";
import { RoomListItem, RoomSearchFilter } from "@/widgets/home/components";
import { useDefaultFilter } from "@/widgets/home/contexts";
import { Room } from "@/widgets/home/types";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

export default function HomeScreen() {
  const { roomFilter, userFilter, resetFilter } = useDefaultFilter();
  const [searchResults, setSearchResults] = useState<Room[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const { mutate: submitPostSearch, isPending: isSearchLoading } =
    useSubmitPostSearch();

  useEffect(() => {
    resetFilter();
  }, [resetFilter]);

  useEffect(() => {
    console.log("필터 변경 감지:", roomFilter);
    if (!isFirstRender) {
      const hasActiveFilters =
        Object.keys(roomFilter).length > 0 || userFilter !== null;

      if (hasActiveFilters) {
        const searchData = {
          ...roomFilter,
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
        console.log("필터가 비어있으므로 검색하지 않음");
        setSearchResults([]);
      }
    }
  }, [roomFilter, userFilter, submitPostSearch, isFirstRender]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const allRooms = searchResults;

  const handleLoadMore = () => {
    // TODO: 페이지네이션 구현 필요
    console.log("더 많은 데이터 로드 요청");
  };

  const renderItem: ListRenderItem<Room> = ({ item }) => (
    <RoomListItem room={item} />
  );

  const renderFooter = () => {
    if (isSearchLoading) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.black} />
        </View>
      );
    }

    return null;
  };

  const renderEmptyComponent = () => {
    if (isSearchLoading) {
      return null;
    }

    return (
      <EmptyStatus
        title="방이 없어요"
        description="조건에 맞는 방을 찾을 수 없습니다"
        icon="home-outline"
      />
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

  if (isSearchLoading && searchResults.length === 0) {
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
