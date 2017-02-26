const CONFIG = {

    lang:           document.documentElement.getAttribute('lang'),
    root:           window.location.pathname,
    mainNode:       document.getElementById('app'),
    localhost:      document.location.hostname.indexOf('localhost') != -1,
    contextMenu:    false,
}

export default CONFIG;
