/**
 * 띵추 메인페이지
 *
 * 이 페이지는 상위 랭킹 게시글들을 보여주는 메인페이지입니다.
 * SSR을 활용하여 초기 로딩 성능을 최적화하고,
 * ISR을 고려하여 설계되었습니다.
 */

import Link from "next/link";
import {
  getCategoryName,
  getCategoryIcon,
  getPlatformName,
  getPlatformColor,
  getRatingStars,
  formatRelativeTime,
  formatNumber,
} from "@/lib/utils";
import { RankingPost } from "@/lib/types";

// 임시 데이터 (나중에 API로 교체)
const mockRankingPosts: RankingPost[] = [
  {
    id: "1",
    title:
      "넷플릭스 '위쳐' 시즌 3 - 헨리 카빌의 마지막 작품이지만 여전히 매력적",
    author: {
      id: "user1",
      username: "게임러버",
      email: "gamer@example.com",
      avatar: "/avatars/user1.jpg",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    category: "ott",
    platform: "netflix",
    rating: 4,
    likes: 1247,
    views: 8923,
    commentCount: 89,
    rank: 1,
    createdAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "2",
    title: "유튜브 '코딩애플' - React 완전 정복 강의 리뷰",
    author: {
      id: "user2",
      username: "개발자킹",
      email: "dev@example.com",
      avatar: "/avatars/user2.jpg",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    category: "youtube",
    platform: "youtube",
    rating: 5,
    likes: 2156,
    views: 15678,
    commentCount: 234,
    rank: 2,
    createdAt: new Date("2024-01-14T15:20:00Z"),
  },
  {
    id: "3",
    title: "네이버 웹툰 '독립일기' - 일상의 소소한 행복을 담은 웹툰",
    author: {
      id: "user3",
      username: "웹툰마스터",
      email: "webtoon@example.com",
      avatar: "/avatars/user3.jpg",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    category: "webtoon",
    platform: "naver-webtoon",
    rating: 5,
    likes: 3421,
    views: 23456,
    commentCount: 567,
    rank: 3,
    createdAt: new Date("2024-01-13T09:15:00Z"),
  },
  {
    id: "4",
    title: "디즈니+ '만달로리안' 시즌 3 - 스타워즈 팬이라면 놓치면 안 될 작품",
    author: {
      id: "user4",
      username: "스타워즈팬",
      email: "starwars@example.com",
      avatar: "/avatars/user4.jpg",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    category: "ott",
    platform: "disney-plus",
    rating: 4,
    likes: 987,
    views: 6543,
    commentCount: 123,
    rank: 4,
    createdAt: new Date("2024-01-12T14:45:00Z"),
  },
  {
    id: "5",
    title: "스팀 '발더스 게이트 3' - RPG의 새로운 기준을 제시한 걸작",
    author: {
      id: "user5",
      username: "게임리뷰어",
      email: "reviewer@example.com",
      avatar: "/avatars/user5.jpg",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    category: "game",
    platform: "steam",
    rating: 5,
    likes: 1876,
    views: 12345,
    commentCount: 345,
    rank: 5,
    createdAt: new Date("2024-01-11T11:30:00Z"),
  },
  {
    id: "6",
    title: "멜론 'NewJeans - Get Up' - 2024년 최고의 K-POP 앨범",
    author: {
      id: "user6",
      username: "음악애호가",
      email: "music@example.com",
      avatar: "/avatars/user6.jpg",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    category: "music",
    platform: "melon",
    rating: 5,
    likes: 2345,
    views: 18765,
    commentCount: 456,
    rank: 6,
    createdAt: new Date("2024-01-10T16:20:00Z"),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              오늘의
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                인기 띵작
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              넷플릭스, 유튜브, 웹툰 등 다양한 플랫폼에서
              <br className="hidden md:block" />
              가장 인기 있는 띵작 추천을 만나보세요
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/write"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 font-semibold text-lg group"
              >
                나만의 띵작 추천 글쓰기
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
              <Link
                href="/ranking"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 font-semibold text-lg"
              >
                전체 랭킹 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            이번 주 인기 띵작
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            좋아요와 조회수를 기준으로 선정된 인기 띵작 추천글입니다
          </p>
        </div>

        {/* Ranking Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRankingPosts.map((post, index) => (
            <article
              key={post.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                  ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                        ? "bg-gray-400"
                        : index === 2
                          ? "bg-amber-600"
                          : "bg-blue-500"
                  }
                `}
                >
                  {post.rank}
                </div>
              </div>

              {/* Platform Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPlatformColor(post.platform)}`}
                >
                  {getPlatformName(post.platform)}
                </span>
              </div>

              <div className="p-6">
                {/* Category */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg">
                    {getCategoryIcon(post.category)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {getCategoryName(post.category)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm">{getRatingStars(post.rating)}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {post.rating}/5
                  </span>
                </div>

                {/* Author & Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {post.author.username.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {post.author.username}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {formatRelativeTime(post.createdAt)}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{formatNumber(post.likes)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>{formatNumber(post.views)}</span>
                    </span>
                  </div>
                  <span className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>{formatNumber(post.commentCount)}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/ranking"
            className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 font-semibold text-lg"
          >
            더 많은 인기 띵작 보기
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white/50 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            카테고리별 띵작
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { category: "ott", name: "OTT", icon: "📺", count: "2.3K" },
              {
                category: "youtube",
                name: "유튜브",
                icon: "📹",
                count: "1.8K",
              },
              { category: "webtoon", name: "웹툰", icon: "📖", count: "1.5K" },
              { category: "movie", name: "영화", icon: "🎬", count: "1.2K" },
              { category: "game", name: "게임", icon: "🎮", count: "980" },
            ].map(item => (
              <Link
                key={item.category}
                href={`/categories/${item.category}`}
                className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.count}개의 띵작
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
