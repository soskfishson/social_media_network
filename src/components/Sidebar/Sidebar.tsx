import SidebarItem from '../SidebarItem/SidebarItem.tsx';
import { mockSidebar } from '../../mockData/mockData.ts';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <aside className='sidebar'>
            {mockSidebar.map((sidebarItem) => (
                <SidebarItem
                    key={sidebarItem.title}
                    title={sidebarItem.title}
                    items={sidebarItem.items}
                />
            ))}
        </aside>
    );
}

export default Sidebar;