import api from '@/shared/api/axios';
import { PropertyCard } from '@/shared/components/propertycard/PropertyCard';
import { useAuthStore } from '@/shared/store';
import { COLORS } from '@/shared/styles';
import { CleaningHabitContent } from '@/widgets/user/detail/clean/CleaningHabitContent';
import { DiseaseContent } from '@/widgets/user/detail/disease/DiseaseContent';
import { LifestyleContent } from '@/widgets/user/detail/LifestyleContent';
import { MealPreferenceContent } from '@/widgets/user/detail/meal/MealPreferenceContent';
import { NoiseSensitivityContent } from '@/widgets/user/detail/noise/NoiseSensitivityContent';
import { OtherHabitsContent } from '@/widgets/user/detail/other/OtherHabitsContent';
import { TabNavigation } from '@/widgets/user/detail/TabNavigation';
import { UserDetailProfileSection } from '@/widgets/user/detail/UserDetailProfileSection';
import { HorizontalPropertyCarousel } from '@/widgets/user/HorizontalPropertyCarousel';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export const MyPageScreen: React.FC = () => {
    const [user, setUser] = useState<any>([]);
    const { userId } = useLocalSearchParams();
    const accessToken = useAuthStore.getState().accessToken;
    const [activeTab, setActiveTab] = useState(0);

    const handleTabPress = (index: number) => {
        setActiveTab(index);
    };
    
    useEffect(() => {
        const getUser = async () => {
            try {
            const res = await api.get(`/profile/${userId}`, {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.data.success) {
                const data = res.data.data;
                console.log(data);

               // workDays 변환
                const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
                let apiDays: string[] = [];

                if (Array.isArray(data.lifeHabit?.workDays) && data.lifeHabit.workDays.length > 0) {
                apiDays = data.lifeHabit.workDays[0].split(','); 
                }

                const workDaysBool = weekDays.map(day => apiDays.includes(day));
                data.lifeHabit.workDaysBool = workDaysBool;

                setUser(data);
            }
            } catch (error) {
            console.error("프로필 가져오는데 문제가 발생했습니다", error)
            }
        }

        getUser();
    }, [])

    //console.log(user);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <UserDetailProfileSection
            name={user.nickname}
            gender={user.gender}
            age={user.age}
            description={user.introduce}
            avatarUri={user.userProfileImage}
            smoking={user.smoking}
            userId={user.userId}
        />

        {/* 유저가 작성한 글이 없을 때 */}
        {user.posts?.length > 0 ? (
        <HorizontalPropertyCarousel posts={user.posts} nickname={user.nickname} />
        ) : (
        <PropertyCard name="작성한 글이 없습니다." />
        )}

        <TabNavigation activeTab={activeTab} onTabPress={handleTabPress} />
        {activeTab === 0 && <LifestyleContent lifeHabit={user.lifeHabit} />}
        {activeTab === 1 && <MealPreferenceContent mealHabit={user.mealHabit} />}
        {activeTab === 2 && <CleaningHabitContent cleaningHabit={user.cleaningHabit} />}
        {activeTab === 3 && <NoiseSensitivityContent soundSensitivity={user.soundSensitivity} />}
        {activeTab === 4 && <OtherHabitsContent etc={user.etc} />}
        {activeTab === 5 && <DiseaseContent disease={user.disease} />}
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default MyPageScreen;
