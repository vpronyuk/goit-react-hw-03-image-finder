import { Component } from 'react';
import '../../styles/styles.css';

import ImageGallery from 'components/imageGallery/ImageGallery';
import Searchbar from 'components/searchBar/Searchbar';
import Loader from 'components/loader/Loader';
import fetchImg from 'services/fetch';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';

export class App extends Component {
  state = {
    requestedImg: [],
    userQuery: '',
    isLoading: false,
    page: 1,
    selectedImg: null,
    isShowModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const fixedUserQuery = this.state.userQuery.trim();
    if (prevState.userQuery !== fixedUserQuery && fixedUserQuery) {
      // this.setState({ isLoading: true });
      this.setState({ isLoading: true, requestedImg: [], page: 1 });
      this.loadImages(fixedUserQuery, this.state.page);
    }
  }

  async loadImages(userQuery, page) {
    const newRequestedImg = await fetchImg(userQuery, page);
    this.updateImages(newRequestedImg);
  }

  updateImages(newRequestedImg) {
    this.setState(prevState => ({
      requestedImg: [...prevState.requestedImg, ...newRequestedImg],
      isLoading: false,
    }));
  }

  handleLoadMore = async () => {
    this.setState(prevState => ({ isLoading: true, page: prevState.page + 1 })); // збільшення сторінки на 1
    const newRequestedImg = await fetchImg(
      this.state.userQuery,
      this.state.page + 1
    );
    // this.setState(prevState => ({
    //   requestedImg: [...prevState.requestedImg, ...newRequestedImg],
    //   isLoading: false,
    // }));
    this.updateImages(newRequestedImg);
  };

  toogleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };

  onSelectImg = largeImgURL => {
    this.setState({ selectedImg: largeImgURL, isShowModal: true });
  };

  handleInputChange = evt => {
    this.setState({ userQuery: evt });
    // this.setState({ userQuery: evt.target.value });
  };

  render() {
    const { requestedImg, isLoading, isShowModal, selectedImg } = this.state;

    return (
      <div className="App">
        <Searchbar handleInputChange={this.handleInputChange} />
        {isLoading ? (
          <Loader />
        ) : requestedImg.length > 0 ? (
          <>
            <ImageGallery
              requestedImg={requestedImg}
              onSelect={this.onSelectImg}
            />

            <Button onClick={this.handleLoadMore} />
          </>
        ) : null}
        {isShowModal && (
          <Modal onClose={this.toogleModal} selectedImg={selectedImg}></Modal>
        )}
      </div>
    );
  }
}
