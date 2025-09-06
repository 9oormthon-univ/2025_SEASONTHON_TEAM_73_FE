import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DocumentTitleProps {
  title: string;
  subtitle: string;
}

export const DocumentTitle: React.FC<DocumentTitleProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  titleContainer: {},
  title: {
    color: '#17171B',
    fontSize: 14,
  },
  subtitleContainer: {
    marginTop: 4,
  },
  subtitle: {
    color: '#9D9D9F',
    fontSize: 12,
  },
});
