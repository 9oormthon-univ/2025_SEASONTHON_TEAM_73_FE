import { COLORS } from '@/shared/styles';
import { ProfileForm } from '@/widgets/profile-edit/ProfileForm';
import { ProfileHeader } from '@/widgets/profile-edit/ProfileHeader';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const ProfileEditScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <ProfileForm />
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
