import api from '@/shared/api/axios';
import { COLORS } from '@/shared/styles';
import { ProfileForm } from '@/widgets/profile-edit/ProfileForm';
import { ProfileHeader } from '@/widgets/profile-edit/ProfileHeader';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export const ProfileEditScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 유저 정보 가져오기
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/profile/me");
        if (res.data.success) {
          if (res.data.data.gender === "남") {
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

  if (!user) return null;

  // 이미지 선택
  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("사진 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // 폼 제출
  const handleSubmit = async (form: { nickname: string; age: string; introduce: string }) => {
    try {
      const formData = new FormData();
      formData.append('nickname', form.nickname);
      formData.append('age', form.age);
      formData.append('introduce', form.introduce);

      if (profileImage) {
        const filename = profileImage.split('/').pop()!;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';
        formData.append('profileImage', { uri: profileImage, name: filename, type } as any);
      }

      const res = await api.patch('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        Alert.alert("프로필이 성공적으로 업데이트되었습니다.");
        // 업데이트 후 유저 정보 재갱신
        setUser({ ...user, ...form });
        if (profileImage) setUser((prev: any) => ({ ...prev, profileImage }));
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        profileImage={profileImage || user.profileImage}
        onPressImage={handlePickImage}
      />
      <ProfileForm user={user} onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: COLORS.white,
  },
});

export default ProfileEditScreen;
