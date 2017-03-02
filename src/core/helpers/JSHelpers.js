if('classList' in document.documentElement) {
  window.$hasClass = (el, className) => { return el.classList.contains(className) ; };
  window.$addClass = (el, className) => { el.classList.add(className); };
  window.$removeClass =  (el, className) => { el.classList.remove(className); };
} else {
  window.$hasClass = (el, className) => { return new RegExp('\\b'+ className+'\\b').test(el.className); };
  window.$addClass = (el, className) => { if (!hasClass(el, className)) { el.className += ' ' + className; }; };
  window.$removeClass = (el, className) => { el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), ''); };
}
