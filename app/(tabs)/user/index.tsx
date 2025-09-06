import api from "@/shared/api/axios";
import { useAuthStore } from "@/shared/store";
import { COLORS } from "@/shared/styles";
import { MenuListItem } from "@/widgets/user/MenuListItem";
import { UserProfileSection } from "@/widgets/user/UserProfileSection";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export const MyPageScreen: React.FC = () => {
  const { logout } = useAuthStore();
  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/profile/me");
        if (res.data.success) {
          if (res.data.data.gender === "MALE") {
            res.data.data.gender = "남성";
          } else {
            res.data.data.gender = "여성";
          }
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("프로필 가져오는데 문제가 발생했습니다", error);
      }
    };

    getUser();
  }, []);
  //console.log(user);

  const handleEditProfile = () => {
    console.log("Edit profile pressed");
  };

  const handleMyPersonality = () => {
    console.log("My personality pressed");
    router.push("/user/profile");
  };

  const handleTwoFactorAuth = () => {
    console.log("Two factor auth pressed");
    router.push("/user/verify");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account pressed");
  };

  const handleCustomerSupport = () => {
    console.log("Customer support pressed");
  };

  const handleTermsOfService = () => {
    console.log("Terms of service pressed");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <UserProfileSection
        name={user.nickname}
        gender={user.gender}
        age={user.age}
        description={user.introduce}
        avatarUri="https://api.builder.io/api/v1/image/assets/TEMP/6bbcfd6c72685e98e894256a944ad514466dd509?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
        onEditProfile={handleEditProfile}
        onMyPersonality={handleMyPersonality}
      />

      <MenuListItem title="2단계 인증" onPress={handleTwoFactorAuth} />
      <MenuListItem title="로그아웃" onPress={() => logout()} />
      <MenuListItem title="탈퇴하기" onPress={handleDeleteAccount} />
      <MenuListItem title="고객 지원" onPress={handleCustomerSupport} />
      <MenuListItem title="이용 약관" onPress={handleTermsOfService} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default MyPageScreen;
