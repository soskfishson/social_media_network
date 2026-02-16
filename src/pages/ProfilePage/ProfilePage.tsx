import { useState } from 'react';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import TabSwitch from '../../components/TabSwitch/TabSwitch.tsx'
import './ProfilePage.css';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo.tsx';

const ProfilePage = () => {
    const [currentTab, setCurrentTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile Info' },
        { id: 'statistics', label: 'Statistics' }
    ];

    const handleTabChange = (tabId: string) => {
        setCurrentTab(tabId);
    };

    return (
        <div className='profile-page-container'>
            <Header/>
                <div className="profile-page">
                    <TabSwitch
                        tabs={tabs}
                        defaultTab="profile"
                        onTabChange={handleTabChange}
                    />

                    {currentTab === 'profile' && (
                        <ProfileInfo/>
                    )}

                    {currentTab === 'statistics' && (
                        <div>Statistics Content</div>
                    )}
                </div>
            <Footer/>
        </div>
    )
}

export default ProfilePage;