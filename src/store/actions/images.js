import axiosData from '../../service/axiosData'
import { 
  FETCH_IMAGES_START, 
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_ERROR, 
  SET_CURRENT_PAGE, 
  IMAGES_SET_STATE,
  UPDATE_LIKES,
} from './action-types'

export function fetchImages() {
  return async dispatch => {
    dispatch(fetchImagesStart())
    await axiosData.get('/images.json')
    .then(res => {
      const fetchedImages = [];
      for (let key in res.data) {
        fetchedImages.push({
          ...res.data[key],
          id: key
        })
      }
      dispatch(fetchImagesSuccess(fetchedImages))
    })
    .catch(err => dispatch(fetchImagesError(err))); 
  }
}

export function fetchedImagesByCategory(category) {
  return async dispatch => {
    dispatch(fetchImagesStart())
    await axiosData.get(`/images/${category}.json`)
    .then(res => {
      const fetchedImages = [];
      for (let key in res.data) {
        fetchedImages.push({
          ...res.data[key],
          id: key
        })
      }
      dispatch(fetchImagesSuccess(fetchedImages))
    })
    .catch(err => dispatch(fetchImagesError(err))); 
  }
}

export function fetchImagesStart() {
  return {
    type: FETCH_IMAGES_START
  }
}

export function fetchImagesSuccess(fetchedImages) {
  return {
    type: FETCH_IMAGES_SUCCESS,
    fetchedImages
  }
}

export function fetchImagesError(err) {
  return {
    type: FETCH_IMAGES_ERROR,
    error: err
  }
}

export function paginate(pageNumber) {
  return dispatch => dispatch(setCurrentPage(pageNumber))
};

export function likeImage(id, el, e, author) {
  return dispatch => {
   
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
  .then(dispatch(updateLikes()))
  .catch(err => console.log(err))	
  }
}

export function updateLikes() {
  return {
    type: UPDATE_LIKES,
  }
}

export function imagesSetState(images) {
  return {
    type: IMAGES_SET_STATE,
    images
  }
}

export function setCurrentPage(pageNumber) {
  return {
    type: SET_CURRENT_PAGE,
    pageNumber
  }
}