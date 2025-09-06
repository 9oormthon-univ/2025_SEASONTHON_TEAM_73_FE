import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuListItemProps {
  title: string;
  onPress?: () => void;
}

export const MenuListItem: React.FC<MenuListItemProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Image
        source={{
          uri: "https://api.builder.io/api/v1/image/assets/TEMP/2d1ac526c74ec038e9a1f034ce05e65eaf939761?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
        }}
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
  chevronIcon: {
    width: 6,
    height: 12,
    resizeMode: 'contain',
  },
});
