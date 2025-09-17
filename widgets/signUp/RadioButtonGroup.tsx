import { FormLabel } from '@/shared/components/InputField/FormLabel';
import { COLORS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RadioButtonGroupProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  selectedValue,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <FormLabel text="성별" />
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedValue === 'male' ? styles.optionSelectedLeft : styles.optionUnselectedLeft,
          ]}
          onPress={() => onValueChange('male')}
        >
          <Text style={selectedValue === 'male' ? styles.textSelected : styles.textUnselected}>
            남성
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedValue === 'female' ? styles.optionSelectedRight : styles.optionUnselectedRight,
          ]}
          onPress={() => onValueChange('female')}
        >
          <Text style={selectedValue === 'female' ? styles.textSelected : styles.textUnselected}>
            여성
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'column',
    gap: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  optionSelectedLeft: {
    backgroundColor: COLORS.primary[90],
    borderColor: COLORS.primary[90],
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  optionSelectedRight: {
    backgroundColor: COLORS.primary[90],
    borderColor: COLORS.primary[90],
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  optionUnselectedLeft: {
    backgroundColor: '#FCFCFC',
    borderColor: '#CBCBCB',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  optionUnselectedRight: {
    backgroundColor: '#FCFCFC',
    borderColor: '#CBCBCB',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  textSelected: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SUIT Variable',
    fontWeight: '500',
  },
  textUnselected: {
    color: '#9D9D9F',
    fontSize: 14,
    fontFamily: 'SUIT Variable',
    fontWeight: '400',
  },
});
