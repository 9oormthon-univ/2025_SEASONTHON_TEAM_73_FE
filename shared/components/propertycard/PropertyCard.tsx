import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PropertyInfo } from './PropertyInfo';

interface PropertyCardProps {
  name?: string;
  propertyTitle?: string;
  imageUrl?: string;
  priceInfo?: string;
  location?: string;
  residentInfo?: string;
  postId?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  propertyTitle,
  imageUrl,
  priceInfo,
  location,
  residentInfo,
  postId
}) => {
    const handleDetailPress = () => {
      router.push(`/(tabs)/(home)/detail/${postId}`);
    }

    return (
        <View style={styles.container}>
            {name && (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{name}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.cardContainer} onPress={handleDetailPress}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.contentContainer}>
                  <View style={styles.propertyTitleContainer}>
                      <Text style={styles.propertyTitle} numberOfLines={1}>
                        {propertyTitle}
                      </Text>
                  </View>
                  <PropertyInfo iconType="home" text={priceInfo ?? ''} />
                  <PropertyInfo iconType="map" text={location ?? ''} />
                  <PropertyInfo iconType="person" text={residentInfo ?? ''} />
                </View>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 18,
    paddingBottom: 20,
    paddingLeft: 18,
    gap: 13,
    minHeight: 203,
    backgroundColor: '#F2F2F2',
  },
  titleContainer: {
    alignSelf: 'stretch',
  },
  title: {
    color: '#17171B',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SUIT Variable',
    fontWeight: '700',
  },
  cardContainer: {
    flexDirection: 'row',
    height: 126,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    alignSelf: 'stretch',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E6',
    backgroundColor: '#FCFCFC',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
  },
  propertyTitleContainer: {
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  propertyTitle: {
    color: '#17171B',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SUIT Variable',
    fontWeight: '700',
  },
});
