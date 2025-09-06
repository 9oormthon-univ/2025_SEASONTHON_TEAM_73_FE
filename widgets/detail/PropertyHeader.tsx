import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  "https://api.builder.io/api/v1/image/assets/TEMP/12534525cfd5e286f981627b7e137775c093cf79?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
  "https://api.builder.io/api/v1/image/assets/TEMP/12534525cfd5e286f981627b7e137775c093cf79?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
  "https://api.builder.io/api/v1/image/assets/TEMP/12534525cfd5e286f981627b7e137775c093cf79?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
];

type PropertyHeaderProps = {
  images: string; // API에서 받은 이미지 배열
};

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* 이미지 슬라이더 */}
      {/* <FlatList
        ref={flatListRef}
        data={displayImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      /> */}
      <Image
        source={{ uri: images || "https://via.placeholder.com/400x250.png?text=이미지없음" }}
        style={styles.image}
      />

      {/* 인디케이터 */}
      {/* <View style={styles.indicator}>
        <Text style={styles.indicatorText}>
          {currentIndex + 1} / {images.length}
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  image: {
    width: width,
    height: 250,
    resizeMode: "cover",
  },
  indicator: {
    position: "absolute",
    bottom: 16,
    right: 20,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  indicatorText: {
    color: "#FCFCFC",
    fontSize: 12,
    fontWeight: "700",
  },
});

export default PropertyHeader;
