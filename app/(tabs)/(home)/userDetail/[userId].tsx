import api from '@/shared/api/axios';
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
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export const MyPageScreen: React.FC = () => {
    const [user, setUser] = useState<any>([]);
    //const { userId } = useLocalSearchParams();
    const userId = 2;
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
                    if(res.data.data.gender === "MALE") {
                        res.data.data.gender = "남성"
                    } else {
                        res.data.data.gender = "여성"
                    }
                    setUser(res.data.data);
                }
            } catch (error) {
                console.error("프로필 가져오는데 문제가 발생했습니다", error)
            }
        }

        getUser();
    },[])
    //console.log(user);

    const handleEditProfile = () => {
        console.log('Edit profile pressed');
    };

    const handleMyPersonality = () => {
        console.log('My personality pressed');
    };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <UserDetailProfileSection
            name={user.nickname}
            gender={user.gender}
            age={user.age}
            description={user.introduce}
            avatarUri="https://api.builder.io/api/v1/image/assets/TEMP/6bbcfd6c72685e98e894256a944ad514466dd509?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
            onEditProfile={handleEditProfile}
            onMyPersonality={handleMyPersonality}
            smoking={user.smoking}
        />
        <TabNavigation activeTab={activeTab} onTabPress={handleTabPress} />
        {activeTab === 0 && <LifestyleContent />}
        {activeTab === 1 && <MealPreferenceContent />} 
        {activeTab === 2 && <CleaningHabitContent />}
        {activeTab === 3 && <NoiseSensitivityContent />}
        {activeTab === 4 && <OtherHabitsContent />}    
        {activeTab === 5 && <DiseaseContent />}        
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
