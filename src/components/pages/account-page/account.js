import React, {Component} from 'react';
import axiosData from '../../../service/axiosData';
import { storage } from '../../../service/fire'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { fetchImages } from '../../../store/actions/images'
import './account.css';

class Account extends Component {

  state = {
    title: '',
    category: 'animals',
    image: null,
    url: '',
    progress: 0
  }

  componentDidMount() {
    this.props.fetchImages();
  }

  postImageAdd = (e) => {
    e.preventDefault();
    const { userName, displayName, email } = this.props.data;
    const author = userName || displayName;
    const { title, category, url } = this.state;

    const imageData = { author, email, title, category, url, likes: [] }
    axiosData.post(`/images/${category}.json`, imageData)
    .then(res => {
      this.setState({
        title: '',
        category: 'animals',
        url: '',
        progress: 0
      })
      alert('Image was successfully added');
      this.props.fetchImages()
    })
    .catch(err => console.log(err))
  }		

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      this.setState(() => ({ image }))
    }
    const upload = storage.ref(`images/${image.name}`).put(image);
      upload.on('state_changed', 
      (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({ progress })
      }, 
      (err) => {
        console.log(err)
      }, 
      () => {
        storage.ref('images').child(image.name).getDownloadURL()
          .then(url => {
            this.setState({ url })
          })
      })
  }

  render() {

    const { images, data : {userName, displayName, email}} = this.props;
    const { title, category, url, progress } = this.state;

    const renderImages = images.map(image => {
    const values = Object.values(image);

      const item = values.map(el => {
        if (el.email && el.email === email) {
          return (
            <div
              key={el.url}
              className="image-card"
            >

              <img className="uploaded-img" src={el.url} alt={el.title} />
              <span>{el.title}</span>
            </div>
          )
        }
        return null
      })

      return (
        <div
        key={image.id}
        className="image-container"
        >
          {item}
        </div>
      )
    });


    return (
      <section className="account-page">
        <form onSubmit={this.postImageAdd} className="account-form">
        <div className="form-container">
          <div className="input-container">
            <div className="input-group">
              <label htmlFor="mark" className="account-label">Author</label>
              <input type="text" className="input" name="mark" value={userName || displayName} disabled/>
            </div>
            <div className="input-group">
              <label htmlFor="title" className="account-label">Title</label>
              <input type="text" className="input" name="title" value={title} onChange={this.handleChange} required/>
            </div>
            <div className="input-group">
                <label htmlFor="category" className="account-label">Choose category</label>
                <select name="category" className="account-select" value={category} onChange={this.handleChange} required>
                  <option value="animals" className="select-options">Animals</option>
                  <option value="cars" className="select-options">Cars</option>
                  <option value="nature" className="select-options">Nature</option>
                  <option value="technologies">Technologies</option>
                </select>
              </div>
          </div>
            <div className="file-container">
              <progress value={progress} max="100" />
              <label>
              <input type="file" className="file-input" id="image" onChange={this.handleUpload} required/>
              <FontAwesomeIcon icon={faCloudUploadAlt} />
              <img className="uploaded-img" src={url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaOowt_yTa48-y4qF73w-OLzLqrvtrPJITQg&usqp=CAU'} alt="upload" />
              </label>
              <div>
                <button className="btn nav-button add-image-btn">Add Image</button>
              </div>
            </div>
          </div>
          
        </form>
          
        <div>
          <h2 className="heading">My Images</h2>
          {renderImages}
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    images: state.images.images,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchImages: () => dispatch(fetchImages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)