import { EmptyStatus, Header } from "@/shared/components";
import { HEADER_HEIGHT } from "@/shared/constants";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { UserProfile } from "@/shared/types";
import { useSubmitUserSearch } from "@/widgets/home/api/submitUserSearch";
import { UserListItem, UserSearchFilter } from "@/widgets/home/components";
import { useUserFilter } from "@/widgets/home/contexts/filterUserDefault";
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

export default function UserSearchScreen() {
  const { defaultFilter, resetFilter } = useUserFilter();
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const { mutate: submitUserSearch, isPending: isSearchLoading } =
    useSubmitUserSearch();

  useEffect(() => {
    resetFilter();
  }, [resetFilter]);

  useEffect(() => {
    console.log("필터 변경 감지:", defaultFilter);
    if (!isFirstRender) {
      console.log("POST 요청으로 검색 실행:", defaultFilter || {});
      submitUserSearch(
        { filters: defaultFilter || {}, page: 0 },
        {
          onSuccess: (data) => {
            console.log("검색 결과:", data.content.length, "개");
            setSearchResults(data.content);
          },
        }
      );
    }
  }, [defaultFilter, isFirstRender, submitUserSearch]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const allUsers = searchResults;

  const handleLoadMore = () => {
    // TODO: 페이지네이션 구현 필요
    console.log("더 많은 데이터 로드 요청");
  };

  const renderItem: ListRenderItem<UserProfile> = ({ item }) => (
    <UserListItem user={item} />
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
        title="사용자가 없어요"
        description="조건에 맞는 사용자를 찾을 수 없습니다"
        icon="people-outline"
      />
    );
  };

  const keyExtractor = (item: UserProfile, index: number) =>
    `user-search-${item.id}-${index}`;

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
      <Header title="Joiner 프로필" />
    </Animated.View>
  );

  if (isSearchLoading) {
    return (
      <View style={styles.container}>
        <UserSearchFilter scrollY={scrollY} isHeaderVisible={isHeaderVisible} />
        {renderHeader()}
        <View
          style={[
            styles.loadingContainer,
            { paddingBottom: SPACING.md, paddingTop: HEADER_HEIGHT },
          ]}
        >
          <UserListItem.Skeleton />
          <UserListItem.Skeleton />
          <UserListItem.Skeleton />
          <UserListItem.Skeleton />
        </View>
      </View>
    );
  }

  if (searchResults.length === 0) {
    return (
      <View style={styles.container}>
        <UserSearchFilter scrollY={scrollY} isHeaderVisible={isHeaderVisible} />
        {renderHeader()}

        <EmptyStatus
          title="사용자가 없어요"
          description="조건에 맞는 사용자를 찾을 수 없습니다"
          icon="people-outline"
        />
      </View>
    );
  }

  // TODO: 에러 처리 구현 필요

  return (
    <View style={styles.container}>
      <UserSearchFilter scrollY={scrollY} isHeaderVisible={isHeaderVisible} />
      {renderHeader()}
      <FlatList
        data={allUsers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        style={styles.userList}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.b1,
    color: COLORS.black,
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  userList: {
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
