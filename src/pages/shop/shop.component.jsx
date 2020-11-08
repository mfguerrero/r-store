import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';


import { updateCollections } from '../../redux/shop/shop.actions';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

export class ShopPage extends React.Component {

  state = {
    loading: true
  }

  // unsubscribeFromSnapshot = null

  async componentDidMount() {
    const collectionsRef = firestore.collection('collections');
    try {
      const snapshot = await collectionsRef.get();
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      this.props.updateCollections(collectionsMap);
      this.setState({ loading: false });
    } catch (error) {
      console.log(error.message);
    }
    // this.unsubscribeFromSnapshot = collectionsRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   this.props.updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // })
  }

  // componentWillUnmount() {
  //   this.unsubscribeFromSnapshot();
  // }

  render() {
    const { match } = this.props;
    const { loading } = this.state
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`}
          render={(props) => (<CollectionsOverviewWithSpinner isLoading={loading} {...props} />)}
        />
        <Route path={`${match.path}/:collectionId`}
          render={(props) => (<CollectionPageWithSpinner isLoading={loading} {...props} />)}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
