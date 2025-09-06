import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress?: () => void;
}

export const UserActionButton: React.FC<ActionButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBCBCB',
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  titleContainer: {
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
});
