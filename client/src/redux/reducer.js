import {
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

} from "./actions";

const initialState = {
  dogs: [],
  copyDogs: [],
  dogDetail: [],
  temperaments: [],
  page: 1,
  dogsPerPage: 15,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BY: 
    switch (action.payload) {
        case "default":
          return {
            ...state,
            dogs: state.copyDogs,
          }
        case "api":
          return {
            ...state,
            dogs: state.copyDogs.filter(p => p.temperaments),
          }
        case "db":
          return {
            ...state,
            dogs: state.copyDogs.filter(p => p.Temperaments),
          }
        case "A-Z":
          return {
            ...state,
            dogs: [...state.dogs].sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            ),
          };
        case "Z-A":
          return {
            ...state,
            dogs: [...state.dogs].sort((a, b) =>
              b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            ),
          };

        case "desc":
          return {
            ...state,
            dogs: [...state.dogs].sort((a, b) => b.attack - a.attack),
          };
        case "asc":
          return {
            ...state,
            dogs: [...state.dogs].sort((a, b) => a.attack - b.attack),
          };

        default:
          return { ...state };
      }
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        copyDogs: action.payload,
      };

    case GET_DOGS_SEARCH:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DOG_DETAIL : {
        return {
            ...state,
            dogDetail: action.payload
        }
    }

    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case CURRENT_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
