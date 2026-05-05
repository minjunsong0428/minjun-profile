# Profile Site

모바일 카드형 자기소개 사이트입니다. `index.html`을 브라우저에서 열면 바로 실행됩니다.

## 링크 바꾸기

`script.js` 맨 위의 `profile` 값만 실제 계정으로 바꾸면 됩니다.

```js
const profile = {
  email: "your-email@example.com",
  kakao: "https://open.kakao.com/o/your_kakao_openchat",
  instagram: "https://instagram.com/your_instagram",
  discord: "https://discord.com/users/your_discord_user_id",
  github: "https://github.com/your_github",
};
```

Discord 서버 초대 링크를 걸고 싶으면 `discord` 값을 `https://discord.gg/...` 형식으로 바꾸면 됩니다.

## 대표 프로젝트

`githubRepos` 배열에 GitHub 저장소 이름, 설명, 주소를 넣으면 카드가 자동으로 추가됩니다.
