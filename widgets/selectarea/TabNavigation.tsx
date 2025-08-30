import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TabNavigation: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftTab}>
        <View style={styles.tabContent}>
          <Text style={styles.tabText}>구</Text>
        </View>
      </View>
      <View style={styles.rightTab}>
        <Text style={styles.tabText}>동</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#9D9D9F',
    height: 37,
  },
  leftTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#9D9D9F',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightTab: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'SUIT Variable',
    lineHeight: 21,
    textAlign: 'center',
  },
});
