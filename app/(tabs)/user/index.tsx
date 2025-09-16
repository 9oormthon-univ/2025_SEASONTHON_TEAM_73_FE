import api from "@/shared/api/axios";
import { PropertyCard } from "@/shared/components/propertycard/PropertyCard";
import { useAuthStore } from "@/shared/store";
import { COLORS } from "@/shared/styles";
import { HorizontalPropertyCarousel } from "@/widgets/user/HorizontalPropertyCarousel";
import { MenuListItem } from "@/widgets/user/MenuListItem";
import { UserProfileSection } from "@/widgets/user/UserProfileSection";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export const MyPageScreen: React.FC = () => {
  const { logout } = useAuthStore();
  const [user, setUser] = useState<any>([]);

  const fetchUser = async () => {
    try {
      const res = await api.get("/profile/me");
      if (res.data.success) {
        if (res.data.data.gender === "남") res.data.data.gender = "남성";
        else res.data.data.gender = "여성";
        setUser(res.data.data);
      }
    } catch (error) {
      console.error("프로필 가져오는데 문제가 발생했습니다", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );
  console.log(user);

  const handleEditProfile = () => {
    router.push("/profileEdit" as any);
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
        avatarUri={user.userProfileImage}
        onEditProfile={handleEditProfile}
        onMyPersonality={handleMyPersonality}
      />

      {/* 유저가 작성한 글이 없을 때 */}
      {user.posts?.length > 0 ? (
      <HorizontalPropertyCarousel posts={user.posts} nickname={user.nickname} />
      ) : (
        <PropertyCard name="작성한 글이 없습니다." />
      )}

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
