/**
 * 띵작 추천 커뮤니티 타입 정의
 *
 * 이 파일은 전체 애플리케이션에서 사용되는 TypeScript 타입들을 정의합니다.
 * 백엔드 API와의 연동을 고려하여 설계되었습니다.
 */

// 사용자 관련 타입
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 게시글 카테고리 타입
export type PostCategory =
  | "ott" // 넷플릭스, 디즈니+ 등
  | "youtube" // 유튜브
  | "webtoon" // 웹툰
  | "movie" // 영화
  | "drama" // 드라마
  | "anime" // 애니메이션
  | "book" // 책
  | "game" // 게임
  | "music" // 음악
  | "other"; // 기타

// 플랫폼 타입
export type Platform =
  | "netflix"
  | "disney-plus"
  | "tving"
  | "wavve"
  | "youtube"
  | "naver-webtoon"
  | "kakao-webtoon"
  | "theater"
  | "tv"
  | "spotify"
  | "melon"
  | "steam"
  | "other";

// 게시글 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  category: PostCategory;
  platform: Platform;
  rating: number; // 1-5점
  tags: string[];
  likes: number;
  views: number;
  commentCount: number;
  isRecommended: boolean; // 추천 여부
  createdAt: Date;
  updatedAt: Date;
}

// 댓글 타입
export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  parentId?: string; // 대댓글인 경우
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// 검색 파라미터 타입
export interface SearchParams {
  query?: string;
  category?: PostCategory;
  platform?: Platform;
  minRating?: number;
  maxRating?: number;
  sortBy?: "latest" | "popular" | "rating" | "views";
  order?: "asc" | "desc";
}

// 인증 관련 타입
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// 소셜 로그인 타입
export type SocialProvider = "google" | "kakao" | "naver";

// 랭킹 게시글 타입 (메인페이지용)
export interface RankingPost {
  id: string;
  title: string;
  author: User;
  category: PostCategory;
  platform: Platform;
  rating: number;
  likes: number;
  views: number;
  commentCount: number;
  rank: number; // 랭킹 순위
  createdAt: Date;
}

// 통계 타입
export interface CommunityStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  activeUsers: number;
  topCategories: Array<{
    category: PostCategory;
    count: number;
  }>;
}
