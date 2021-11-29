# [넘블](https://www.numble.it/) 챌린지! - Front-End

#### 🔨 [리디북스](https://ridibooks.com/)의 실 페이지를 클론코딩 하는 프로젝트입니다.
    
#### 📌 배포 URL - [https://kks2139.github.io/deploy-numble-challenge/](https://kks2139.github.io/deploy-numble-challenge/)

```
로그인 테스트 
아이디 = numble1130 / 비밀번호 = 1111 입니다.
```

-----

### * 기술 스택
* React Hooks
* Redux
* Typescript
* SCSS / EmotionJS
* react-icons 


### * 프로젝트 구성
```
📦src
 ┣ 📂components           --> 컴포넌트 파일 모음
 ┃ ┣ 📂page               --> 라우터로 url 이동시 보여줄 페이지 컴포넌트 모음 
 ┃ ┃ ┣ 📜BookContentPage.tsx
 ┃ ┃ ┣ 📜...
 ┃ ┣ 📜BookCard.tsx       --> 일반 컴포넌트 모음
 ┃ ┣ 📜...
 ┃ ┣ 📜index.ts
 ┣ 📂containers           --> 컴포넌트들을 감싸면서 리덕스 관련 처리 로직을 담당하는 컴포넌트 모음
 ┃ ┣ 📜BookCheckListContainer.tsx 
 ┃ ┣ 📜...
 ┃ ┣ 📜index.ts
 ┣ 📂redux-modules        --> 액션과 리듀서를 관심사에 따라 분리해놓은 모듈들의 모음
 ┃ ┣ 📜app.ts
 ┃ ┣ 📜...
 ┃ ┗ 📜index.ts
 ┣ 📂utils                --> 공통으로 사용하는 기능들의 모음
 ┃ ┣ 📜interfaces.ts      --> 인터페이스 정의
 ┃ ┗ 📜util.ts            --> 유틸성 함수, 데이터 등 공통 모듈 정의
 ┣ 📜App.tsx
 ┣ 📜Common.scss          --> 공통으로 사용되는 클래스, 속성값 등을 정의
 ```
