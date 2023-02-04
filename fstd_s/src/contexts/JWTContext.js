import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGNIN: (state, action) => {
    const {trainee } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  signin: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  // register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/User/api/V1.0/Account/GetAll');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (userName, password) => {
    // console.log(userName + "gggg"+password)
    const response = await axios({
      url: 'https://localhost:44306/User/api/V1.0/Account/SignIn',
      method:"post",
      // headers: {
      //   "Access-control-Allow-Credentials": true,
      // },
       data: {
        userName,
        password,
      },
    
      
    });
    console.log(response)
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };
const signin = async () => {
   
    console.log("hhh" )
    const response = await axios({
      url: 'https://localhost:44306/MasterData/api/V1.0/Trainee/GetAll',
      method:"get",
      // headers: {
      //   "Access-control-Allow-Credentials": true,
      // },
       data: {
        traineeId
      }, });
    window.localStorage.setItem('accessToken', accessToken);
      
   
    
    const { accessToken} = response.data;
console.log(response)
    dispatch({
      type: 'SIGNIN',
      payload: {
        trainee,
      },
    });
  };

  // const register = async (userName, password, firstName, lastName) => {
  //   const response = await axios.post('/api/account/register', {
  //     userName,
  //     password,
  //     firstName,
  //     lastName,
  //   });
  //   const { accessToken, user } = response.data;

  //   window.localStorage.setItem('accessToken', accessToken);
  //   dispatch({
  //     type: 'REGISTER',
  //     payload: {
  //       user,
  //     },
  //   });
  // };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        signin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
