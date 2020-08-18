import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import axiosData from '../../../service/axiosData';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../loader/loader';

export default class GalleryAll extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loading: false
    }
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    this.setState({loading : true})
    axiosData.get('/images.json')
    .then(res => {
    const fetchedCategories = [];
    for (let key in res.data) {
      fetchedCategories.push({
        ...res.data[key],
        id: key
      })
    }
    this.setState({
      images: fetchedCategories,
      loading: false
    })
  })
  .catch(err => console.log(err)); 
  }

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
    const author = this.props.data.userName || this.props.data.displayName;
    const { images } = this.state;

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
        {this.state.loading ? 
          <Loader /> :
          categories
        }
      </section>
    )
  }   
};