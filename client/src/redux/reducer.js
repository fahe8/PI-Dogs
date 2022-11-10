import {
  GET_DOGS,
  GET_DOGS_SEARCH,
  GET_DOG_DETAIL,
  GET_TEMPERAMENTS,
  DELETE_DOG,
  CREATE_DOG,
  NEXT_PAGE,
  PREV_PAGE,
  CURRENT_PAGE,
  ORDER_BY,
  FILTER_BY,
  LOADING
} from "./actions";

const initialState = {
  allDogsDefault: [],
  dogs: [],
  dogsApi:[],
  dogsDb:[],
  copyDogs: [],
  dogDetail: [],
  temperaments: [],
  copyTemperaments: [],
  createDog:'',
  page: 1,
  dogsPerPage: 9,
  loading: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BY:
      switch (action.payload) {
        
        case "dogs":

          return {
            ...state,
            dogs: state.allDogsDefault
          }
        case "copyDogs":
          return {
            ...state,
            dogs: state.copyDogs,
            page:1
          };
        case "dogsApi":
          return {
            ...state,
            dogs: state.dogsApi,
            page:1
          };
        case "dogsDb":
          return {
            ...state,
            dogs: state.dogsDb,
            page:1
          };
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
            dogs: [...state.dogs].sort((a, b) => b.maxWeight - a.maxWeight),
          };
        case "asc":
          return {
            ...state,
            dogs: [...state.dogs].sort((a, b) => a.minWeight - b.minWeight),
          };
        default:
          return { ...state, dogs: [...state.dogs] };
      }

    case FILTER_BY:
      console.log(action.payload.from)
      let aux = state[action.payload.from];
      for (const i of action.payload.temps) {
        const dogsFilter = aux.filter(
          (f) =>
            f.temperaments?.includes(i) ||
            f.Temperaments?.some((g) => g.name === i)
        );
        aux = dogsFilter;
      }
      return {
        ...state,
        dogs: action.payload.length === 0 ? state.copyDogs : [...aux],
        page: 1
      };
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        copyDogs: action.payload,
        allDogsDefault: action.payload,
        dogsApi:action.payload.filter((p) =>  typeof p.id ==='number'),
        dogsDb:action.payload.filter((p) =>   typeof p.id ==='string'),
        loading:false
      };

    case GET_DOGS_SEARCH:
      return {
        ...state,
        dogs: action.payload,
        copyDogs: action.payload,
        dogsApi:action.payload.filter((p) =>  typeof p.id ==='number'),
        dogsDb:action.payload.filter((p) =>   typeof p.id ==='string'),
        page: 1
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
        loading: false
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
        copyTemperaments: action.payload,
      };

    case CREATE_DOG: 
    return {
      ...state,
      createDog: action.payload
    }

    case DELETE_DOG : {
      return {
        ...state,
        dogs: [...state.dogs].filter(d => d.id !== action.payload),
        copyDogs: [...state.copyDogs].filter(d => d.id !== action.payload),
        dogsDb:[...state.dogsDb].filter(d => d.id !== action.payload)
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

      case LOADING:
        return {
          ...state,
          loading:true
        }
    default:
      return { ...state };
  }
};

export default rootReducer;
