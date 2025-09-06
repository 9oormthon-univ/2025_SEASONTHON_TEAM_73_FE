import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface UserProfileSectionProps {
  name: string;
  gender: string;
  age: number;
  description: string;
  avatarUri: string;
  onEditProfile?: () => void;
  onMyPersonality?: () => void;
  smoking?: boolean;
}

export const UserDetailProfileSection: React.FC<UserProfileSectionProps> = ({
  name,
  gender,
  age,
  description,
  avatarUri,
  onEditProfile,
  onMyPersonality,
  smoking
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <View style={styles.userInfoRow}>
            <Image
                      source={require('@/assets/icons/friendIcon.png')}
                      style={styles.avatar}
                    />
            <View style={styles.userDetails}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
              </View>
              <View style={styles.genderAgeContainer}>
                <Text style={styles.genderAge}>{gender}・{age}세・{smoking ? "흡연" : "비흡연"}</Text>
              </View>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: '#F2F2F2',
    width: '100%',
  },
  profileContainer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  profileContent: {
    width: '100%',
  },
  userInfoRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F2',
  },
  userDetails: {
    width: 115,
  },
  nameContainer: {
    marginBottom: 4,
  },
  name: {
    color: '#17171B',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
  genderAgeContainer: {},
  genderAge: {
    color: '#878789',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    color: '#17171B',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
});
