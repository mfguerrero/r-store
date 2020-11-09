// node_modules imports
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// local imports
import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';

// components imports
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';

export class ShopPage extends React.Component {

  componentDidMount() {
    const { fetchCollectionsAsync } = this.props;
    fetchCollectionsAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsAsync: () => dispatch(fetchCollectionsAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);
