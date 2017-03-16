/*
 * @name:       Seahorse - MVCS Framework
 * @version:    1.0
 * @author:     Andrea Giuffrida // Buzz Brothers, ag@buzzbrothers.ch
 * @web:        http://www.buzzbrothers.ch
**/

// Core Classes
import domready from 'domready';
import 'document-register-element'
import 'velocity-animate';
import 'lodash';
import 'fastdom';


// Main Classes
import Helpers from './core/helpers/JSHelpers';
import Console from './core/helpers/Console';
import App from './app/App';

// Custom Components
import './core/view/components/Button';

domready(() => {

  /**
   * Initialize the Console helper class
   */
  window.__Console = new Console();
  let application = new App();


})
