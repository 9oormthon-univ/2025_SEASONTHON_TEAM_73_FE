import api from '@/shared/api/axios';
import { Button } from '@/shared/components';
import { Toggle } from '@/shared/components/toggle/Toggle';
import { COLORS, FONT_SIZE } from '@/shared/styles';
import ToggleOff from '@/widgets/signUp/lifeStyle/ToggleOff';
import ToggleOn from '@/widgets/signUp/lifeStyle/ToggleOn';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

export const LifestyleSurvey: React.FC = () => {
  const [isWorkingStudying, setIsWorkingStudying] = useState(false);
  const { token } = useLocalSearchParams<{ token: string }>();

  // ToggleOn 관련 상태
  const [toggleOnData, setToggleOnData] = useState<any>({});
  // ToggleOff 관련 상태
  const [toggleOffData, setToggleOffData] = useState<any>({});

  const handleSubmit = async () => {
    let payload;
    // 백엔드 요구사항에 맞게 변경
    const workTypeMap: Record<string, string> = {
        '회사원': 'OFFICE',
        '학생': 'STUDENT',
        '재택근무': 'REMOTE',
        '프리랜서': 'FREELANCER'
    };

    const alarmTypeMap: Record<string, string> = {
        '1회': 'ONCE',
        '2회': 'TWICE',
        '3회 이상': 'THREE_OR_MORE'
    }

    if (isWorkingStudying) {
        // 직업/학생 있는 경우
        const { selectedWorkType, selectedAlarmType, selectedDays, wakeUpTime, leaveTime, returnTime, sleepTime, holidayWakeUpTime, holidaySleepTime } = toggleOnData;

        // 요일 정렬 후 API 형식으로 join
        const daysOrder = ['월', '화', '수', '목', '금', '토', '일'];
        const sortedDays = selectedDays?.sort((a: string, b: string) => daysOrder.indexOf(a) - daysOrder.indexOf(b)) || [];
        const workDaysString = sortedDays.join(',');


        payload = {
            workType: workTypeMap[selectedWorkType], 
            workDays: [workDaysString],
            wakeUpTimeWorkday: wakeUpTime,
            goWorkTime: leaveTime,
            comeHomeTime: returnTime,
            sleepTimeWorkday: sleepTime,
            wakeUpTimeHoliday: holidayWakeUpTime,
            sleepTimeHoliday: holidaySleepTime,
            alarmCount: alarmTypeMap[selectedAlarmType]
        };
    } else {
        // 백수/직업 없는 경우
        const { wakeUpTime, sleepTime, selectedAlarmType } = toggleOffData;

        payload = {
            workType: "UNEMPLOYED",
            wakeUpTime,
            sleepTime,
            alarmCount: alarmTypeMap[selectedAlarmType]
        };
    }

    console.log(payload)

    try {
        const res = await api.post('/auth/life-rhythm', payload , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(res.data.data.success) {
            Alert.alert("회원가입이 완료되었습니다.");
            router.replace("/onboarding");
        }
        console.log('API 성공:', res.data);
    } catch (err) {
        console.error('API 실패:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>하루 리듬</Text>

            <View style={styles.section}>
                <Text style={styles.sectionLabel}>출근, 등교 여부</Text>
                <Toggle
                    isOn={isWorkingStudying}
                    onToggle={setIsWorkingStudying}
                />
            </View>

            {isWorkingStudying ? (
                <ToggleOn isOn={isWorkingStudying} onToggle={setIsWorkingStudying} {...{ toggleOnData, setToggleOnData }} />
            ) : (
                <ToggleOff isOn={isWorkingStudying} onToggle={setIsWorkingStudying} {...{ toggleOffData, setToggleOffData }} />
            )}

            <Button 
                text='다음' 
                size='lg' 
                style={{ marginTop: 20 }} 
                onPress={handleSubmit}
            />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 18,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONT_SIZE.b1,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    width: "100%",
  },
  sectionLabel: {
    fontSize: FONT_SIZE.b2,
    fontWeight: '700',
    color: COLORS.black,
  },
});

export default LifestyleSurvey;
