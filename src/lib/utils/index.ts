/**
 * 커뮤니티 유틸리티 함수들
 *
 * 이 파일은 애플리케이션 전반에서 사용되는 헬퍼 함수들을 포함합니다.
 */

import { PostCategory, Platform } from "../types";

/**
 * 카테고리별 한글 이름 반환
 */
export const getCategoryName = (category: PostCategory): string => {
  const categoryNames: Record<PostCategory, string> = {
    ott: "OTT",
    youtube: "유튜브",
    webtoon: "웹툰",
    movie: "영화",
    drama: "드라마",
    anime: "애니메이션",
    book: "책",
    game: "게임",
    music: "음악",
    other: "기타",
  };

  return categoryNames[category];
};

/**
 * 플랫폼별 한글 이름 반환
 */
export const getPlatformName = (platform: Platform): string => {
  const platformNames: Record<Platform, string> = {
    netflix: "넷플릭스",
    "disney-plus": "디즈니+",
    tving: "티빙",
    wavve: "웨이브",
    youtube: "유튜브",
    "naver-webtoon": "네이버 웹툰",
    "kakao-webtoon": "카카오 웹툰",
    theater: "영화관",
    tv: "TV",
    spotify: "스포티파이",
    melon: "멜론",
    steam: "스팀",
    other: "기타",
  };

  return platformNames[platform];
};

/**
 * 플랫폼별 색상 반환
 */
export const getPlatformColor = (platform: Platform): string => {
  const platformColors: Record<Platform, string> = {
    netflix: "bg-red-500",
    "disney-plus": "bg-blue-600",
    tving: "bg-green-500",
    wavve: "bg-purple-500",
    youtube: "bg-red-600",
    "naver-webtoon": "bg-green-600",
    "kakao-webtoon": "bg-yellow-500",
    theater: "bg-gray-600",
    tv: "bg-blue-500",
    spotify: "bg-green-400",
    melon: "bg-yellow-400",
    steam: "bg-gray-700",
    other: "bg-gray-500",
  };

  return platformColors[platform];
};

/**
 * 카테고리별 아이콘 반환
 */
export const getCategoryIcon = (category: PostCategory): string => {
  const categoryIcons: Record<PostCategory, string> = {
    ott: "📺",
    youtube: "📹",
    webtoon: "📖",
    movie: "🎬",
    drama: "📺",
    anime: "🎌",
    book: "📚",
    game: "🎮",
    music: "🎵",
    other: "📌",
  };

  return categoryIcons[category];
};

/**
 * 날짜를 상대적 시간으로 변환 (예: "3시간 전", "2일 전")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
};

/**
 * 숫자를 K, M 단위로 포맷팅 (예: 1000 -> 1K, 1500000 -> 1.5M)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

/**
 * 별점을 별 이모지로 변환
 */
export const getRatingStars = (rating: number): string => {
  const fullStar = "⭐";
  const emptyStar = "☆";
  const maxStars = 5;

  const fullStars = Math.floor(rating);
  const emptyStars = maxStars - fullStars;

  return fullStar.repeat(fullStars) + emptyStar.repeat(emptyStars);
};

/**
 * 클래스명을 조건부로 결합
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * 텍스트를 지정된 길이로 자르고 말줄임표 추가
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

/**
 * 이메일 유효성 검사
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 비밀번호 강도 검사
 */
export const checkPasswordStrength = (
  password: string
): {
  score: number;
  feedback: string;
} => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("최소 8자 이상");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("소문자 포함");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("대문자 포함");
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("숫자 포함");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("특수문자 포함");
  }

  return {
    score,
    feedback: feedback.join(", "),
  };
};

/**
 * 로컬 스토리지에 데이터 저장
 */
export const setLocalStorage = (key: string, value: unknown): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * 로컬 스토리지에서 데이터 가져오기
 */
export const getLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  }
  return defaultValue || null;
};

/**
 * 로컬 스토리지에서 데이터 삭제
 */
export const removeLocalStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
