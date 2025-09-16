import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

function WelcomeSection() {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>
        🧍 함께 살 룸메이트를 찾고 있나요?{"\n"}당신의 공간을 나눠보세요.
      </Text>
      <View style={styles.actionCards}>
        <ActionCard
          image={require("@/assets/images/home-home.png")}
          title={`Sharer의${"\n"}집 보러가기`}
        />
        <ActionCard
          image={require("@/assets/images/home-people.png")}
          title={`Joiner의${"\n"}프로필 보러가기`}
        />
      </View>
    </View>
  );
}

function ActionCard({ image, title }: { image: any; title: string }) {
  return (
    <TouchableOpacity style={styles.actionCard}>
      <Image source={image} style={styles.actionCardImage} />
      <Text style={styles.actionCardText}>{title}</Text>
    </TouchableOpacity>
  );
}

// 성향조사 알림 컴포넌트
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

function FavoriteUsersSection() {
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
        <UserListItem name="이재민" like info="남성,25세,흡연" />
        <UserListItem name="이재민" info="남성,25세,흡연" />
        <UserListItem name="이재민" like info="남성,25세,흡연" />
        <UserListItem name="이재민" info="남성,25세,흡연" />
      </View>
    </View>
  );
}

function UserListItem({
  name,
  info,
  like = false,
}: {
  name: string;
  info: string;
  like?: boolean;
}) {
  return (
    <View
      style={{
        paddingHorizontal: SPACING.normal,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray[10],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <Image
          style={{ width: 48, height: 48 }}
          source={require("@/assets/images/profile-default.png")}
        />
        <View style={{ height: 44, justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: FONT_SIZE.b1,
              lineHeight: 24,
              fontFamily: FONTS.bold,
              color: COLORS.black,
            }}
          >
            {name}
          </Text>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {info.split(",").map((item, index) => (
              <>
                <Text
                  key={index}
                  style={{
                    fontSize: FONT_SIZE.c1,
                    fontFamily: FONTS.regular,
                    color: COLORS.gray[50],
                  }}
                >
                  {item}
                </Text>
                {index !== info.split(",").length - 1 && (
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
              </>
            ))}
          </View>
        </View>
      </View>
      <Ionicons
        name={like ? "heart" : "heart-outline"}
        size={24}
        color={COLORS.primary[90]}
      />
    </View>
  );
}

export default function HomeScreen() {
  return (
    <>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <WelcomeSection />
        <SurveyNotification />
        <FavoriteUsersSection />
      </ScrollView>
    </>
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

  // 성향조사 알림 스타일
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

  // 찜한 사용자 섹션 스타일
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
});
