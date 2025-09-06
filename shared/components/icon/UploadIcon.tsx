import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const UploadIcon: React.FC = () => {
  return (
    // <Image
    //   source={{
    //     uri: "https://api.builder.io/api/v1/image/assets/TEMP/b0d295ffd12a1a2c94d194e878362af825173f0a?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
    //   }}
    //   style={styles.icon}
    // />
    <Image
      source={require('@/assets/icons/upload.png')} // 로컬 파일
      style={styles.icon}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});
