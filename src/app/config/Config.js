const CONFIG = {

    debug:          true,
    lang:           document.documentElement.getAttribute('lang'),
    root:           window.location.pathname,
    mainNode:       document.getElementById('app'),
    localhost:      document.location.hostname.indexOf('localhost') != -1,
    contextMenu:    false,
    sections:       [
                      {
                        route: '',
                        params: {},
                        name: 'index'
                      },
                      {
                        route: 'about',
                        params: {},
                        name: 'about'
                      },
                      {
                        route: 'third',
                        params: {},
                        name: 'third'
                      }
                    ]
}

export default CONFIG;
