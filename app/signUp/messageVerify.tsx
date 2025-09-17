import api from '@/shared/api/axios';
import { Button } from '@/shared/components';
import { InputField } from '@/shared/components/InputField/InputField';
import { ActionButton } from '@/widgets/chat/room/ActionButton';
import { PhoneNumberField } from '@/widgets/signUp/PhoneNumberField';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export const PhoneVerificationForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { username } = useLocalSearchParams<{ username: string }>();

  const handleRequestPress = async () => {
    if (!phoneNumber) {
      Alert.alert('전화번호를 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      const res = await api.post('/auth/send-one', { phoneNumber });
      if (res.data.success) {
        setIsCodeSent(true);
        Alert.alert('인증번호가 발송되었습니다.');
      } else {
        Alert.alert('인증번호 발송 실패', res.data.message || '');
      }
    } catch (err: any) {
      console.error('OTP 전송 실패:', err.response?.data || err.message);
      Alert.alert('OTP 전송 실패', err.response?.data?.message || '잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPress = async () => {
    if (!verificationCode) {
      Alert.alert('인증번호를 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      const res = await api.post('/auth/verify-otp', {
        username: username,
        phoneNumber,
        code: verificationCode,
      });

      if (res.data.success) {
        Alert.alert('인증 성공', '회원가입이 완료되었습니다.', [
          {
            text: '확인',
            onPress: () => {
                router.push({
                    pathname: '/signUp/lifeRhythm',
                    params: { token: res.data.data.accessToken ?? '' },
                });
            },
          },
        ]);
      } else {
        Alert.alert('인증 실패', res.data.message || '');
      }
    } catch (err: any) {
      console.error('OTP 검증 실패:', err.response?.data || err.message);
      Alert.alert('OTP 검증 실패', err.response?.data?.message || '인증번호를 다시 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <PhoneNumberField
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        onRequestPress={handleRequestPress}
      />
      <InputField
        label="인증번호 입력"
        placeholder="인증번호를 입력하세요."
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button
        text="다음"
        onPress={handleVerifyPress}
        disabled={!isCodeSent || !verificationCode || loading}
        style={{ marginTop: 457 }}
      />
      <ActionButton
        title="다음2"
        onPress={() => {
          router.push({
            pathname: '/signUp/lifeRhythm',
            params: { token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwidXNlcklkIjo5LCJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE3NTgwMzIxNzQsImV4cCI6MTc1ODM5MjE3NH0.3KaLmEkcstI0q_vCS2kJx2UAE4EbrU5IzNfMR3m6KJcZfPDHkjDIwrtMpvDaPIuBkpvttLuY2TtfiMlb3BtKwA" },
          });
          }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    fontWeight: '400',
    backgroundColor: '#FCFCFC',
    paddingTop: 18,
    paddingRight: 18,
    paddingLeft: 18,
  },
});

export default PhoneVerificationForm;
