# 띵추 (DingChu)

> 넷플릭스, 유튜브, 웹툰 등 다양한 플랫폼의 띵작을 추천하고 소통하는 현대적인 커뮤니티 플랫폼

## 📋 프로젝트 개요

띵추는 다양한 엔터테인먼트 플랫폼의 띵작을 추천하고 후기를 공유하는 커뮤니티 사이트입니다. 사용자들이 좋아하는 영화, 드라마, 웹툰, 게임 등의 띵작을 추천하고, 다른 사용자들과 소통할 수 있는 플랫폼을 제공합니다.

### 🎯 주요 기능

- **다양한 플랫폼 지원**: 넷플릭스, 디즈니+, 유튜브, 웹툰, 게임 등
- **랭킹 시스템**: 인기 띵작글 실시간 랭킹
- **카테고리별 분류**: OTT, 유튜브, 웹툰, 영화, 게임 등
- **소셜 기능**: 댓글, 대댓글, 좋아요 시스템
- **검색 기능**: 제목, 태그, 플랫폼별 검색
- **사용자 인증**: 이메일 및 소셜 로그인 (Google, Kakao, Naver)

## 🛠 기술 스택

### Frontend

- **Next.js 15** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **React Query** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리

### Backend (예정)

- **Node.js** - 런타임 환경
- **Express.js** - 웹 프레임워크
- **PostgreSQL** - 관계형 데이터베이스
- **Prisma** - ORM
- **JWT** - 인증

### DevOps

- **Vercel** - 배포 플랫폼
- **GitHub** - 버전 관리

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: Blue (#3B82F6) → Purple (#8B5CF6)
- **Secondary**: Indigo (#6366F1)
- **Accent**: Pink (#EC4899)
- **Neutral**: Gray (#6B7280)

### 타이포그래피

- **Font Family**: Geist Sans (기본), Geist Mono (코드)
- **Heading**: 4xl-7xl (반응형)
- **Body**: Base, LG, XL

### 컴포넌트

- **글래스모피즘**: 반투명 배경 + 블러 효과
- **그라데이션**: 부드러운 색상 전환
- **애니메이션**: 부드러운 호버 및 전환 효과

## 🔧 개발 도구

### 코드 품질 관리

- **Husky** - Git 훅 관리
- **lint-staged** - 스테이징된 파일만 린트
- **Prettier** - 코드 포맷팅
- **ESLint** - 코드 품질 검사
- **TypeScript** - 타입 체크

### 개발 스크립트

```bash
# 코드 포맷팅
yarn format

# 포맷팅 체크
yarn format:check

# 린트 실행
yarn lint

# 린트 자동 수정
yarn lint:fix

# 타입 체크
yarn type-check

# 빌드
yarn build
```

### Git 훅

- **pre-commit**: 스테이징된 파일에 대해 ESLint와 Prettier 실행
- **pre-push**: 타입 체크와 빌드 검증

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
