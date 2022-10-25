import axios from "axios";

const GET_DOGS = "GET_DOGS";
const GET_DOGS_SEARCH = "GET_DOGS_SEARCH";
const CREATE_DOG = "CREATE_DOG";
const GET_DOG_DETAIL = "GET_DOG_DETAIL";
const NEXT_PAGE = "NEXT_PAGE";
const PREV_PAGE = "PREV_PAGE";
const CURRENT_PAGE = "CURRENT_PAGE";
const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
const ORDER_BY = "ORDER_BY"
const FILTER_BY = "FILTER_BY"

const getDogs = (dog) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/dogs");
      return dispatch({ type: GET_DOGS, payload: data });
    } catch (error) {
      console.log(error.response.data);
      return dispatch({ type: GET_DOGS, payload: [] });
    }
  };
};

const getDogsSearch = (dog) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/dogs?name=" + dog
      );
      return dispatch({ type: GET_DOGS_SEARCH, payload: data });
    } catch (error) {
      console.log(error.response.data);
      return dispatch({ type: GET_DOGS_SEARCH, payload: [] });
    }
  };
};

const createDog = (dog) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("http://localhost:3001/dogs", dog);
      return dispatch({ type: CREATE_DOG, payload: data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

const getDogDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({ type: GET_DOG_DETAIL, payload: data });
    } catch (error) {
      console.log(error.response.data);
      return dispatch({ type: GET_DOG_DETAIL, payload: [] });
    }
  };
};

const getTemperaments = () => {
    return async (dispatch) => {
        try {
          const { data } = await axios.get("http://localhost:3001/temperaments");
          return dispatch({ type: GET_TEMPERAMENTS, payload: data });
        } catch (error) {
          console.log(error.response.data);
          return dispatch({ type: GET_TEMPERAMENTS, payload: [] });
        }
      };
}

export const orderBy = (order) => {
  return { type: ORDER_BY, payload: order };
};

export const filterBy = (filter) => {

  return {type: FILTER_BY, payload: filter}
}
const nextPage = () => {
  return { type: NEXT_PAGE };
};
const prevPage = () => {
  return { type: PREV_PAGE };
};
const currentPage = (page) => {
  return { type: CURRENT_PAGE, payload: page };
};


export {
  GET_DOGS,
  GET_DOGS_SEARCH,
  CREATE_DOG,
  GET_DOG_DETAIL,
  GET_TEMPERAMENTS,
  NEXT_PAGE,
  PREV_PAGE,
  CURRENT_PAGE,
  ORDER_BY,
  FILTER_BY,
  getDogs,
  getDogsSearch,
  createDog,
  getDogDetail,
  nextPage,
  prevPage,
  currentPage,
  getTemperaments
};
