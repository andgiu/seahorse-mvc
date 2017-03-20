import WebFont from 'webfontloader';

/**
 * Google / Custom font loader
 * @param {webfontObj} Object
 * @return {Promise}
 *
 * Example:
 * { google:
 *   {
 *    families: ['Montserrat','Droid Sans']
 *   }
 * }
 *
 */

export default class WebFontLoader {

  constructor(webfontObj) {

    return new Promise((resolve, reject) => {

      WebFont.load(Object.assign(webfontObj,{

        active: () => { resolve() },
        inactive: () => { reject() }

      }));

    })

  }

}
