import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../loader/loader';
import { fetchImages, likeImage } from '../../../store/actions/images'
import { connect } from 'react-redux'

class GalleryAll extends Component {

  state = {
    liked: false
  }

  componentDidMount() {
    this.props.fetchImages();
  }

  onLikeHandler = (id, el, e) => {
    const { userName, displayName} = this.props.data;
    const author = userName || displayName;	
    this.props.likeImage(id, el, e, author)
    this.setState((prev) => ({liked: !prev.liked}))
  }

  render() {
    const author = this.props.data.userName || this.props.data.displayName;
    const { images, loading } = this.props;

    const categories = images.map((img) => {
     
      const items = Object.entries(img).slice(0,3).map(([key, el]) => {
        if (el.url) {
          return (
            <div
              key={el.url}
              className="image-card"  
            >
            <img className="uploaded-img" src={el.url} alt={el.title} />
            <p className="card-title">{el.title}</p>
              <div className="card-info">
                <span>
                  {el.author}
                </span>
                <label className="like-label">
                  <input 
                    onClick={this.onLikeHandler.bind(this, key, el)} 
                    type="checkbox" 
                    defaultChecked={el.likes && el.likes.indexOf(author) !== -1}
                  />
                  <FontAwesomeIcon className="heart" icon={faHeart}/>
                  <span className="like-counter">{el.likes && el.likes.length}</span>
                </label>
              </div>
            </div>
          )
        } 
        return null
      })

      return (
        <div
          key={img.id}
          className="category-container"
        >
          <h2 className="heading">{img.id}</h2>
          <div
            className="image-container"
          >
            {items}
          </div>
          <Link to={`gallery/${img.id}`} className="link-btn more-btn">Show more</Link>
        </div>
      )
    });

    return (
      <section className="gallery-page">
        {loading || !images ? 
          <Loader /> :
          categories
        }
      </section>
    )
  }   
};

function mapStateToProps(state) {
  return {
    images: state.images.images,
    loading: state.images.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchImages: () => dispatch(fetchImages()),
    likeImage: (id, el, e, author) => dispatch(likeImage(id, el, e, author))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryAll);