/*
 * @name:       Seahorse - MVCS Framework
 * @version:    1.0
 * @author:     Andrea Giuffrida // Buzz Brothers, ag@buzzbrothers.ch
 * @web:        http://www.buzzbrothers.ch
**/

import 'document-register-element'
import domready from 'domready';
import _ from 'lodash';
import fastdom from 'fastdom';
import App from './app/App';

import Video from './core/view/components/Button';

domready(() => {

  let application = new App();

})
