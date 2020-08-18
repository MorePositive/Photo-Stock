import React, { Component } from 'react';
import axiosData from '../../../service/axiosData'
import Pagination from '../../pagination/pagination'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../loader/loader';

export default class GalleryCategory extends Component {

  constructor(props) {
    super(props)

    this.state = {
      images: [],
      loading: false,
      currentPage: 1,
      imagesPerPage: 10,
    }
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    this.setState({loading: true})
    axiosData.get(`/images/${this.props.itemId}.json`)
    .then(res => {
    const fetchedImages = [];
    for (let key in res.data) {
      fetchedImages.push({
        ...res.data[key],
        id: key
      })
    }
    this.setState({
      images: fetchedImages,
      loading: false
    })
  })
  .catch(err => console.log(err)); 
  }

  paginate = pageNumber => {
    this.setState({ currentPage: pageNumber })
  };

  onLikeHandler = (id, el, e) => {
    const { userName, displayName} = this.props.data;
    const author = userName || displayName;
    if (e.target.checked) {
      if (!el.likes) {
        el.likes = [author]
      } else if (el.likes.indexOf(author) === -1) {
        el.likes.push(author)
      }
    } else {
      const idx = el.likes.indexOf(author)
      el.likes.splice(idx, 1)
    }

    axiosData.patch(`/images/${el.category}/${id}.json`, { likes: el.likes })
    .then(this.setState({images: this.state.images}))
    .catch(err => console.log(err))	
}

  render() {
    const { images, currentPage, imagesPerPage } = this.state;
    const author = this.props.data.userName || this.props.data.displayName;

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    const renderImage = currentImages.map(img => {

      return (
        <div
          key={img.url}
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
          {this.state.loading ? 
          <Loader /> :  
          renderImage
          }  
        </div>
        <Pagination
          imagesPerPage={imagesPerPage}
          totalImages={images.length}
          paginate={this.paginate}
          category={this.props.itemId}
      />
      </section>  
    )
  }
}