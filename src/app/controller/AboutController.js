import Controller from '../../core/controller/Controller';
import Model from '../model/AboutModel';
import View from '../view/AboutView';

export default class AboutController extends Controller {

  constructor() {
    super(Model, View);
  }

}
