import Controller from '../../core/controller/Controller';
import IndexModel from '../model/IndexModel';
import IndexView from '../view/IndexView';

export default class IndexController extends Controller {

  constructor(...args) {
    super(args);

    this._model = new IndexModel();
    this._view = new IndexView();
  }



}
