// ProfileSection.tsx
import { COLORS, FONT_SIZE, FONTS } from '@/shared/styles';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProfileSectionProps = {
  userId: number; // 상대방 유저 ID
  nickname: string;
  badgeText?: string;
  profileImageUrl?: string;
};

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userId,
  nickname,
  badgeText = '대학생 인증',
  profileImageUrl = "https://api.builder.io/api/v1/image/assets/TEMP/6bbcfd6c72685e98e894256a944ad514466dd509?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
}) => {
  const handleNavigateToProfile = () => {
    router.push(`/userDetail/${userId}` as any); // 프로필 페이지로 이동
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigateToProfile} activeOpacity={0.8}>
      <View style={styles.profileContent}>
        <Image
          source={require('../../assets/icons/friendIcon.png')}
          style={styles.profileImage}
        />
        {/* 닉네임 + 뱃지를 감싸는 컨테이너 */}
        <View style={styles.nameBadgeWrapper}>
          <Text style={styles.nickname}>{nickname}</Text>
          {badgeText && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeText}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 360,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 25,
    marginRight: 20,
  },
  nameBadgeWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nickname: {
    color: '#17171B',
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.bold,
    lineHeight: 30
  },
  badge: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary[100],
    backgroundColor: COLORS.primary[10],
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.primary[100],
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});

export default ProfileSection;
