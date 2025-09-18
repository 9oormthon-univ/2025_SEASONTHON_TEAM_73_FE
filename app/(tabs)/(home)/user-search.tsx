import { Header } from "@/shared/components";
import { HEADER_HEIGHT } from "@/shared/constants";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { UserProfile } from "@/shared/types";
import { useFetchAllUser } from "@/widgets/home/api";
import { useSubmitUserSearch } from "@/widgets/home/api/submitUserSearch";
import { UserListItem, UserSearchFilter } from "@/widgets/home/components";
import { useUserFilter } from "@/widgets/home/contexts/filterUserDefault";
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

export default function UserSearchScreen() {
  const { defaultFilter } = useUserFilter();
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
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
  } = useFetchAllUser();

  const { mutate: submitUserSearch, isPending: isSearchLoading } =
    useSubmitUserSearch();

  useEffect(() => {
    if (!isFirstRender) {
      if (defaultFilter && Object.keys(defaultFilter).length > 0) {
        submitUserSearch(
          { filters: defaultFilter, page: 0 },
          {
            onSuccess: (data) => {
              setSearchResults(data.content);
            },
          }
        );
      } else {
        setSearchResults(data?.pages.flatMap((page) => page.content) ?? []);
      }
    }
  }, [defaultFilter, isFirstRender, submitUserSearch, data]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const allUsers = isFirstRender
    ? data?.pages.flatMap((page) => page.content) ?? []
    : searchResults;

  const handleLoadMore = () => {
    if (isFirstRender && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem: ListRenderItem<UserProfile> = ({ item }) => (
    <UserListItem user={item} />
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
    if (isLoading) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="people-outline"
          size={48}
          color={COLORS.gray[30]}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>사용자가 없어요</Text>
        <Text style={styles.emptySubText}>
          조건에 맞는 사용자를 찾을 수 없습니다
        </Text>
      </View>
    );
  };

  const keyExtractor = (item: UserProfile) => item.id.toString();

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

  if (isLoading || isSearchLoading) {
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

  if (!isFirstRender && searchResults.length === 0) {
    return (
      <View style={styles.container}>
        <UserSearchFilter scrollY={scrollY} isHeaderVisible={isHeaderVisible} />
        {renderHeader()}

        <View style={styles.emptyContainer}>
          <Ionicons
            name="people-outline"
            size={48}
            color={COLORS.gray[30]}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>사용자가 없어요</Text>
          <Text style={styles.emptySubText}>
            조건에 맞는 사용자를 찾을 수 없습니다
          </Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <UserSearchFilter scrollY={scrollY} isHeaderVisible={isHeaderVisible} />
        {renderHeader()}
        <View style={[styles.errorContainer, { paddingTop: HEADER_HEIGHT }]}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={COLORS.gray[30]}
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>에러가 발생했어요</Text>
          <Text style={styles.errorSubText}>
            사용자들을 받아오던 중 문제가 발생했습니다
          </Text>
        </View>
      </View>
    );
  }

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
