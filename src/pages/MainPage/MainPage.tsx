import Header from '../../components/Header/Header.tsx';
import Post from '../../components/Post/Post.tsx';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import useAuth from '../../hooks/useAuth';
import { mockPosts } from '../../mockData/mockData.ts';
import './MainPage.css'
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm.tsx';

const MainPage = () => {
    const { isLoggedIn } = useAuth();
    return (
        <>
            <Header />
            <div className="main-page">
                <div className="main-page-content">
                    <main className='main-page-container'>
                        {isLoggedIn && (<CreatePostForm />)}
                        <section className="main-page-section">
                            {mockPosts.map((mockPost) => (
                                <Post post={mockPost} key={mockPost.id} />
                            ))}
                        </section>
                    </main>
                </div>
                {isLoggedIn && (<Sidebar />)}
            </div>
            <Footer />
        </>
    );
};

export default MainPage;