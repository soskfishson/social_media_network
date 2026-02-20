import Header from '../../components/Header/Header.tsx';
import Post from '../../components/Post/Post.tsx';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm.tsx';
import useAuth from '../../hooks/useAuth';
import PostSkeleton from '../../components/Skeletons/PostSkeleton';
import './MainPage.css';
import { usePostsQuery } from '../../hooks/usePostsQuery.ts';
import type { Post as PostType } from '../../interfaces/interfaces.ts';

const MainPage = () => {
    const { isLoggedIn } = useAuth();
    const { data: posts = [], isLoading, error } = usePostsQuery();

    return (
        <>
            <Header />
            <div className="main-page">
                <div className="main-page-content">
                    <main className="main-page-container">
                        {isLoggedIn && <CreatePostForm />}

                        <section className="main-page-section">
                            {isLoading && (
                                <>
                                    <PostSkeleton />
                                    <PostSkeleton />
                                    <PostSkeleton />
                                </>
                            )}

                            {error && <p className="status-message error">{error.message}</p>}

                            {!isLoading &&
                                posts.map((post: PostType) => <Post post={post} key={post.id} />)}

                            {!isLoading && posts.length === 0 && !error && (
                                <p className="status-message">No posts to show yet.</p>
                            )}
                        </section>
                    </main>
                </div>
                {isLoggedIn && <Sidebar />}
            </div>
            <Footer />
        </>
    );
};

export default MainPage;
