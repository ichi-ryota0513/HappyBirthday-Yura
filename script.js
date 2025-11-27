// カウントアップ画面
const counter = document.getElementById('counter');
const typedText = document.getElementById('typed-text');
const cursor = document.getElementById('cursor');
const countUpDiv = document.getElementById('count-up');
const introDiv = document.getElementById('intro');

const target = 17;
const duration = 4000;
const waitTimeBeforeTyping = 500; 
const waitBetweenWords = 100;     
const waitAfterTyping = 1500;      
const pauseAt16 = 500;             

let start = null;

// 強い緩急のイージング
function easeInOutCubic(t) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
}

// タイピング風表示関数
function typeText(text, callback, delay=100) {
  let i = 0;
  const typingTimer = setInterval(() => {
    typedText.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typingTimer);
      if (callback) callback();
    }
  }, delay);
}

// フェードアウト関数
function fadeOut(element, duration, callback) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.display = 'none';
    if (callback) callback();
  }, duration);
}

// フェードイン関数
function fadeIn(element, duration) {
  element.style.display = 'flex';
  element.style.opacity = 0;
  element.style.transition = `opacity ${duration}ms`;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 50);
}

// カウントアップアニメーション
function animate(timestamp) {
  if (!start) start = timestamp;
  const elapsed = timestamp - start;
  let progress = elapsed / duration;
  if (progress > 1) progress = 1;

  let easedProgress = easeInOutCubic(progress);
  let current = Math.round(easedProgress * (target - 1));
  counter.textContent = current;

  if (progress < 1) {
    requestAnimationFrame(animate);
  } else {
    // 16で止めてから17にジャンプ
    setTimeout(() => {
      counter.textContent = target;
      counter.classList.add('pop'); // ポンっと拡大
      setTimeout(() => counter.classList.remove('pop'), 300);

      // タイピング開始
      setTimeout(() => {
        typeText('years', () => {
          setTimeout(() => {
            typeText(' old', () => {
              setTimeout(() => {
                fadeOut(countUpDiv, 1000, () => {
                  fadeIn(introDiv, 1000);
                });
              }, waitAfterTyping);
            }, 150); // oldの遅めタイピング
          }, waitBetweenWords);
        });
      }, waitTimeBeforeTyping);

    }, pauseAt16);
  }
}

requestAnimationFrame(animate);



// オープニング画面
const intro = document.getElementById('intro');
const Album = document.getElementById('Album');
const bgm = document.getElementById('bgm');

intro.addEventListener('click', () => {
  bgm.play();

  intro.style.transition = 'opacity 1s';
  intro.style.opacity = 0;

  setTimeout(() => {
    intro.style.display = 'none';
    Album.style.display = 'block';
    Album.style.opacity = 0;
    Album.style.transition = 'opacity 1s';
    setTimeout(() => {
      Album.style.opacity = 1;
    }, 50);
  }, 1000);
});
