import React, { Component } from "react";
import Slider from "react-slick";
import axiosData from '../../service/axiosData'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css'
import Loader from "../loader/loader";
import {settings} from './settings'


export default class Carousel extends Component {

  state = {
    images: [],
    loading: true
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
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