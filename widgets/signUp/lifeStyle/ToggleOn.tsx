import { Chip } from "@/shared/components/chip/Chip";
import { COLORS, FONT_SIZE } from "@/shared/styles";
import { StyleSheet, Text, View } from "react-native";
import { DayChip } from "./DayChip";
import { TimePicker } from "./TimePicker";

interface ToggleProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  toggleOnData: any;
  setToggleOnData: (data: any) => void;
}

const ToggleOn: React.FC<ToggleProps> = ({ toggleOnData, setToggleOnData }) => {
    const workTypes = ['학생', '회사원', '재택근무', '프리랜서'];
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const alarmTypes = ['1회', '2회', '3회 이상'];

    const handleAlarmTypeSelect = (type: string) => {
        setToggleOnData({ ...toggleOnData, selectedAlarmType: type });
    };

    const handleWorkTypeSelect = (type: string) => {
        setToggleOnData({ ...toggleOnData, selectedWorkType: type });
    };

    const handleDaySelect = (day: string) => {
        const selectedDays = toggleOnData.selectedDays || [];
        const updatedDays = selectedDays.includes(day)
        ? selectedDays.filter((d: string) => d !== day)
        : [...selectedDays, day];

        setToggleOnData({ ...toggleOnData, selectedDays: updatedDays });
    };

    const handleTimeChange = (key: string, value: string) => {
        setToggleOnData({ ...toggleOnData, [key]: value });
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
                    isSelected={toggleOnData.selectedWorkType === type}
                    onPress={() => handleWorkTypeSelect(type)}
                    />
                ))}
                </View>
            </View>

            <View style={styles.questionSection}>
                <Text style={styles.questionLabel}>알람 횟수</Text>
                <View style={styles.chipContainer}>
                {alarmTypes.map((type) => (
                    <Chip
                    key={type}
                    label={type}
                    isSelected={toggleOnData.selectedAlarmType === type}
                    onPress={() => handleAlarmTypeSelect(type)}
                    />
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
                    isSelected={(toggleOnData.selectedDays || []).includes(day)}
                    onPress={() => handleDaySelect(day)}
                    />
                ))}
                </View>
            </View>

            <TimePicker
                label="출근일 기상 시간"
                time={toggleOnData.wakeUpTime || '00:00'}
                onTimeChange={(time) => handleTimeChange('wakeUpTime', time)}
            />
            <TimePicker
                label="출발 시간"
                time={toggleOnData.leaveTime || '00:00'}
                onTimeChange={(time) => handleTimeChange('leaveTime', time)}
            />
            <TimePicker
                label="귀가 시간"
                time={toggleOnData.returnTime || '00:00'}
                onTimeChange={(time) => handleTimeChange('returnTime', time)}
            />
            <TimePicker
                label="출근일 취침 시간"
                time={toggleOnData.sleepTime || '00:00'}
                onTimeChange={(time) => handleTimeChange('sleepTime', time)}
            />
            <TimePicker
                label="휴일 기상 시간"
                time={toggleOnData.holidayWakeUpTime || '00:00'}
                onTimeChange={(time) => handleTimeChange('holidayWakeUpTime', time)}
            />
            <TimePicker
                label="휴일 취침 시간"
                time={toggleOnData.holidaySleepTime || '00:00'}
                onTimeChange={(time) => handleTimeChange('holidaySleepTime', time)}
            />
        </>
    );
};

const styles = StyleSheet.create({
  questionSection: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#fff', gap: 8 },
  questionLabel: { fontSize: FONT_SIZE.b2, fontWeight: '400', color: COLORS.black },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  daySection: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F2F2F2', width: '100%', gap: 10 },
  dayContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export default ToggleOn;
