import { Button } from "@/shared/components";
import { useAuthStore } from "@/shared/store";
import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import type { UserProfile } from "@/shared/types";
import { RecommendUser, useFetchDashboard } from "@/widgets/home/api";
import { UserListItem } from "@/widgets/home/components";
import { getRoomText } from "@/widgets/home/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { isRoom, isPersonalitySurveyCompleted, userName } = useAuthStore();
  const { data: dashboard, isFetching } = useFetchDashboard(isRoom);

  return (
    <>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <WelcomeSection isRoom={isRoom} />
        {!isPersonalitySurveyCompleted && (
          <>
            <SurveyNotification />
          </>
        )}
        {isPersonalitySurveyCompleted && (
          <RecommendSection
            isRoom={isRoom}
            userName={userName}
            recommendedUsers={dashboard?.recommendedUsers.users}
            isFetching={isFetching}
          />
        )}
        <FavoriteUsersSection
          likedUsers={dashboard?.likedUsers.users}
          isFetching={isFetching}
        />
      </ScrollView>
    </>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Image source={require("@/assets/icons/logo.png")} style={styles.logo} />
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={() => router.push("/post-create")}>
          <Ionicons name="add-outline" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function WelcomeSection({ isRoom }: { isRoom: boolean }) {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>{getRoomText(isRoom)}</Text>
      <View style={styles.actionCards}>
        <ActionCard
          onPress={() => router.push("/rooms")}
          image={require("@/assets/images/home-home.png")}
          title={`Sharer의${"\n"}집 보러가기`}
        />
        <ActionCard
          onPress={() => router.push("/user-search")}
          image={require("@/assets/images/home-people.png")}
          title={`Joiner의${"\n"}프로필 보러가기`}
        />
      </View>
    </View>
  );
}

function ActionCard({
  image,
  title,
  onPress,
}: {
  image: any;
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <Image source={image} style={styles.actionCardImage} />
      <Text style={styles.actionCardText}>{title}</Text>
    </TouchableOpacity>
  );
}

function SurveyNotification() {
  return (
    <View style={styles.surveyContainer}>
      <Text style={styles.surveyTitle}>아직 성향조사를 하지 않으셨네요.</Text>
      <View style={styles.surveyContent}>
        <Text style={styles.surveyDescription}>
          성향조사를 완료해야 룸메이트 매칭을 할 수 있어요.
        </Text>
        <TouchableOpacity style={styles.surveyButton}>
          <Text style={styles.surveyButtonText}>성향조사 바로가기</Text>
          <Ionicons name="arrow-forward" size={12} color={COLORS.primary[90]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FavoriteUsersSection({
  likedUsers,
  isFetching,
}: {
  likedUsers?: UserProfile[];
  isFetching: boolean;
}) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>내가 찜한 사용자</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => router.push("/users")}
        >
          <Text style={styles.moreButtonText}>더보기</Text>
          <Ionicons
            name="chevron-forward"
            size={12}
            color={COLORS.gray[40]}
            style={styles.moreButtonIcon}
          />
        </TouchableOpacity>
      </View>
      <View>
        {isFetching ? (
          <UserListItem.Skeleton />
        ) : likedUsers && likedUsers.length > 0 ? (
          likedUsers.map((user, index) => (
            <UserListItem key={`user-${user.id}-${index}`} user={user} />
          ))
        ) : (
          <EmptyFavoriteUsersState />
        )}
      </View>
    </View>
  );
}

function RecommendSection({
  isRoom,
  userName,
  recommendedUsers,
  isFetching,
}: {
  isRoom: boolean;
  userName: string;
  recommendedUsers?: RecommendUser[];
  isFetching: boolean;
}) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            추천 {isRoom ? "Joiner" : "Sharer"}
          </Text>
          <Text style={styles.sectionDescription}>
            {userName}님과 잘 맞을 것 같은 {isRoom ? "Joiner" : "Sharer"}를
            찾아왔어요.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => router.push("/users")}
        >
          <Text style={styles.moreButtonText}>더보기</Text>
          <Ionicons
            name="chevron-forward"
            size={12}
            color={COLORS.gray[40]}
            style={styles.moreButtonIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.userProfileCardWrapper}
        contentContainerStyle={{ gap: 16 }}
      >
        {isFetching ? (
          <UserListItem.Skeleton />
        ) : recommendedUsers && recommendedUsers.length > 0 ? (
          recommendedUsers.map((user) => (
            <UserProfileCard key={user.userId} {...user} />
          ))
        ) : (
          <EmptyRecommendUsersState isRoom={isRoom} />
        )}
      </ScrollView>
    </View>
  );
}

