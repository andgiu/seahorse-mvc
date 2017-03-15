import Controller from '../../core/controller/Controller';
import Model from '../model/ThirdModel';
import View from '../view/ThirdView';
import AppSignals from '../signal/AppSignals';

export default class ThirdController extends Controller {

  constructor() {
    super(Model, View, AppSignals);
  }

}
