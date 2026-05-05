const profile = {
  email: "your-email@example.com",
  kakao: "https://open.kakao.com/o/your_kakao_openchat",
  instagram: "https://instagram.com/your_instagram",
  discord: "https://discord.com/users/your_discord_user_id",
  github: "https://github.com/your_github",
  githubRepos: [
    {
      name: "Portfolio Site",
      description: "개인 소개와 소셜 링크를 모아둔 프로필 사이트",
      url: "https://github.com/your_github/portfolio",
    },
    {
      name: "Discord Project",
      description: "커뮤니티 운영이나 봇 개발 프로젝트",
      url: "https://github.com/your_github/discord-project",
    },
    {
      name: "Web Playground",
      description: "웹 UI와 자동화 실험을 기록하는 저장소",
      url: "https://github.com/your_github/web-playground",
    },
  ],
};

const links = {
  kakaoLink: profile.kakao,
  instagramLink: profile.instagram,
  discordLink: profile.discord,
  githubLink: profile.github,
  aboutDiscordLink: profile.discord,
  aboutInstagramLink: profile.instagram,
  aboutKakaoLink: profile.kakao,
  contactDiscordLink: profile.discord,
  contactInstagramLink: profile.instagram,
  contactKakaoLink: profile.kakao,
  emailLink: `mailto:${profile.email}`,
};

Object.entries(links).forEach(([id, href]) => {
  const element = document.getElementById(id);
  if (element) {
    element.href = href;
  }
});

const projectList = document.getElementById("projectList");

profile.githubRepos.forEach((repo) => {
  const card = document.createElement("a");
  card.className = "project-card";
  card.href = repo.url;
  card.target = "_blank";
  card.rel = "noreferrer";
  card.innerHTML = `
    <div>
      <strong>${repo.name}</strong>
      <p>${repo.description}</p>
    </div>
    <span>GitHub 보기</span>
  `;
  projectList.append(card);
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const senderName = formData.get("senderName");
  const senderEmail = formData.get("senderEmail");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const body = [
    message,
    "",
    "-----",
    `From: ${senderName}`,
    `Reply to: ${senderEmail}`,
  ].join("\n");

  const mailto = new URL(`mailto:${profile.email}`);
  mailto.searchParams.set("subject", subject);
  mailto.searchParams.set("body", body);
  window.location.href = mailto.toString();
});
