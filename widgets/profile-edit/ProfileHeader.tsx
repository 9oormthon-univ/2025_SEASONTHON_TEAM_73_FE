import { COLORS, FONT_SIZE, FONTS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProfileImage } from './ProfileImage';

interface ProfileHeaderProps {
  profileImage: string | null; // 선택된 이미지 URL
  onPressImage: () => void;    // 이미지 클릭 시 호출
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileImage, onPressImage }) => {
  return (
    <View style={styles.container}>
      <ProfileImage
        source={profileImage ? { uri: profileImage } : undefined}
        size={80}
        showEdit={true}
        onPress={onPressImage} // 클릭 시 이벤트 전달
      />
      <Text style={styles.description}>
        책상, 침대 같은 생활 성향이 드러나는 사진으로 올리면 매칭에 도움이 돼요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    height: 178,
  },
  description: {
    color: COLORS.gray[40],
    textAlign: 'center',
    fontSize: FONT_SIZE.c1,
    lineHeight: 18,
    fontFamily: FONTS.medium,
  },
});
