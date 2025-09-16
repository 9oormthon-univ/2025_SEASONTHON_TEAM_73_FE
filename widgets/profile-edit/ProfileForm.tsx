import { Button } from '@/shared/components';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormField } from './FormField';

interface ProfileFormProps {
  user: {
    nickname: string;
    age: number;
    gender: string;
    introduce: string;
  } | null;
  onSubmit: (form: { nickname: string; age: string; introduce: string }) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSubmit }) => {
  const [form, setForm] = useState({
    nickname: user?.nickname || '',
    age: user?.age.toString() || '',
    introduce: user?.introduce || '',
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <FormField
        label="닉네임"
        value={form.nickname}
        onChangeText={(text) => handleChange('nickname', text)}
      />
      <FormField
        label="나이"
        value={form.age}
        onChangeText={(text) => handleChange('age', text)}
      />
      <FormField
        label="자기소개"
        value={form.introduce}
        onChangeText={(text) => handleChange('introduce', text)}
        multiline
      />

      <View style={styles.buttonWrapper}>
        <Button text="저장" onPress={() => onSubmit(form)} style={{ width: '100%' }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 20,
  },
});
