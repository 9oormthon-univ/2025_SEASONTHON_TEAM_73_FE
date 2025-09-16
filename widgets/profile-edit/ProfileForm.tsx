import { Button } from '@/shared/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormField } from './FormField';

interface ProfileFormProps {
  form: any;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ form, onChange, onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormField label="닉네임" value={form.nickname} onChangeText={(text) => onChange('nickname', text)} />
      <FormField label="나이" value={form.age} onChangeText={(text) => onChange('age', text)} />
      <FormField label="자기소개" value={form.introduce} multiline onChangeText={(text) => onChange('introduce', text)} />
      <View style={styles.buttonWrapper}>
        <Button text="저장" onPress={onSubmit} style={{ width: '100%' }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, width: '100%' },
  buttonWrapper: { marginTop: 20, width: '100%' },
});
