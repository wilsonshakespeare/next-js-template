import ReactContext from '../context';
import { createStoreHook, createDispatchHook, createSelectorHook } from 'react-redux';
import { StoreType } from '../definitions/Application.d';

// These are react-redux hooks based on context created
export const useStore: <AppState>() => StoreType<AppState> = createStoreHook(ReactContext);
export const useDispatch = createDispatchHook(ReactContext);
export const useSelector = createSelectorHook(ReactContext);
