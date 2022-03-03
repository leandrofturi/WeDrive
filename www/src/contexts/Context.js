import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  UPDATE: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  update: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = window.localStorage.getItem('user');
        if (user) {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: JSON.parse(user)
            }
          });
        }
        else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const user = window.localStorage.getItem('user');
    if (!user) {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }

    if (email && user?.email === email && password && user?.password === password) {
      dispatch({
        type: 'LOGIN',
        payload: { user }
      });
    }
    else {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  };

  const register = async (email, password, firstName, lastName, companyName) => {
    const user = {
      email,
      password,
      firstName,
      lastName,
      companyName
    };
    window.localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: 'REGISTER',
      payload: { user }
    });
  };

  const update = async (values) => {
    window.localStorage.setItem('user', JSON.stringify(values));

    dispatch({
      type: 'UPDATE',
      payload: { values }
    });
  };

  const logout = async () => {
    window.localStorage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        update,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
