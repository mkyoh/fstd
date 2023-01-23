import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
// import mailReducer from './slices/mail';
import calendarReducer from './slices/calendar';


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
//   mail: mailReducer,
//   chat: chatReducer,
  calendar: calendarReducer,
//   kanban: kanbanReducer,
//   product: persistReducer(productPersistConfig, productReducer),
});

export { rootPersistConfig, rootReducer };
