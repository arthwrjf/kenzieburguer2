import { ToastContainer, toast } from 'react-toastify';
import { UserProvider } from './providers/UserContext/UserContext';
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />
    <Router />
    <ToastContainer />
  </>
);

export default App;
