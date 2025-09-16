import api from '@/shared/api/axios';
import { Button } from '@/shared/components';
import { useProfileStore } from '@/shared/store/profileStore';
import { FormField } from '@/widgets/profile-edit/FormField';
import { ProfileHeader } from '@/widgets/profile-edit/ProfileHeader';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export const ProfileEditScreen: React.FC = () => {
  const { profile, updateProfile, updateProfileImage, fetchProfile } = useProfileStore();
  const [form, setForm] = useState({
    nickname: profile?.nickname || '',
    age: profile?.age.toString() || '',
    introduce: profile?.introduce || '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    setForm({
      nickname: profile?.nickname || '',
      age: profile?.age.toString() || '',
      introduce: profile?.introduce || '',
    });
  }, [profile]);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      await updateProfileImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await api.patch('/profile', form);
      if (res.data.success) {
        updateProfile({ ...form, age: Number(form.age) });
        Alert.alert('프로필이 성공적으로 업데이트되었습니다.');
        router.push('/user' as any);
      }
    } catch (err) {
      console.error('프로필 업데이트 실패', err);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileHeader profileImage={profile?.profileImage} onPressImage={handlePickImage} />

      <FormField label="닉네임" value={form.nickname} onChangeText={text => handleChange('nickname', text)} />
      <FormField label="나이" value={form.age} onChangeText={text => handleChange('age', text)} />
      <FormField label="자기소개" value={form.introduce} onChangeText={text => handleChange('introduce', text)} multiline />

      <Button text="저장" onPress={handleSubmit} style={{ marginTop: 20, width: '100%' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});

export default ProfileEditScreen;
