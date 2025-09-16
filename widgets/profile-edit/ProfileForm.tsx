import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormField } from './FormField';
import { GenderSelector } from './GenderSelector';

export const ProfileForm: React.FC = () => {
  return (
    <View style={styles.container}>
      <FormField label="이름" value="이재민" />
      <FormField label="나이" value="25" />
      <GenderSelector />
      <FormField
        label="자기소개"
        value="안녕하세요, 20살 대학생입니다. IT쪽 진로 희망하고 있습니다. 희망 진로 비슷한 분 혹은 현업자분하고 같이 살면 좋을 것 같네요."
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 393,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    height: 303,
  },
});
