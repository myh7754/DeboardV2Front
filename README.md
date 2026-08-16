# DeboardV2 — Frontend

[Deboard](https://github.com/myh7754/DeboardV2)(RSS 기반 기술 블로그 구독 플랫폼)의 웹 클라이언트입니다.
백엔드가 이 저장소의 본체이며, 여기서는 **인증 토큰을 다루는 방식과 외부 HTML을 렌더링하는 방식**을 중심으로 정리합니다.

| 구분 | 기술 |
|---|---|
| Framework | Vue 3.5 (Composition API, `<script setup>`), Vite |
| State | Pinia + `pinia-plugin-persistedstate` |
| Routing | vue-router 4 (history 모드) |
| Style | Tailwind CSS + daisyUI |
| HTTP | axios, `axios-auth-refresh` |
| Security | DOMPurify |

## 설계에서 신경 쓴 부분

### 1. 토큰을 프론트에 저장하지 않는다

access/refresh 토큰을 `localStorage`에 두지 않고 **HttpOnly 쿠키로만** 주고받습니다.
JS에서 토큰을 읽을 수 없으므로 XSS가 발생해도 토큰이 탈취되지 않습니다.
axios 인스턴스는 `withCredentials: true`로 쿠키만 싣고, 리프레시 요청도 body 없이 쿠키에 의존합니다.

```js
const api = axios.create({ baseURL, withCredentials: true });
```

### 2. 401 재발급 중 요청이 중복되지 않게 한다

토큰 만료 시 여러 요청이 동시에 401을 받으면 리프레시가 그 횟수만큼 발생합니다.
`axios-auth-refresh`의 `pauseInstanceWhileRefreshing`으로 **재발급이 끝날 때까지 나머지 요청을 큐에 세우고**,
리프레시가 실패하면 로그아웃 처리 후 홈으로 보냅니다.

```js
createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});
```

### 3. 외부에서 수집한 HTML을 그대로 렌더링하지 않는다

이 서비스는 RSS로 **외부 블로그의 본문 HTML**을 가져와 보여줍니다. 신뢰할 수 없는 입력입니다.
DOMPurify로 허용 태그·속성·URI 스킴을 화이트리스트 방식으로 제한한 뒤 렌더링합니다
(`src/utils/htmlSanitizer.js`). 차단이 아니라 허용 목록이라, 새로운 우회 태그가 나와도 기본적으로 막힙니다.

## 구조

```
src/
├── api/         # axios 인스턴스, 토큰 재발급 인터셉터
├── pages/       # auth · posts · comments · rss
├── stores/      # Pinia (Auth · Post · Comment · Rss)
├── composable/  # 재사용 로직
├── layout/      # 공통 레이아웃
└── utils/       # HTML sanitizer 등
```

## 실행

```bash
npm install
npm run dev      # Vite 개발 서버 (/api 는 백엔드로 프록시)
npm run build
```

환경 변수는 `VITE_API_BASE_URL`, `VITE_BACKEND_URL`을 사용합니다.
백엔드 실행 방법은 [DeboardV2](https://github.com/myh7754/DeboardV2)를 참고하세요.
