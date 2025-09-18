export interface UserProfileResponse {
  success: boolean;
  code: string;
  message: string;
  data: UserProfileData;
}

export interface UserProfileData {
  userId: number;
  nickname: string;
  age: number;
  gender: "남" | "여";
  lifeHabit: LifeHabit;
  mealHabit: MealHabit;
  etc: Etc;
  cleaningHabit: CleaningHabit;
  soundSensitivity: SoundSensitivity;
  introduce: string;
  recommendationWeights: any[];
  pet: string[]; // ["강아지, 고양이"]
  disease: string | null;
  userProfileImage: string;
  posts: Post[];
  certified: boolean;
}

export interface LifeHabit {
  workType: string; // "회사원"
  workDays: string[]; // ["월,화,수,목,금"]
  wakeUpTimeWorkday: string; // "07:00"
  goWorkTime: string; // "09:00"
  comeHomeTime: string; // "18:00"
  sleepTimeWorkday: string; // "23:00"
  wakeUpTimeHoliday: string; // "08:00"
  sleepTimeHoliday: string; // "24:00"
  alarmCount: string; // "1회"
  workDaysBool?: boolean[]; // 클라이언트에서 계산해서 추가됨
}

export interface MealHabit {
  cookingCount: string; // "주로 해 먹어요"
  smellLevel: string; // "예민한 편이에요"
  alcoholCount: string; // "0회"
  dishShare: string; // "공용 식기"
}

export interface Etc {
  smoking: string; // "비흡연"
  pet: string[]; // ["강아지, 고양이"]
}

export interface CleaningHabit {
  bathroomCleaningLevel: string; // "예민한 편이에요"
  tidinessLevel: string; // "둔감해요"
}

export interface SoundSensitivity {
  sleepLevel: string; // "예민한 편이에요"
  sleepHabit: string[]; // ["SNORING, TEETH_GRINDING"] (클라이언트에서 split & 변환)
  phoneMode: string; // "무음"
  earphoneUsage: string; // "밤에만"
}

export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  roomType: string; // "투룸", "원룸", "오피스텔", "빌라"
  deposit: number;
  monthlyRent: number;
  region: string;
  userGender: "남" | "여";
  smoking: string; // "비흡연"
  availableDate: string; // ISO 8601 날짜 (예: "2025-09-20T00:00:00")
}
