/**
 * 회원가입 페이지
 *
 * 이 페이지는 사용자 회원가입을 위한 페이지입니다.
 * 일반 회원가입과 소셜 회원가입을 지원하며,
 * 사용자명 중복 체크, 비밀번호 강도 검사, 약관 동의를 포함합니다.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isValidEmail, checkPasswordStrength } from "@/lib/utils";

// 약관 내용 (실제로는 별도 파일로 관리)
const TERMS_OF_SERVICE = `
제1조 (목적)
이 약관은 띵추(이하 "회사")가 제공하는 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "서비스"라 함은 회사가 제공하는 띵작 추천 커뮤니티 서비스를 의미합니다.
2. "회원"이라 함은 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.

제3조 (약관의 효력 및 변경)
1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.
2. 회사는 필요한 경우 관련법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.
`;

const PRIVACY_POLICY = `
제1조 (개인정보의 처리목적)
회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
- 회원 가입 및 관리
- 서비스 제공 및 운영
- 고객 상담 및 문의 응대

제2조 (개인정보의 처리 및 보유기간)
회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

제3조 (개인정보의 제3자 제공)
회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
`;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"general" | "social">("general");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    gender?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
  });
  const [showTerms, setShowTerms] = useState<"terms" | "privacy" | null>(null);

  // 사용자명 유효성 검사
  const validateUsername = (username: string): string | null => {
    if (!username) return "사용자명을 입력해주세요.";
    if (username.length < 2 || username.length > 20) {
      return "사용자명은 2-20자 사이로 입력해주세요.";
    }
    if (!/^[a-zA-Z0-9가-힣]+$/.test(username)) {
      return "사용자명은 영문, 한글, 숫자만 사용 가능합니다.";
    }
    return null;
  };

  // 사용자명 중복 체크
  const checkUsernameAvailability = async (username: string) => {
    if (!username || validateUsername(username)) return;

    setIsUsernameChecking(true);
    try {
      // TODO: 실제 API 호출로 교체
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 임시로 랜덤하게 사용 가능/불가능 결정
      const isAvailable = Math.random() > 0.3;
      setIsUsernameAvailable(isAvailable);

      if (!isAvailable) {
        setErrors((prev) => ({
          ...prev,
          username: "이미 사용 중인 사용자명입니다.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, username: undefined }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        username: "사용자명 확인 중 오류가 발생했습니다.",
      }));
    } finally {
      setIsUsernameChecking(false);
    }
  };

  // 폼 데이터 변경 처리
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 실시간 유효성 검사
    if (name === "email" && value && !isValidEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "올바른 이메일 형식을 입력해주세요.",
      }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }

    if (name === "username") {
      const usernameError = validateUsername(value);
      if (usernameError) {
        setErrors((prev) => ({ ...prev, username: usernameError }));
        setIsUsernameAvailable(null);
      } else {
        setErrors((prev) => ({ ...prev, username: undefined }));
        // 사용자명이 유효하면 중복 체크
        if (value.length >= 2) {
          checkUsernameAvailability(value);
        }
      }
    }

    if (name === "password") {
      const strength = checkPasswordStrength(value);
      if (value && strength.score < 3) {
        setErrors((prev) => ({
          ...prev,
          password: `비밀번호 강도: ${strength.feedback}`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }

    if (name === "confirmPassword") {
      if (value && value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  // 약관 동의 처리
  const handleAgreementChange = (agreement: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [agreement]: !prev[agreement],
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // 유효성 검사
    const newErrors: typeof errors = {};

    if (!formData.username) {
      newErrors.username = "사용자명을 입력해주세요.";
    } else {
      const usernameError = validateUsername(formData.username);
      if (usernameError) {
        newErrors.username = usernameError;
      } else if (isUsernameAvailable === false) {
        newErrors.username = "이미 사용 중인 사용자명입니다.";
      }
    }

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else {
      const strength = checkPasswordStrength(formData.password);
      if (strength.score < 3) {
        newErrors.password = `비밀번호 강도: ${strength.feedback}`;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!agreements.termsOfService) {
      newErrors.general = "서비스 이용약관에 동의해주세요.";
    }

    if (!agreements.privacyPolicy) {
      newErrors.general = "개인정보처리방침에 동의해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // TODO: 실제 회원가입 API 호출
      console.log("회원가입 시도:", formData);

      // 임시로 성공 처리 (나중에 실제 API로 교체)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 회원가입 성공 시 로그인 페이지로 이동
      router.push("/login?message=회원가입이 완료되었습니다. 로그인해주세요.");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setErrors({ general: "회원가입에 실패했습니다. 다시 시도해주세요." });
    } finally {
      setIsLoading(false);
    }
  };

  // 소셜 회원가입 처리
  const handleSocialSignup = (provider: string) => {
    // TODO: 실제 소셜 회원가입 구현
    console.log(`${provider} 회원가입 시도`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">띵추</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              띵추
            </span>
          </Link>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            띵추에 가입하고 다양한 띵작을 추천해보세요
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            회원가입
          </h2>

          {/* 일반 오류 메시지 */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">
                {errors.general}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 사용자명 입력 */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                사용자명 *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-20 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.username
                      ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
                      : isUsernameAvailable === true
                        ? "border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  } dark:text-white`}
                  placeholder="2-20자, 영문/한글/숫자"
                  disabled={isLoading}
                />
                {isUsernameChecking && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {isUsernameAvailable === true && !isUsernameChecking && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.username}
                </p>
              )}
              {isUsernameAvailable === true && !errors.username && (
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                  사용 가능한 사용자명입니다.
                </p>
              )}
            </div>

            {/* 이메일 입력 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                이메일 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email
                    ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                } dark:text-white`}
                placeholder="your@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                비밀번호 *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password
                      ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  } dark:text-white`}
                  placeholder="최소 8자, 대소문자/숫자/특수문자 포함"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* 비밀번호 확인 입력 */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                비밀번호 확인 *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.confirmPassword
                      ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  } dark:text-white`}
                  placeholder="비밀번호를 다시 입력하세요"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* 약관 동의 */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                약관 동의 *
              </h3>

              <div className="space-y-2">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={agreements.termsOfService}
                    onChange={() => handleAgreementChange("termsOfService")}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      <button
                        type="button"
                        onClick={() => setShowTerms("terms")}
                        className="text-blue-600 hover:underline"
                      >
                        서비스 이용약관
                      </button>
                      에 동의합니다.
                    </span>
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={agreements.privacyPolicy}
                    onChange={() => handleAgreementChange("privacyPolicy")}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      <button
                        type="button"
                        onClick={() => setShowTerms("privacy")}
                        className="text-blue-600 hover:underline"
                      >
                        개인정보처리방침
                      </button>
                      에 동의합니다.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>회원가입 중...</span>
                </div>
              ) : (
                "회원가입"
              )}
            </button>
          </form>

          {/* 구분선 */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
              또는
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* 소셜 회원가입 버튼들 */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialSignup("google")}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Google로 회원가입
              </span>
            </button>

            <button
              onClick={() => handleSocialSignup("kakao")}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"
                />
              </svg>
              <span className="text-black font-medium">카카오로 회원가입</span>
            </button>

            <button
              onClick={() => handleSocialSignup("naver")}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-green-500 border border-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"
                />
              </svg>
              <span className="text-white font-medium">네이버로 회원가입</span>
            </button>
          </div>

          {/* 로그인 링크 */}
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 약관 모달 */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {showTerms === "terms"
                    ? "서비스 이용약관"
                    : "개인정보처리방침"}
                </h3>
                <button
                  onClick={() => setShowTerms(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {showTerms === "terms" ? TERMS_OF_SERVICE : PRIVACY_POLICY}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowTerms(null)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
