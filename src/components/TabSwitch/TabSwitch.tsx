import { useState } from 'react';
import './TabSwitch.css';
import Button from '../Button/Button.tsx';
import { ButtonType } from '../../interfaces/interfaces.ts';

interface Tab {
    id: string;
    label: string;
}

interface TabSwitchProps {
    tabs: Tab[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
}

const TabSwitch = ({ tabs, defaultTab, onTabChange }: TabSwitchProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    return (
        <div className="tab-switch">
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    className={`tab-switch-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                    type={ButtonType.BUTTON}
                    label={tab.label}
                />
            ))}
        </div>
    );
};

export default TabSwitch;