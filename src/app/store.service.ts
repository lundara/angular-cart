import { createStore, combineReducers } from 'redux';
import { productReducer } from './reducer/product.reducer';

declare var window: any;

const reducers = combineReducers({
  product: productReducer
});

const store = createStore(
  reducers,
);

export { store };
