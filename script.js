'use strict';

// 依照瀏覽年份更新頁尾
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// 手機導覽選單
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuButton && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '開啟導覽選單');
  };
  menuButton.addEventListener('click', () => {
    const willOpen = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', willOpen);
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? '關閉導覽選單' : '開啟導覽選單');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

// 捲動進場動畫：不支援 IntersectionObserver 時仍顯示所有內容
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(element => observer.observe(element));
} else {
  reveals.forEach(element => element.classList.add('is-visible'));
}

// 預留照片：未放入 images/profile.jpg 時會顯示原有幾何圖像
const portrait = document.querySelector('.profile-photo');
const placeholder = document.querySelector('.photo-placeholder');
if (portrait && placeholder) {
  portrait.addEventListener('load', () => {
    if (portrait.naturalWidth > 0) {
      portrait.hidden = false;
      placeholder.hidden = true;
    }
  });
  portrait.addEventListener('error', () => {
    portrait.hidden = true;
    placeholder.hidden = false;
  });
  // HTML 內的 img 起初 hidden，但仍會載入來源檔案。
  if (portrait.complete && portrait.naturalWidth > 0) {
    portrait.hidden = false;
    placeholder.hidden = true;
  }
}
