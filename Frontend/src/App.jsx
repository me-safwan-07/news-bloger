import './App.css';
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
