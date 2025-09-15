import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PropertyCardIcon } from './PropertyCardIcon';

interface PropertyInfoProps {
  iconType: 'home' | 'map' | 'person';
  text: string;
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({ iconType, text }) => {
  return (
    <View style={styles.container}>
      <PropertyCardIcon type={iconType} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'stretch',
  },
  textContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    color: '#17171B',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'SUIT Variable',
    fontWeight: '400',
  },
});
