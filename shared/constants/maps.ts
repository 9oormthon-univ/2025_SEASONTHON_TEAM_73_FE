// 직업 유형 매핑
export const workTypeMap: Record<string, string> = {
    '회사원': 'OFFICE',
    '학생': 'STUDENT',
    '재택근무': 'REMOTE',
    '프리랜서': 'FREELANCER'
} as const;

// 알람 횟수 매핑

export const alarmTypeMap: Record<string, string> = {
    '1회': 'ONCE',
    '2회': 'TWICE',
    '3회 이상': 'THREE_OR_MORE'
} as const;

// 타입도 같이 export 하면 더 안전해짐
export type WorkType = keyof typeof workTypeMap; 
export type AlarmType = keyof typeof alarmTypeMap; 
