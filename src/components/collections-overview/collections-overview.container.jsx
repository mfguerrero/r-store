import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsLoading } from '../../redux/shop/shop.selectors';

import CollectionsOverview from './collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading
})

const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

export default CollectionsOverviewContainer;

