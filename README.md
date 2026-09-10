# 우리WON뱅킹 미니

## 1. 소개

React와 Vite로 구현한 간단한 인터넷 뱅킹 서비스입니다. 사용자의 계좌 목록과 총자산을 확인하고, 계좌번호와 금액을 숨기거나 표시할 수 있으며, 이체·입금 처리와 최근 거래 필터링을 경험할 수 있도록 구성했습니다. 화면 데이터는 현재 mock data를 사용하고 있으며, 반응형 CSS와 컴포넌트 단위 구조를 연습하는 데 초점을 두었습니다.

배포 주소: [https://wonit-react.vercel.app/](https://wonit-react.vercel.app/)

## 2. 화면

### 메인 뱅킹 화면

<!-- 실제 캡처 파일을 docs/screenshots/main.png에 추가하면 아래 이미지가 표시됩니다. -->
![메인 뱅킹 화면](docs/screenshots/main.png)

### 이체 입력 화면

<!-- 실제 캡처 파일을 docs/screenshots/transfer.png에 추가하면 아래 이미지가 표시됩니다. -->
![이체 입력 화면](docs/screenshots/transfer.png)

### 최근 거래 및 계좌 목록

<!-- 실제 캡처 파일을 docs/screenshots/transactions.png에 추가하면 아래 이미지가 표시됩니다. -->
![최근 거래 및 계좌 목록](docs/screenshots/transactions.png)

## 3. 실행 방법

```bash
git clone https://github.com/26jm/wonit-react.git
cd wonit-react
npm install
npm run dev
```

개발 서버가 실행되면 터미널에 표시된 로컬 주소로 접속합니다.

테스트 실행:

```bash
npm test
```

## 4. 폴더 구조

```text
wonit-react/
├─ public/                 정적 파일과 아이콘
├─ src/
│  ├─ api/                 외부 데이터 요청 함수
│  ├─ assets/              앱에서 사용하는 이미지 리소스
│  ├─ components/          헤더, 계좌 카드, 이체 폼 등 UI 컴포넌트
│  │  └─ hooks/            재사용 가능한 커스텀 훅
│  ├─ contexts/            사용자 정보를 공유하는 Context
│  ├─ data/                화면에 사용하는 mock 데이터
│  ├─ utils/               금액 및 계좌번호 포맷 변환 함수
│  ├─ App.jsx              앱 상태와 전체 화면 구성
│  ├─ App.css              앱 컴포넌트 스타일
│  ├─ index.css            전역 스타일과 공통 클래스
│  ├─ main.jsx             React 앱 시작점
│  └─ setupTests.js        테스트 환경 설정
├─ index.html              Vite HTML 진입점
├─ package.json            실행 스크립트와 의존성
└─ vite.config.js          Vite 설정
```

## 5. 사용한 React 개념

오늘의 핵심은 화면을 작은 컴포넌트로 나누고, 컴포넌트 사이에 데이터와 동작을 전달하는 것입니다.

- **컴포넌트**: `Header`, `AccountCard`, `TransferForm`, `TransactionList`처럼 화면을 기능별로 분리했습니다.
- **props**: 부모 컴포넌트가 계좌 정보, 금액 표시 여부, 이벤트 함수를 자식 컴포넌트에 전달합니다.
- **state**: 계좌 목록, 거래 내역, 금액 표시 상태, 필터 상태를 화면의 변경 가능한 데이터로 관리합니다.
- **useState**: `accounts`, `transactions`, `showAmount` 등의 상태를 만들고 업데이트합니다.
- **useEffect**: `Clock`의 타이머와 `useFetch`의 데이터 요청처럼 외부 동작의 시작과 정리를 처리합니다.
- **useContext**: `UserContext`로 사용자 이름과 상태를 여러 컴포넌트에서 공유합니다.
- **커스텀 훅**: `useFetch`로 데이터 요청, 로딩, 오류 상태 처리 로직을 재사용할 수 있게 했습니다.

## 6. 테스트

다음 명령으로 테스트를 실행합니다.

```bash
npm test
```

현재 테스트에서는 다음 동작을 검사합니다.

- 계좌 카드에 계좌 유형, 계좌번호, 잔액, 상태 배지가 표시되는지 확인
- 계좌번호와 금액 마스킹 포맷이 올바르게 동작하는지 확인
- 시계 컴포넌트가 렌더링되고 시간이 표시되는지 확인
- 금액과 원화 표기 변환 함수가 예상한 문자열을 반환하는지 확인

## 7. 앞으로 할 것

- 실제 백엔드 API와 연결해 계좌 및 거래 데이터를 저장하고 조회하기
- 로그인, 인증, 사용자별 계좌 권한 기능 추가하기
- 계좌 간 이체 대상 검증과 이체 완료 안내 화면 구현하기
- 거래 내역의 기간·금액 검색과 월별 소비 분석 차트 추가하기
- 모바일 화면을 더 다듬고 접근성, 키보드 조작, 오류 안내를 개선하기
- CI를 연결해 pull request마다 린트, 테스트, 빌드를 자동으로 검사하기
