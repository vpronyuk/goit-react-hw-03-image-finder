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
    page: 1,
    selectedImg: null,
    error: null,
    isLoading: false,
    isShowModal: false,
    isShowButton: false,
  };

  componentDidUpdate(_, prevState) {
    const { userQuery, page } = this.state;
    if (prevState.userQuery !== userQuery || prevState.page !== page) {
      this.loadImages(userQuery, page);
    }
  }

  async loadImages(userQuery, page) {
    this.setState({ isLoading: true });

    try {
      const newRequestedImg = await fetchImg(userQuery, page);
      if (!newRequestedImg) {
        throw new Error('No data from server!');
      }
      this.setState(prevState => ({
        requestedImg: [...prevState.requestedImg, ...newRequestedImg.hits],
        isShowButton:
          this.state.page < Math.ceil(newRequestedImg.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onFormSubmit = query => {
    this.setState({ userQuery: query, requestedImg: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toogleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };

  onSelectImg = largeImgURL => {
    this.setState({ selectedImg: largeImgURL, isShowModal: true });
  };

  render() {
    const { isLoading, isShowModal, isShowButton, requestedImg, selectedImg } =
      this.state;

    return (
      <div className="App">
        <Searchbar onFormSubmit={this.onFormSubmit} />

        {requestedImg.length > 0 && (
          <>
            <ImageGallery
              requestedImg={requestedImg}
              onSelect={this.onSelectImg}
            />
            {isLoading && <Loader />}
            {isShowButton && <Button onClick={this.handleLoadMore} />}
          </>
        )}

        {isShowModal && (
          <Modal onClose={this.toogleModal} selectedImg={selectedImg}></Modal>
        )}
      </div>
    );
  }
}
