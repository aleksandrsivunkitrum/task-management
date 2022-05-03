import { configureStore } from '@reduxjs/toolkit';
import listReducer from './store/listsSlice';
import ticketReducer from './store/ticketsSlice';
import commonReducer from './store/commonSlice';


export const store = configureStore({
  reducer: {
    lists: listReducer,
    tickets: ticketReducer,
    common: commonReducer,
  },
});
