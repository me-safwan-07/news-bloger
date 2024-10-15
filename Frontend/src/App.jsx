import './App.css';
import Navbar from './components/Navbar';
import TopHeader from './components/TopHeader';
import WebsiteName from './components/WebsiteName';
import Routers from './Routes';
const App = ({children}) => {

  return (
    <>
      {/* <TopHeader />
      <WebsiteName />
      <Navbar /> */}
      <Routers />
    </>
  );
};

export default App;
