// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Token decoder
import jwtDecode from 'jwt-decode';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Stylesheet
import './App.css';
import themeFile from './styles/globalStyles';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import JwtDecode from 'jwt-decode';

const theme = createMuiTheme(themeFile);

const authToken = localStorage.FBIdToken;
let authenticated;

if(authToken) {

    const decodedToken = jwtDecode(authToken);
    if(decodedToken.exp * 1000 < Date.now()) {
      window.location.href="/login";
      authenticated = false;
    } else {
      authenticated = true;
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
                  <AuthRoute path="/login" component={login} authenticated={authenticated} />
                  <AuthRoute path="/signup" component={signup} authenticated={authenticated} />
                </Switch>
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
    </Provider>
    
  );
}

export default App;
