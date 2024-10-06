import GetBlog from '../components/GetBlog';
import Navbar from '../components/Navbar';
import TopHeader from '../components/TopHeader';
import WebsiteName from '../components/WebsiteName';

const Home = () => {

    return (
        <div>
            <TopHeader />
            <WebsiteName />
            <Navbar />
            <GetBlog />
        </div>
    );
};

export default Home;
