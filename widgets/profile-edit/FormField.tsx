import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FormFieldProps {
  label: string;
  value: string;
  multiline?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, value, multiline = false }) => {
  return (
    <View style={[styles.container, multiline && styles.multilineContainer]}>
      <View style={[styles.labelContainer, multiline && styles.multilineLabelContainer]}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={[styles.field, multiline && styles.multilineField]}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 41,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 20,
  },
  multilineContainer: {
    height: 'auto',
    alignItems: 'flex-start',
  },
  labelContainer: {
    width: 50,
  },
  multilineLabelContainer: {
    height: 30,
    justifyContent: 'flex-end',
  },
  label: {
    color: '#17171B',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'SUIT',
    fontWeight: '700',
  },
  field: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#17171B',
    backgroundColor: '#FCFCFC',
  },
  multilineField: {
    height: 120,
    alignItems: 'flex-start',
  },
  value: {
    color: '#17171B',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'SUIT',
    fontWeight: '400',
  },
});
