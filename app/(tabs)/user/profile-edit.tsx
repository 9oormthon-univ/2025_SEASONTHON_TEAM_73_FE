import api from '@/shared/api/axios';
import { COLORS } from '@/shared/styles';
import { ProfileForm } from '@/widgets/profile-edit/ProfileForm';
import { ProfileHeader } from '@/widgets/profile-edit/ProfileHeader';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export const ProfileEditScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get('/profile/me');
        if (res.data.success) {
          const data = res.data.data;
          if (data.gender === '남') data.gender = '남성';
          else data.gender = '여성';
          setUser(data);
          setProfileImage(data.userProfileImage || null);
        }
      } catch (error) {
        console.error('프로필 가져오는데 문제가 발생했습니다', error);
      }
    };

    getUser();
  }, []);

  if (!user) return null;

  // 이미지 선택
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setProfileImage(uri);
      }
    } catch (error) {
      console.error('이미지 선택 중 오류 발생', error);
    }
  };

  // S3 업로드
  const uploadProfileImage = async (uri: string) => {
    try {
      const filename = uri.split('/').pop()!;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';

      const formData = new FormData();
      formData.append('file', { uri, name: filename, type } as any);

      const res = await api.post('/s3/upload/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        return res.data.data.fileUrl;
      } else {
        throw new Error('S3 업로드 실패');
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류', error);
      return null;
    }
  };

  // 폼 제출
  const handleSubmit = async (form: { nickname: string; age: string; introduce: string }) => {
    try {
      let uploadedImageUrl = profileImage;

      // 새로운 이미지가 선택되었으면 S3 업로드
      if (profileImage && profileImage !== user.profileImage) {
        const url = await uploadProfileImage(profileImage);
        if (url) uploadedImageUrl = url;
      }

      const res = await api.patch('/profile', { ...form, profileImage: uploadedImageUrl });

      if (res.data.success) {
        Alert.alert('성공적으로 업데이트되었습니다.');
        router.push('(tabs)/user' as any);
        setUser({ ...user, ...form, profileImage: uploadedImageUrl });
      }
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생', error);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileHeader profileImage={profileImage} onPressImage={pickImage} />
      <ProfileForm user={user} onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 371,
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontFamily: 'SUIT',
    backgroundColor: COLORS.white,
  },
});

export default ProfileEditScreen;
