import { 
  FETCH_IMAGES_START, 
  FETCH_IMAGES_SUCCESS, 
  FETCH_IMAGES_ERROR,
  SET_CURRENT_PAGE,
  IMAGES_SET_STATE,
  UPDATE_LIKES,
} from '../actions/action-types'

const initialState = {
  images: [],
  loading: false,
  error: null,
  currentPage: 1,
  imagesPerPage: 10,
  isLiked: false
}

export default function imagesReducer(state = initialState, action) {

  switch(action.type) {

    case FETCH_IMAGES_START: 
      return {
        ...state, loading: true
      }
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state, images: action.fetchedImages, loading: false
      }
    case FETCH_IMAGES_ERROR: 
      return {
        ...state, error: action.error, loading: false
      }
    case UPDATE_LIKES:
      return {
        ...state, isLiked: !state.isLiked
      }
    case IMAGES_SET_STATE:
      return {
        ...state, images: action.images
      }
    case SET_CURRENT_PAGE:
      return {
        ...state, currentPage: action.pageNumber
      }
    
    default: 
      return state;
  }
}