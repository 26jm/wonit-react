
# wonit-react

## 1. 소개

`wonit-react`는 React의 핵심 기본 개념인 컴포넌트, Props, State 및 Context API와 커스텀 훅을 단계별로 학습하고 실습하기 위해 제작된 웹 애플리케이션입니다. Prop-drilling 문제를 Context로 해결하고 단위 테스트를 작성해보며, 유지보수하기 쉬운 React 코드 구조를 고민하며 구현했습니다.

* **배포 주소:** { https://wonit-react.vercel.app/ }
---

## 2. 화면
{추후 업데이트 예정}

---

## 3. 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/26jm/wonit-react.git

# 2. 프로젝트 폴더로 이동
cd wonit-react

# 3. 의존성 패키지 설치
npm install

# 4. 개발 서버 실행
npm run dev

# 5. 테스트 코드 실행
npm test

```

---

## 4. 폴더 구조

```text
wonit-react/
├── public/                 # 정적 리소스 파일
├── src/
│   ├── components/        # 재사용 가능한 UI 컴포넌트 (StatusBadge 등)
│   ├── context/           # Context API 관련 코드 (StatusContext 등)
│   ├── hooks/             # 사용자 정의 커스텀 훅
│   ├── __tests__/         # 컴포넌트 및 로직 단위 테스트 코드
│   ├── App.jsx            # 최상위 컴포넌트 및 Provider 설정
│   ├── main.jsx           # 애플리케이션 진입점 (DOM 렌더링)
│   └── index.css          # 전역 스타일링
├── index.html             # HTML 템플릿
├── package.json           # 프로젝트 의존성 및 스크립트 관리
└── vite.config.js         # Vite 빌드 설정 파일

```

---

## 5. 사용한 React 개념

* **컴포넌트 (Component):** UI를 독립적이고 재사용 가능한 단위인 `StatusBadge`, `App` 등으로 분리하여 관리했습니다.
* **Props:** 부모 컴포넌트에서 자식 컴포넌트로 단방향 데이터를 전달하여 화면을 구성했습니다.
* **State:** 화면에 보이고 동적으로 바뀌어야 하는 데이터(예: `status`, `todos` 등)를 컴포넌트 내부 상태로 관리했습니다.
* **useState:** 동적인 상태 값을 선언하고, 이벤트(클릭, 입력 등)가 발생했을 때 화면을 다시 렌더링(Re-render)하도록 다루었습니다.
* **useEffect:** 컴포넌트가 마운트/언마운트되거나 특정 state가 변경될 때 발생하는 부업무(Side Effect)를 안전하게 처리했습니다.
* **useContext:** 상위 컴포넌트의 데이터를 하위 컴포넌트로 전달할 때 중간 컴포넌트를 거치지 않는 **Prop-drilling 해결**을 위해 `StatusContext`를 생성하여 전역적 상태 전달을 구현했습니다.
* **커스텀 훅 (Custom Hooks):** Context 상태를 쉽게 소비하거나 반복되는 로직을 재사용하기 위해 `useStatus`와 같은 독립적인 커스텀 훅을 작성했습니다.

---

## 6. 테스트

본 프로젝트는 `Vitest` 및 `React Testing Library`를 활용하여 단위 테스트를 진행합니다.

```bash
npm test

```

* **무엇을 검사하는지:**
1. **컴포넌트 렌더링 검사:** `StatusBadge` 등 주요 컴포넌트가 화면에 올바르게 렌더링되는지 확인합니다.
2. **Context 값 전달 검사:** `StatusProvider`로 감싸진 자식 컴포넌트가 Prop-drilling 없이 Context의 `status` 값을 올바르게 불러오는지 검증합니다.
3. **이벤트 및 State 변경 검사:** 사용자 동작에 따라 state 및 화면 UI(배경색, 텍스트)가 기대한 대로 변경되는지 테스트합니다.



---

## 7. 앞으로 할 것

* **LocalStorage 연동:** 브라우저 저장소를 활용하여 새로고침을 하더라도 상태 데이터가 유지되도록 `useEffect` 기반 영속화 로직 구현
* **상태 관리 전역 최적화:** 상태가 복잡해질 경우를 대비해 `useReducer`를 Context와 결합하여 상태 변경 로직(Action) 분리
* **성능 최적화:** `useMemo` 및 `useCallback`을 활용하여 불필요한 리렌더링 방지
* **TypeScript 도입:** 타입 안정성을 확보하여 컴포넌트 props 및 Context value의 오남용 방지 및 개발 생산성 향상
