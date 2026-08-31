const $content = document.getElementById('rules-content');

const LANG_MAP = { en: 'en', fr: 'fr', es: 'es' };

function detectLang() {
  const lang = (navigator.language || 'en').split('-')[0].toLowerCase();
  return LANG_MAP[lang] || 'en';
}

async function loadRules() {
  const lang = detectLang();
  try {
    const res = await fetch(`../rules/${lang}.md`);
    if (!res.ok) throw new Error('fetch failed');
    const text = await res.text();
    $content.innerHTML = window.marked.parse(text);
  } catch {
    $content.innerHTML = '<p class="text-center">Rules unavailable</p>';
  }
}

loadRules();