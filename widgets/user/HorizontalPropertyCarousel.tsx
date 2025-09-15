import { PropertyCard } from '@/shared/components/propertycard/PropertyCard';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HorizontalPropertyCarouselProps {
  posts: any[];
  nickname: string;
}

export const HorizontalPropertyCarousel: React.FC<HorizontalPropertyCarouselProps> = ({ posts, nickname }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {posts.map((post: any) => (
          <View key={post.id} style={{ width: SCREEN_WIDTH }}>
            <PropertyCard
              name={`${nickname}님이 올린 집`}
              propertyTitle={post.title}
              imageUrl={post.imageUrl}
              priceInfo={`${post.roomType}・${post.deposit}만원 / ${post.monthlyRent}만원`}
              location={post.region}
              residentInfo={`${post.userGender}성 거주 중・${post.smoking}`}
              postId={post.id}
            />
          </View>
        ))}
      </ScrollView>

      {/* 페이지 도트 */}
      {posts?.length > 1 ? (
        <View style={styles.dotsContainer}>
            {posts.map((_, index) => (
            <View
                key={index}
                style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null,
                ]}
            />
            ))}
        </View>) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
  },
  activeDot: {
    backgroundColor: '#17171B', // 활성화 도트 색상
  },
});
