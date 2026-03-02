import { useState, useEffect, useRef } from 'react';
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

const POSTS_PER_PAGE = 5;

const MainPage = () => {
    const { isLoggedIn } = useAuth();
    const { data: posts = [], isLoading, error } = usePostsQuery();
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const visiblePosts = posts.slice(0, visibleCount);
    const hasMore = visibleCount < posts.length;

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + POSTS_PER_PAGE, posts.length));
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [posts.length]);

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
                                visiblePosts.map((post: PostType) => (
                                    <Post post={post} key={post.id} />
                                ))}

                            {!isLoading && posts.length === 0 && !error && (
                                <p className="status-message">No posts to show yet.</p>
                            )}
                        </section>

                        {!isLoading && (
                            <div ref={sentinelRef} className="scroll-sentinel">
                                {hasMore && (
                                    <>
                                        <PostSkeleton />
                                        <PostSkeleton />
                                    </>
                                )}
                            </div>
                        )}
                    </main>
                </div>
                {isLoggedIn && <Sidebar />}
            </div>
            <Footer />
        </>
    );
};

export default MainPage;
