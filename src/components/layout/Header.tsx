/**
 * 고정형 헤더 컴포넌트
 *
 * 이 컴포넌트는 모든 페이지에서 공통으로 사용되는 고정형 헤더입니다.
 * 로고, 네비게이션, 검색, 사용자 메뉴를 포함합니다.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCategoryName, getCategoryIcon, PostCategory } from "@/lib/utils";

// 카테고리 데이터
const categories: { value: PostCategory; name: string; icon: string }[] = [
  { value: "ott", name: "OTT", icon: "📺" },
  { value: "youtube", name: "유튜브", icon: "📹" },
  { value: "webtoon", name: "웹툰", icon: "📖" },
  { value: "movie", name: "영화", icon: "🎬" },
  { value: "drama", name: "드라마", icon: "📺" },
  { value: "anime", name: "애니메이션", icon: "🎌" },
  { value: "book", name: "책", icon: "📚" },
  { value: "game", name: "게임", icon: "🎮" },
  { value: "music", name: "음악", icon: "🎵" },
  { value: "other", name: "기타", icon: "📌" },
];

export default function Header() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 검색 처리
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // 로그인 상태 (임시로 false, 나중에 실제 인증 상태로 변경)
  const isLoggedIn = false;
  const user = null; // 임시로 null, 나중에 실제 사용자 정보로 변경

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">띵추</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              띵추
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
            >
              홈
            </Link>

            {/* 카테고리 드롭다운 */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
                <span>카테고리</span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* 카테고리 드롭다운 메뉴 */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {categories.map((category) => (
                    <Link
                      key={category.value}
                      href={`/categories/${category.value}`}
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/ranking"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
            >
              랭킹
            </Link>

            <Link
              href="/write"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
            >
              글쓰기
            </Link>
          </nav>

          {/* 검색 및 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            {/* 검색 버튼 */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* 검색 입력창 */}
            {isSearchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="max-w-7xl mx-auto flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="추천하고 싶은 띵작을 검색해보세요..."
                      className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                    />
                    <svg
                      className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    검색
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </form>
            )}

            {/* 사용자 메뉴 */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.username?.charAt(0) || "U"}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* 사용자 드롭다운 메뉴 */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-2">
                      <Link
                        href="/profile"
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
                      >
                        프로필
                      </Link>
                      <Link
                        href="/my-posts"
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
                      >
                        내 글
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
                      >
                        설정
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={() => {
                          // 로그아웃 로직
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors"
                      >
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  회원가입
                </Link>
              </div>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 py-4 space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                홈
              </Link>
              <Link
                href="/ranking"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                랭킹
              </Link>
              <Link
                href="/write"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                글쓰기
              </Link>

              {/* 모바일 카테고리 */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  카테고리
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.value}
                      href={`/categories/${category.value}`}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
