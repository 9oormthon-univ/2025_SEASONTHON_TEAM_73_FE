import api from '@/shared/api/axios';
import { create } from 'zustand';

interface Profile {
  nickname: string;
  age: number;
  gender: string;
  introduce: string;
  profileImage: string | null;
  posts?: any[];
}

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => void;
  updateProfileImage: (file: any) => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
    profile: null,

    setProfile: (profile) => set({ profile }),

    fetchProfile: async () => {
        try {
        const res = await api.get('/profile/me');
        if (res.data.success) {
            const data = res.data.data;
            const profile: Profile = {
            nickname: data.nickname,
            age: data.age,
            gender: data.gender === '남' ? '남성' : '여성',
            introduce: data.introduce,
            profileImage: data.userProfileImage || null,
            posts: data.posts || [],
            };
            set({ profile });
        }
        } catch (err) {
        console.error('프로필 가져오기 실패', err);
        }
    },

    updateProfile: (data: Partial<Profile>) => {
        const current = get().profile;
        if (current) {
        set({ profile: { ...current, ...data } });
        }
    },

    updateProfileImage: async (file: any) => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                type: file.type,
                name: file.fileName || 'profile.jpg',
            } as any);

            const res = await api.post('/s3/upload/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.success) {
                get().updateProfile({ profileImage: res.data.data.fileUrl });
            }
        } catch (err) {
        console.error('이미지 업로드 실패', err);
        }
    },
}));
