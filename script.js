const profile = {
  email: "minjunsong0428@gmail.com",
  kakao: "https://open.kakao.com/o/s9gKj73h",
  instagram: "https://instagram.com/minjun._.song",
  discord: "https://discord.com/app",
};

const links = {
  kakaoLink: profile.kakao,
  instagramLink: profile.instagram,
  aboutDiscordLink: profile.discord,
  aboutInstagramLink: profile.instagram,
  aboutKakaoLink: profile.kakao,
  contactDiscordLink: profile.discord,
  contactInstagramLink: profile.instagram,
  contactKakaoLink: profile.kakao,
  emailLink: profile.email ? `mailto:${profile.email}` : "#contact",
};

Object.entries(links).forEach(([id, href]) => {
  const element = document.getElementById(id);
  if (element) {
    element.href = href;
  }
});

document.querySelectorAll("[data-panel]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.dataset.panel);
    const willOpen = panel.hidden;

    document.querySelectorAll("[data-panel]").forEach((otherButton) => {
      const otherPanel = document.getElementById(otherButton.dataset.panel);
      if (otherPanel && otherPanel !== panel) {
        otherPanel.hidden = true;
        otherButton.setAttribute("aria-expanded", "false");
      }
    });

    panel.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    const box = button.closest(".link-panel");
    const status = box?.querySelector("[data-copy-status]");

    try {
      await copyText(text);
      if (status) {
        status.textContent = `${text} 복사됨`;
      }
    } catch (error) {
      if (status) {
        status.textContent = "복사에 실패했습니다. 텍스트를 직접 선택해주세요.";
      }
    }
  });
});

const topCard = document.querySelector(".top-card");

function updateHeaderState() {
  if (topCard) {
    topCard.classList.toggle("is-scrolled", window.scrollY > 12);
  }
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// Scroll Animations
document.documentElement.classList.add("motion-ready");

const animatedElements = document.querySelectorAll(".animate-on-scroll");

function revealIfVisible(element) {
  const rect = element.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.94) {
    element.classList.add("is-visible");
  }
}

if ("IntersectionObserver" in window) {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  animatedElements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index * 80, 240)}ms`);
    revealIfVisible(element);
    observer.observe(element);
  });
} else {
  animatedElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// Scrollspy Navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.tab-nav a');

const scrollSpyOptions = {
  root: null,
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0
};

const scrollSpyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, scrollSpyOptions);

sections.forEach(section => {
  scrollSpyObserver.observe(section);
});
