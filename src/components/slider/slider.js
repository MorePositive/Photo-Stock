import React, { Component } from "react";
import Slider from "react-slick";
import axiosData from '../../service/axiosData'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css'
import Loader from "../loader/loader";


export default class Carousel extends Component {

  state = {
    images: [],
    loading: false
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    this.setState({ loading : true })
    axiosData.get('/images.json')
    .then(res => {
    let fetchedImages = [];
    for (let category in res.data) {
     for (let key in res.data[category]) {
      fetchedImages.push({
        ...res.data[category][key],
        id: key
      })
     }
    }
    const sortedImages = fetchedImages.sort((a, b) => (b.likes ? b.likes.length : 0) - (a.likes ? a.likes.length : 0));
    fetchedImages = sortedImages.slice(0,10);
    this.setState({
      images: fetchedImages,
      loading: false
    })
  })
  .catch(err => console.log(err)); 
  }

  render() {

    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1780,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1120,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 780,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const { images, loading } = this.state;

    const slides = images.map(image => {
      return (
        <div
          key={image.id}
          className="top-card"
        >
          <img className="uploaded-img" src={image.url} alt={image.url}/>
        </div>
      )
      });

    return (
      <section className="slider">
        <h2 className="heading">Top 10</h2>
        {loading ? 
        <div className="loader-wrapper">
          <Loader />
        </div>
         : 
        <Slider {...settings}>
          {slides}
        </Slider>
        }
      </section>
    );
  }
}