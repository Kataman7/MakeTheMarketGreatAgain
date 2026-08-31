const audio = new Audio('../public/cashout.mp3');

export function playCashout() {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}