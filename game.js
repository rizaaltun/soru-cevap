"use strict";
// Doğru cevaplar, kitap metniyle karşılaştırılarak sıralandı: B A B C A B C A B C.
const answers = [1, 0, 1, 2, 0, 1, 2, 0, 1, 2];
const art = document.getElementById('art');
const action = document.getElementById('action');
const replay = document.getElementById('replay');
const feedback = document.getElementById('feedback');
const status = document.getElementById('status');
const choices = ['a','b','c'].map(id => document.getElementById(id));
let question = -1;
let score = 0;
let selected = false;

function showQuestion() {
  selected = false;
  feedback.hidden = true;
  art.src = `assets/question-${String(question + 1).padStart(2, '0')}.webp`;
  art.alt = `${question + 1}. soru`;
  choices.forEach(button => button.hidden = false);
  action.setAttribute('aria-label', 'Sonraki soru');
  status.textContent = `${question + 1}. soru. Yanıtını seç.`;
}

choices.forEach((button, index) => button.addEventListener('click', () => {
  if (question < 0 || question >= answers.length || selected) return;
  selected = true;
  const correct = index === answers[question];
  if (correct) score += 10;
  feedback.src = `assets/${correct ? 'correct' : 'wrong'}.webp`;
  feedback.alt = correct ? 'Doğru! 10 puan' : 'Yanlış';
  feedback.hidden = false;
  status.textContent = correct ? 'Doğru cevap. 10 puan kazandın.' : 'Yanlış cevap. Devam et.';
}));

action.addEventListener('click', () => {
  if (question === -1) {
    question = 0;
    showQuestion();
  } else if (selected && question < answers.length - 1) {
    question++;
    showQuestion();
  } else if (selected && question === answers.length - 1) {
    art.src = `assets/result-${score}.webp`;
    art.alt = `Tebrikler! ${score} / 100 puan. 10 soruyu tamamladın.`;
    choices.forEach(button => button.hidden = true);
    feedback.hidden = true;
    action.hidden = true;
    replay.hidden = false;
    status.textContent = art.alt;
  } else {
    status.textContent = 'Devam etmeden önce bir yanıt seç.';
  }
});

replay.addEventListener('click', () => {
  question = -1;
  score = 0;
  selected = false;
  art.src = 'assets/start.webp';
  art.alt = 'Mührün İzinde başlangıç ekranı';
  feedback.hidden = true;
  replay.hidden = true;
  action.hidden = false;
  action.setAttribute('aria-label', 'Oyuna başla');
  status.textContent = 'Oyun yeniden başladı.';
});
