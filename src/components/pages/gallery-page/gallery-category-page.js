import React, { Component } from 'react';
import Pagination from '../../pagination/pagination'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../loader/loader';
import { connect } from 'react-redux';
import { fetchedImagesByCategory, paginate, likeImage} from '../../../store/actions/images'

class GalleryCategory extends Component {

  state = {
    liked: false
  }

  componentDidMount() {
    this.props.fetchedImagesByCategory(this.props.itemId);
  }

  onLikeHandler = (id, el, e) => {
    const { userName, displayName} = this.props.data;
    const author = userName || displayName;	
    this.props.likeImage(id, el, e, author)
    this.setState((prev) => ({liked: !prev.liked}))
  }

  render() {
    const { images, loading, currentPage, imagesPerPage } = this.props;
    const author = this.props.data.userName || this.props.data.displayName;

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    const renderImage = currentImages.map(img => {

      return (
        <div
          key={img.id}
          className="image-card"
        >
          <img className="uploaded-img" src={img.url} alt={img.title} />
          <p className="card-title">{img.title}</p>
          <div className="card-info">
            <span>
              {img.author}
            </span>
            <label className="like-label">
              <input 
                onClick={this.onLikeHandler.bind(this, img.id, img)} 
                type="checkbox" 
                defaultChecked={img.likes && img.likes.indexOf(author) !== -1}
              />
              <FontAwesomeIcon className="heart" icon={faHeart}/>
              <span className="like-counter">{img.likes && img.likes.length}</span>
            </label>
          </div>
        </div>
      )
    })

    return (
      <section
        className="category-container"
      >
        <h2 className="heading">{this.props.itemId}</h2>
        <div
          className="image-container"
        >
          {loading || !images ? 
          <Loader /> :  
          renderImage
          }  
        </div>
        <Pagination
          imagesPerPage={imagesPerPage}
          totalImages={images.length}
          paginate={this.props.paginate}
          category={this.props.itemId}
      />
      </section>  
    )
  }
}

function mapStateToProps(state) {
  return {
    images: state.images.images,
    loading: state.images.loading,
    currentPage: state.images.currentPage,
    imagesPerPage: state.images.imagesPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchedImagesByCategory: category => dispatch(fetchedImagesByCategory(category)),
    paginate: (page) => dispatch(paginate(page)),
    likeImage: (id, el, e, author) => dispatch(likeImage(id, el, e, author))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryCategory);