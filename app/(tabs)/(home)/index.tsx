import { useAuthStore } from "@/shared/store";
import { RecommendUser, useFetchDashboard } from "@/widgets/home/api";
import {
  FavoriteUsersSection,
  Header,
  RecommendSection,
  SurveyNotification,
  UserDetailModal,
  WelcomeSection,
} from "@/widgets/home/components";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { isRoom, isPersonalitySurveyCompleted, userName } = useAuthStore();
  const { data: dashboard, isFetching } = useFetchDashboard(isRoom);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RecommendUser | null>(null);

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

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
            setIsModalVisible={setIsModalVisible}
            setSelectedUser={setSelectedUser}
          />
        )}
        <FavoriteUsersSection
          likedUsers={dashboard?.likedUsers.users}
          isFetching={isFetching}
        />
      </ScrollView>

      <UserDetailModal
        visible={isModalVisible}
        selectedUser={selectedUser}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
