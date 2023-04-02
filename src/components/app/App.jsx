import { Component } from 'react';
import '../../styles/styles.css';

import ImageGallery from 'components/imageGallery/ImageGallery';
import Searchbar from 'components/searchBar/Searchbar';
import Loader from 'components/loader/Loader';
import fetchImg from 'services/fetch';
import Button from 'components/button/Button';

export class App extends Component {
  state = {
    requestedImg: [],
    userQuery: '',
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const fixedUserQuery = this.state.userQuery.trim();
    if (prevState.userQuery !== fixedUserQuery && fixedUserQuery) {
      this.setState({ isLoading: true });
      const requestedImg = await fetchImg(this.state.userQuery);
      this.setState({ requestedImg, isLoading: false });
    }
  }

  handleInputChange = evt => {
    this.setState({ userQuery: evt });
  };

  render() {
    const { requestedImg, isLoading } = this.state;

    return (
      <div className="App">
        <Searchbar handleInputChange={this.handleInputChange} />
        {isLoading ? (
          <Loader />
        ) : requestedImg.length > 0 ? (
          <ImageGallery requestedImg={requestedImg} />
        ) : null}
        <Button />
      </div>
    );
  }
}
