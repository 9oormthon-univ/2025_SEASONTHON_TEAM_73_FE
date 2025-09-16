import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

type ProfileImageProps = {
  source?: ImageSourcePropType; // 프로필 이미지 (없으면 기본 회색 배경)
  size?: number; // 프로필 크기 조절 가능
  showEdit?: boolean; // 편집 버튼 표시 여부
};

export const ProfileImage: React.FC<ProfileImageProps> = ({
  source,
  size = 80,
  showEdit = true,
}) => {
  const radius = size / 2;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: radius }]}>
      {source ? (
        <Image source={source} style={[styles.image, { borderRadius: radius }]} />
      ) : (
        <Image source={require('@/assets/icons/friendIcon.png')} style={[styles.image, { borderRadius: radius }]} />
      )}

      {/* 우측 하단 편집 버튼 (옵션) */}
      {showEdit && (
        <Svg
          width={22}
          height={22}
          style={[styles.editBadge, { bottom: 0, right: 0 }]}
          viewBox="0 0 22 22"
        >
          <Rect x="0" y="0" width="22" height="22" rx="11" fill="#6287F2" />
          <Rect
            x="0"
            y="0"
            width="22"
            height="22"
            rx="11"
            stroke="#FCFCFC"
            strokeWidth="2"
          />
          <Path
            d="M6 13.917V16H8.0831L14.2267 9.8564L12.1436 7.7733L6 13.917ZM15.8376 8.2455C15.889 8.1941 15.9299 8.1331 15.9578 8.0659C15.9857 7.9987 16 7.9266 16 7.8539C16 7.7811 15.9857 7.7091 15.9578 7.6419C15.9299 7.5747 15.889 7.5137 15.8376 7.4623L14.5377 6.1624C14.4863 6.111 14.4253 6.0701 14.3581 6.0422C14.2909 6.0143 14.2189 6 14.1461 6C14.0734 6 14.0013 6.0143 13.9341 6.0422C13.8669 6.0701 13.8059 6.111 13.7545 6.1624L12.738 7.179L14.821 9.262L15.8376 8.2455Z"
            fill="#FCFCFC"
          />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  editBadge: {
    position: "absolute",
  },
});
