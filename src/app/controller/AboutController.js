import Controller from '../../core/controller/Controller';
import Model from '../model/AboutModel';
import View from '../view/AboutView';
import AppSignals from '../signal/AppSignals';

export default class AboutController extends Controller {

  constructor() {
    super(Model, View, AppSignals);
  }

}
