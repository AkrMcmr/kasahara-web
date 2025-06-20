// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function () {
  // モバイルメニューの動作
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navList.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // スクロール時のヘッダー挙動
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // 下にスクロール時
      header.style.transform = 'translateY(-100%)';
    } else {
      // 上にスクロール時
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // スクロールアニメーション
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeInOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const fadeInObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, fadeInOptions);

  fadeElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    fadeInObserver.observe(element);
  });

  // ページ内リンクのスムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      e.preventDefault();

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight =
          document.querySelector('.site-header').offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // モバイルメニューが開いていれば閉じる
        if (navList.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navList.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      }
    });
  });
});