function UserProfileCard({
  nickname,
  profileImageUrl,
  matchScore,
  gender,
  age,
  smoking,
}: RecommendUser) {
  return (
    <View style={styles.userProfileCard}>
      <Text style={styles.userProfileCardTitle}>
        나와 {matchScore}% 잘 맞아요!
      </Text>
      <View style={styles.userProfileInfoWrapper}>
        <Image
          source={{ uri: profileImageUrl }}
          style={styles.userProfileCardImage}
        />
        <View>
          <Text style={styles.userProfileCardName}>{nickname}</Text>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {[gender, age, smoking].map((item, index) => (
              <React.Fragment key={index + item.toString()}>
                <Text
                  style={{
                    fontSize: FONT_SIZE.c1,
                    fontFamily: FONTS.regular,
                    color: COLORS.gray[50],
                  }}
                >
                  {item}
                </Text>
                {index !== [gender, age, smoking].length - 1 && (
                  <View style={{ justifyContent: "center" }}>
                    <View
                      style={{
                        width: 3,
                        height: 3,
                        backgroundColor: COLORS.gray[50],
                        borderRadius: 100,
                      }}
                    />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function EmptyRecommendUsersState({ isRoom }: { isRoom: boolean }) {
  return (
    <View style={styles.emptyRecommendContainer}>
      <Ionicons name="people-outline" size={48} color={COLORS.gray[30]} />
      <Text style={styles.emptyStateTitle}>
        아직 추천 {isRoom ? "Joiner" : "Sharer"}가 없어요
      </Text>
      <Text style={styles.emptyStateDescription}>
        성향조사를 완료하면 맞춤 추천을 받을 수 있어요
      </Text>
      <Button
        size="md"
        text="사용자 둘러보기"
        onPress={() => router.push("/user-search")}
      />
    </View>
  );
}

function EmptyFavoriteUsersState() {
  return (
    <View style={styles.emptyStateContainer}>
      <Ionicons name="heart-outline" size={48} color={COLORS.gray[30]} />
      <Text style={styles.emptyStateTitle}>아직 찜한 사용자가 없어요</Text>
      <Text style={styles.emptyStateDescription}>
        마음에 드는 룸메이트를 찾아서 찜해보세요
      </Text>
      <Button
        size="md"
        text="사용자 둘러보기"
        onPress={() => router.push("/user-search")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  logo: {
    width: 44,
    height: 30,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },

  scrollView: {
    flex: 1,
  },

  welcomeContainer: {
    paddingHorizontal: SPACING.normal,
    paddingTop: SPACING.lg,
  },
  welcomeTitle: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: FONTS.semiBold,
    color: "#17171b",
    textAlign: "left",
    marginBottom: SPACING.lg,
  },
  actionCards: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    borderColor: COLORS.gray[40],
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
  },
  actionCardImage: {
    width: 81,
    height: 70,
  },
  actionCardText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  surveyContainer: {
    paddingVertical: 10,
    paddingHorizontal: SPACING.normal,
    backgroundColor: COLORS.primary[10],
    marginBottom: 20,
  },
  surveyTitle: {
    width: "100%",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "left",
  },
  surveyContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  surveyDescription: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "SUIT Variable",
    color: "#5b5b5e",
    textAlign: "left",
  },
  surveyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  surveyButtonText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary[90],
  },

  favoriteContainer: {
    paddingHorizontal: SPACING.normal,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.normal,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.b1,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: "#17171b",
    textAlign: "left",
  },
  sectionDescription: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONTS.regular,
    color: COLORS.gray[50],
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreButtonText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONTS.medium,
    color: COLORS.gray[40],
  },
  moreButtonIcon: {
    marginTop: 2,
  },
  userProfileCardWrapper: {
    paddingHorizontal: SPACING.normal,
  },
  userProfileCard: {
    alignSelf: "flex-start",
    padding: 20,
    borderRadius: RADIUS.xs,
    gap: 17,
    borderWidth: 1,
    borderColor: COLORS.gray[10],
    shadowColor: "#00000033",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userProfileCardTitle: {
    color: COLORS.primary[90],
    fontSize: FONT_SIZE.b1,
    fontFamily: FONTS.bold,
  },
  userProfileInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  userProfileCardImage: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
  userProfileCardName: {
    fontSize: FONT_SIZE.b2,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "left",
  },
  userProfileCardDes: {
    color: COLORS.gray[50],
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
  },
  recommendSkeletonContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.normal,
  },

  // 빈 상태 스타일
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.normal,
  },
  emptyRecommendContainer: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.normal,
  },
  emptyStateTitle: {
    fontSize: FONT_SIZE.b1,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  emptyStateDescription: {
    fontSize: FONT_SIZE.c1,
    lineHeight: 18,
    fontFamily: FONTS.regular,
    color: COLORS.gray[50],
    textAlign: "center",
    marginBottom: SPACING.md,
  },
});
