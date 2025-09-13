## 🛠 기술 스택

### Frontend Framework

- **Next.js**

### 상태 관리 & 데이터 fetching & caching

- **@tanstack/react-query**

### 스타일링

- **Tailwind**

### UI 컴포넌트

- **react-slick** - 캐러셀/슬라이더 컴포넌트
- **react-intersection-observer** - 무한 스크롤 구현

### 성능 최적화

- **use-debounce** - 검색 기능 성능 최적화

## 🚀 프로젝트 실행 방법

### 개발 서버 실행

```bash
yarn dev
```

### 프로덕션 빌드

```bash
yarn build
yarn start
```

### 환경별 빌드

```bash
yarn build:dev
yarn build:stage
yarn build:prod
```

## 📁 프로젝트 구조

이 프로젝트는 **FSD(Feature-Sliced Design)** 아키텍처를 기반으로 구성되어 있습니다.

```
src/
├── entities/           # 비즈니스 엔티티
│   ├── banner/        # 배너 관련 로직
│   ├── favorite/      # 즐겨찾기 관련 로직
│   └── service/       # 서비스 관련 로직
├── features/          # 기능 단위 컴포넌트
│   ├── banner/        # 배너 캐러셀 기능
│   ├── favorite/      # 즐겨찾기 관리 기능
│   └── service/       # 서비스 목록 기능
├── pages/             # Next.js 페이지 및 API Route
├── providers/         # 전역 프로바이더 (React Query 관련)
├── shared/            # 공통 유틸리티
│   ├── config/        # 환경 설정 (ios/android 및 en/ko 구분 함수)
│   ├── hooks/         # 공통 훅
│   ├── hooks/         # 공통 훅
│   ├── ui/            # 공통 UI 컴포넌트
│   └── utils/         # 유틸리티 함수
```

## 🎯 주요 구현 요소

### 1. 배너

- **react-slick** 라이브러리 활용
- 자동 재생 및 터치/스와이프 지원

### 2. 즐겨찾기

- 모달을 통한 즐겨찾기 목록 삭제 기능
- useMutation 기반의 삭제 기능 구현

### 3. 서비스 리스트

- Infinite scroll 구현
- 실시간 검색 및 필터링 기능
- useInfiniteQuery 기반의 fetching/caching
- useInfiniteScroll hook 기반의 intersection observer 기능 구현
