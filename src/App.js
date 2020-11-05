// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Token decoder
import jwtDecode from 'jwt-decode';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/users';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Stylesheet
import './App.css';
import themeFile from './styles/globalStyles';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme(themeFile);


// Determine auth state
const authToken = localStorage.FBIdToken;

if(authToken) {

    const decodedToken = jwtDecode(authToken);
    
    if(decodedToken.exp * 1000 < Date.now()) {
      // logs user out and deletes token from local storage if expired
      store.dispatch(logoutUser());
      window.location.href="/login";
    } else {
      // sets state to authenticated
      store.dispatch({ type: SET_AUTHENTICATED });
      // resets axios headers
      axios.defaults.headers.common['Authorization'] = authToken;
      // fetches user data and updates global state
      store.dispatch(getUserData());
    }
};

function App() {
  return (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route exact path="/users/:handle/post/:postId" component={user} />
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                </Switch>
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
    </Provider>
    
  );
}

export default App;
