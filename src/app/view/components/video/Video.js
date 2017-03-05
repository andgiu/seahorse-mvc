const PROGRESS              = 'progress';
const CANPLAY               = 'canplay';
const READYSTATECHANGE      = 'readystatechange';
const LOADSTART             = 'loadstart';
const LOADEDMETADATA        = 'loadedmetadata';
const LOADEDDATA            = 'loadeddata';


export default class Video {

  constructor(options) {

    this.isBuffered = false;

    this.isLoaded = false;

    this._buffer = options.buffer || .25;

    this._ready = options.ready || this.onReady.bind(this);

    this._progressID = null;

    this._video = options.el || document.createElement('video');

    if(!options.el) this.initialize(this._video, options);
    else this.addListeners(this._video);

  }

  initialize(v, options) {

    v.setAttribute('id',        options.id || _.uniqueId('video'));
    v.setAttribute('src',       options.src);
    v.setAttribute('preload',   options.preload || 'auto');
    v.setAttribute('autoplay',  options.autoplay || '0');
    v.setAttribute('loop',      options.loop || '0');
    v.setAttribute('poster',    options.poster || '');

    this.addListeners(v);

  }

  addListeners(v) {

    v.addEventListener(LOADSTART,           this.onLoadStart.bind(this), false);
    v.addEventListener(LOADEDMETADATA,      this.onLoadedMetadata.bind(this), false);
  }

  onLoadStart(e) {

    this._video.addEventListener(CANPLAY,             this.onCanPlay.bind(this), false);
  }

  onLoadedMetadata(e) {
    this.initProgress();
  }


  initProgress() {

    this._progressID = setInterval(() => {

      if(this.progress > this.buffer) {
        this._ready();
        clearInterval(this._progressID);
      }

    },50);

  }

  onCanPlay(e) {
    //
  }

  onReady() {
    //
  }

  get buffer() {
    return this._buffer;
  }

  get progress() {
    let buffered = this._video.readyState == 0 ? 0 : this._video.buffered.end(0);
    let loaded = buffered / this._video.duration;
    return _.isNaN(loaded) ? 0 : loaded;
  }

  get el() {
    return this._video;
  }

}
