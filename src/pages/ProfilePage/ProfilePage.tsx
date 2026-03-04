import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TabSwitch from '../../components/TabSwitch/TabSwitch';
import './ProfilePage.css';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
    const [currentTab, setCurrentTab] = useState('profile');
    const { t } = useTranslation();
    const tabs = [
        { id: 'profile', label: t('profile.profileInfo') },
        { id: 'statistics', label: t('profile.statistics') },
    ];

    const handleTabChange = (tabId: string) => {
        setCurrentTab(tabId);
    };

    return (
        <div className="profile-page-container page-transition-wrapper">
            <Header />
            <div className="profile-page">
                <TabSwitch tabs={tabs} defaultTab="profile" onTabChange={handleTabChange} />

                {currentTab === 'profile' && <ProfileInfo />}

                {currentTab === 'statistics' && <div>{t('profile.statistics')}</div>}
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
