const LOADING_COMPLETE = 'complete';
const LOADING_PROGRESS = 'progress';
const LOADING_ERROR = 'error';
const TYPE_MANIFEST = 'manifest';

import createjs from 'preload-js';

export default class Preloader {

  constructor(config = {}, basePath = '') {

    this._config = config;
    this._manifest = config.manifest || [];

    this._queue = new createjs.LoadQueue(true, basePath);
    this._queue.setMaxConnections(config.maxConnections || 10);

    this._queue.on(LOADING_COMPLETE, this.onCompleteHandler.bind(this));
    this._queue.on(LOADING_PROGRESS, this.onProgressHandler.bind(this));
    this._queue.on(LOADING_ERROR, this.onErrorHandler.bind(this));

  }


  addFileToManifest(src, type = createjs.AbstractLoader.IMAGE) {
    this._manifest.add({ src: src, type: type});
    return this;
  }

  load() {
    this._queue.loadManifest(this.manifest);
  }

  dispose() {
    if(this._queue) {
      this._queue.removeAllEventListeners();
      this._queue.close();
      this._queue = null;
    }
  }

  onCompleteHandler(e) {
    this._result = e.target._loadedResults;
    this.dispose();

    if(this.complete) this.complete(this.result);
  }

  onProgressHandler(e) {
    if(this.progress) this.progress(e.loaded);
  }

  onErrorHandler(error) {
    throw(error);
    if(this.error) this.error(error);
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
