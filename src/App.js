// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Components
import Navbar from './components/Navbar';

// Stylesheet
import './App.css';
// import theme from './styles/globalStyles';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({

  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00dcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  // form: {
  //   textAlign: 'center'
  // },
  // pageTitle: {
  //     margin: '20px auto 20px auto'
  // },
  // image: {
  //     margin: '10px auto 10px auto'
  // },
  // textField: {
  //     margin: '10px auto 10px auto'
  // },
  // button: {
  //     position: 'relative',
  //     margin: '20px auto 20px auto'
  // },
  // customError: {
  //     color: '#ff3d00',
  //     fontSize: '0.8rem',
  //     marginTop: 10
  // },
  // progress: {
  //     position: 'absolute'
  // }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route path="/login" component={login} />
              <Route path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
