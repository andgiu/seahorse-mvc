const PROGRESS              = 'progress';
const CANPLAY               = 'canplay';
const READYSTATECHANGE      = 'readystatechange';
const LOADSTART             = 'loadstart';
const LOADEDMETADATA        = 'loadedmetadata';
const LOADEDDATA            = 'loadeddata';
const ENDED                 = 'ended';


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

    this.onLoadStart = this.onLoadStart.bind(this);
    this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onProgress = this.onCanPlay.bind(this);

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

    v.addEventListener(LOADSTART,           this.onLoadStart, false);
    v.addEventListener(LOADEDMETADATA,      this.onLoadedMetadata, false);
    v.addEventListener(PROGRESS,            this.onProgress, false);
  }

  onLoadStart(e) {

    this._video.addEventListener(CANPLAY,   this.onCanPlay, false);
  }

  onLoadedMetadata(e) {
    this.initProgress();
  }

  onProgress(e) {

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

  play() {
    this._video.play();
  }


  dispose() {

    this._video.removeEventListener(LOADSTART, this.onLoadStart);
    this._video.removeEventListener(LOADEDMETADATA, this.onLoadedMetadata);
    this._video.removeEventListener(PROGRESS, this.onProgress);
    this._video.removeEventListener(CANPLAY, this.onCanPlay);

    this._video.setAttribute('src','');
    this._video = null;
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
