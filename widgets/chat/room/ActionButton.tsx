import { COLORS, FONT_SIZE } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActionButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  variant = 'primary',
  onPress,
}) => {
  const buttonStyle = variant === 'primary' ? styles.primaryButton : styles.secondaryButton;
  const textStyle = variant === 'primary' ? styles.primaryText : styles.secondaryText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    minHeight: 40,
    flex: 1,
    backgroundColor: COLORS.primary[90],
    paddingTop: 10,
    paddingRight: 40,
    paddingBottom: 10,
    paddingLeft: 40,
  },
  secondaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary[90],
    minHeight: 40,
    flex: 1,
    paddingTop: 10,
    paddingRight: 40,
    paddingBottom: 10,
    paddingLeft: 40,
  },
  buttonContent: {
    alignSelf: 'stretch',
    margin: 0,
  },
  primaryText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.b2,
    textAlign: 'center',
  },
  secondaryText: {
    color: COLORS.primary[90],
    fontSize: FONT_SIZE.b2,
    textAlign: 'center',
  },
});
