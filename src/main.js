/*
 * @name:       Seahorse - MVCS Framework
 * @version:    1.0
 * @author:     Andrea Giuffrida // Buzz Brothers, ag@buzzbrothers.ch
 * @web:        http://www.buzzbrothers.ch
**/

import CONFIG from './app/config/Config';
import domready from 'domready';
import _ from 'lodash';

import Signal from './core/signal/Signal';

domready(() => {

  var a = {
    obj: new Signal()
  }

  function addItem1(...args) {
    console.log("1:" + args);
  }

  function addItem2(...args) {
    console.log(this);
  }

  a.obj.add(addItem1,this,1);
  a.obj.memorize = true;

  a.obj.dispatch('1');
  a.obj.dispatch();
  
  console.log(a.obj.VERSION);

})
