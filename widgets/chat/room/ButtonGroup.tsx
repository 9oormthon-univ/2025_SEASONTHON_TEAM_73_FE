import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionButton } from './ActionButton';

interface ButtonGroupProps {
  onReject?: () => void;
  onAccept?: () => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ onReject, onAccept }) => {
  return (
    <View style={styles.container}>
      <ActionButton
        title="거절"
        variant="secondary"
        onPress={onReject}
      />
      <ActionButton
        title="수락"
        variant="primary"
        onPress={onAccept}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    gap: 8,
    fontSize: 14,
    fontWeight: '400',
    backgroundColor: '#FCFCFC',
  },
});
