import * as Event from '../../events/Events';

const ATTR_DISABLED = 'disabled';

class Button extends HTMLElement {

  static get observedAttributes() {
    return ['disabled'];
  }

  constructor() {
    super();

    this._connected = false;
    this._disabled = this.getAttribute(ATTR_DISABLED) || false;

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e) {

    if(this.disabled) return false;

  }

  connectedCallback() {

    if(!this._connected) {

        this._connected = true;
        this.addEventListener(Event.CLICK,this.onClickHandler,false);
    }

  }

  disconnectedCallback() {

    this.removeEventListener(Event.CLICK,this.onClickHandler);

  }

  attributeChangedCallback(property, oldValue, newValue) {

    switch (property) {

      case ATTR_DISABLED:

        this[newValue == 'true' ? 'addClass' : 'removeClass'](ATTR_DISABLED);

      break;

    }

  }

  get enabled() {
    return !this._disabled;
  }

  set enabled(value) {
    this._disabled = !value;
    this.setAttribute(ATTR_DISABLED,!value);
  }

}

customElements.define('sh-button',Button);
