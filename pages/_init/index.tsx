import getInitComponent from '@core/page/Init';
import Store from '@utils/app-store';
import delegator from './delegator';

export default getInitComponent(Store.getInstance(), delegator);
