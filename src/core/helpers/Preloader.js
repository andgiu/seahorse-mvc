import createjs from 'preload-js';
import * as LoadingEvent from '../events/LoadingEvents';

const TYPE_MANIFEST = 'manifest';

export default class Preloader {

  constructor(config = {}, basePath = '') {

    this._config = config;
    this._manifest = config.manifest || [];

    this._queue = new createjs.LoadQueue(true, basePath);
    this._queue.setMaxConnections(config.maxConnections || 10);
    this._queue.on(LoadingEvent.LOADING_PROGRESS, this.onProgressHandler.bind(this));

  }


  addFileToManifest(src, type = createjs.AbstractLoader.IMAGE) {
    this._manifest.add({ src: src, type: type});
    return this;
  }

  load() {

    if(!this.manifest.length) {
      __Console.warning('The manifest is empty.');
      return false;
    }

    let dispose = this.dispose.bind(this);
    this._promise = new Promise((resolve, reject) => {

      function onCompleteHandler(e) {

        resolve(this._loadedResults);
        dispose();

      }

      function onErrorHandler(e) {

        reject(e);
        dispose();
      }

      this._queue.on(LoadingEvent.LOADING_COMPLETE, onCompleteHandler);
      this._queue.on(LoadingEvent.LOADING_ERROR, onErrorHandler);
      this._queue.loadManifest(this.manifest);

    });

    return this._promise;

  }

  dispose() {
    if(this._queue) {
      delete this._promise;
      this._promise = null;
      this._queue.removeAllEventListeners();
      this._queue.close();
      this._queue = null;
    }
  }

  onProgressHandler(e) {
    if(this._config.progress) this._config.progress(e.loaded);
  }

  set manifest(manifestArray) {
    this._manifest = manifestArray;
  }

  get manifest() {
    return this._manifest;
  }

  get result() {
    return this._result;
  }

}
