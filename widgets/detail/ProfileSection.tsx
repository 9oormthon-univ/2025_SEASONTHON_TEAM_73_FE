import { COLORS } from '@/shared/styles';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ProfileSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContent}>
        <Image
          source={{
            uri: 'https://api.builder.io/api/v1/image/assets/TEMP/12534525cfd5e286f981627b7e137775c093cf79?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c',
          }}
          style={styles.profileImage}
        />
        {/* 닉네임 + 뱃지를 감싸는 컨테이너 */}
        <View style={styles.nameBadgeWrapper}>
          <Text style={styles.nickname}>닉네임</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>대학생 인증</Text>
          </View>
        </View>
      </View>
    </View>
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
    width: 50,
    height: 50,
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
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
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
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    textAlign: 'center',
  },
});

export default ProfileSection;
