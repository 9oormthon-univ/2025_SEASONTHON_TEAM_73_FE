import { COLORS, FONT_SIZE } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PhoneNumberFieldProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onRequestPress?: () => void;
}

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  value,
  onChangeText,
  onRequestPress
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>전화번호 입력</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              { color: value && value.length > 0 ? COLORS.black : COLORS.gray[40] } // 👈 입력 시 검정색
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder="01012345678"
            placeholderTextColor={COLORS.gray[40]}
            keyboardType="number-pad"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onRequestPress}>
          <Text style={styles.buttonText}>요청</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b2,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    gap: 10,
  },
  inputWrapper: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray[40],
    flex: 1,
    minWidth: 240,
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
  },
  input: {
    color: COLORS.gray[40],
    fontSize: FONT_SIZE.c1,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    minHeight: 38,
    width: 90,
    backgroundColor: COLORS.primary[90],
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  buttonText: {
    fontSize: FONT_SIZE.b2,
    color: COLORS.white,
  },
});
