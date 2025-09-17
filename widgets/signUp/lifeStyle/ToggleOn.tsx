import { Chip } from "@/shared/components/chip/Chip"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { DayChip } from "./DayChip"
import { TimePicker } from "./TimePicker"

interface ToggleProps {
    isOn: boolean;
    onToggle: (value: boolean) => void;
}

const ToggleOn: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [wakeUpTime, setWakeUpTime] = useState('00:00'); // 출근일 기상 시간
    const [leaveTime, setLeaveTime] = useState('00:00'); // 출근 시간
    const [returnTime, setReturnTime] = useState('00:00'); // 귀가 시간
    const [sleepTime, setSleepTime] = useState('00:00'); // 취침일 시간
    const [holidayWakeUpTime, setHolidayWakeUpTime] = useState('00:00'); // 휴일 기상 시간
    const [holidaySleepTime, setHolidaySleepTime] = useState('00:00'); // 휴일 취침 시간

    console.log(selectedWorkType);

    const workTypes = ['학생', '회사원', '재택근무', '프리랜서'];
    const days = ['월', '화', '수', '목', '금', '토', '일'];

    // 정렬
    const sortedDays = selectedDays.sort(
        (a, b) => days.indexOf(a) - days.indexOf(b)
    );

    console.log(sortedDays)

    const handleWorkTypeSelect = (type: string) => {
    setSelectedWorkType(type);
    };

    const handleDaySelect = (day: string) => {
    setSelectedDays(prev =>
        prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
    };

    return (
        <>
            <View style={styles.questionSection}>
                <Text style={styles.questionLabel}>출근, 등교 형태</Text>
                <View style={styles.chipContainer}>
                    {workTypes.map((type) => (
                        <Chip
                            key={type}
                            label={type}
                            isSelected={selectedWorkType === type}
                            onPress={() => handleWorkTypeSelect(type)} />
                    ))}
                </View>
            </View>

            <View style={styles.daySection}>
                <Text style={styles.questionLabel}>출근일, 등교일</Text>
                <View style={styles.dayContainer}>
                    {days.map((day) => (
                        <DayChip
                            key={day}
                            day={day}
                            isSelected={selectedDays.includes(day)}
                            onPress={() => handleDaySelect(day)} />
                    ))}
                </View>
            </View>

            <TimePicker
                label="출근일 기상 시간"
                time={wakeUpTime}
                onTimeChange={(newTime) => setWakeUpTime(newTime)} />

            <TimePicker
                label="출발 시간"
                time={leaveTime}
                onTimeChange={(newTime) => setLeaveTime(newTime)} />

            <TimePicker
                label="귀가 시간"
                time={returnTime}
                onTimeChange={(newTime) => setReturnTime(newTime)} />

            <TimePicker
                label="출근일 취침 시간"
                time={sleepTime}
                onTimeChange={(newTime) => setSleepTime(newTime)} />

            <TimePicker
                label="휴일 기상 시간"
                time={holidayWakeUpTime}
                onTimeChange={(newTime) => setHolidayWakeUpTime(newTime)} />

            <View style={styles.lastTimePicker}>
                <TimePicker
                    label="휴일 취침 시간"
                    time={holidaySleepTime}
                    onTimeChange={(newTime) => setHolidaySleepTime(newTime)} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    questionSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    width: "100%",
    gap: 8,
  },
  questionLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: '#17171B',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  daySection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    width: "100%",
    gap: 10,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastTimePicker: {
    borderBottomWidth: 0,
  },
});

export default ToggleOn