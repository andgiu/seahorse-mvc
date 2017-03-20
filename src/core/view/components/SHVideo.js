import * as VideoEvent from '../../events/VideoEvents';

const PRELOAD_AUTO = 'auto';
const PRELOAD_METADATA = 'metadata';
const PRELOAD_NONE = 'none';

const ATTR_SRC = 'src';
const ATTR_PRELOAD = 'preload';
const ATTR_AUTOPLAY = 'autoplay';
const ATTR_LOOP = 'loop';
const ATTR_READY = 'ready';
const ATTR_BUFFER = 'buffer';

class Video extends HTMLElement {

  static get observedAttributes() {
    return ['ready'];
  }

  constructor(callback) {
    super();
    this._callback = callback || null;
  }

  connectedCallback() {

    this._connected = true;

    this._buffer = this.hasAttribute(ATTR_BUFFER) ? parseFloat(this.getAttribute(ATTR_BUFFER)) : 3;

    this._options = {
      preload: this.getAttribute(ATTR_PRELOAD)  || PRELOAD_AUTO,
      autoplay: this.hasAttribute(ATTR_AUTOPLAY) ? '' : null,
      loop: this.hasAttribute(ATTR_LOOP) ? '' : null,
      src: this.getAttribute(ATTR_SRC)
    }

    this._video = document.createElement('video').setAttributes(this._options);
    this.appendChild(this._video);

  }

  preload() {

    if(this.hasAutoplay) {
      __Console.warning('Remove the autoplay attribute.');
      return false;
    }

    if(this.preloadType != PRELOAD_NONE) {
      __Console.warning('Set the preload attribute to NONE');
      return false;
    }

    this._video.addEventListener(VideoEvent.LOADSTART,() => {
      this._video.addEventListener(VideoEvent.LOADEDMETADATA,this.onLoadedMetadata.bind(this),false);
    }, false);

    this._video.load();

  }

  onTimeUpdate() {

    if(this.currentTime > this.buffer && !this.ready) {
      this.ready = true;
    }

    this._progress = this.currentTime / this.duration;
    this._raf = window.requestAnimationFrame(this.onTimeUpdate.bind(this));
  }

  onLoadedMetadata() {
    this._video.removeEventListener(VideoEvent.LOADEDMETADATA,this.onLoadedMetadata,false);
    this.play();
  }

  play() {
    cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(this.onTimeUpdate.bind(this));
    this._video.play();
  }

  pause() {
    cancelAnimationFrame(this._raf);
    this._video.pause();
  }


  setCallback(callback) {
    this._callback = callback;
  }



  disconnectedCallback() {
    this.dispose();
  }

  attributeChangedCallback(attribute, oldValue, newValue) {

    if(!this._callback) {
      __Console.warning('AttributeChange callback is not defined.');
      return this;
    }

    this._callback(attribute, oldValue, newValue);
  }

  dispose() {
    cancelAnimationFrame(this._raf);
    this._video.setAttribute(ATTR_SRC,'');
    this.removeChild(this._video);
    this.innerHTML = '';
  }

  get ready() {
    return this._ready;
  }

  set ready(bool) {
    this._ready = bool;
    this.setAttribute(ATTR_READY,bool);
  }

  get buffer() {
    return this._buffer;
  }

  get preloadType() {
    return this._options.preload;
  }

  get hasAutoplay() {
    return this._options.autoplay != null;
  }

  get hasLoop() {
    return this._options.loop != null
  }

  get src() {
    return this._options.src;
  }

  get currentTime() {
    return this._video.currentTime;
  }

  get duration() {
    return this._video.duration;
  }

  get volume() {
    return this._video.volume;
  }

  set volume(value) {
    this._video.volume = value;
  }


}

customElements.define('sh-video',Video);
