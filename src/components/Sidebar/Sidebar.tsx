import SidebarItem from '../SidebarItem/SidebarItem.tsx';
import { mockSuggestedPeople, mockCommunities } from '../../mockData/mockData.ts';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <SidebarItem title="Suggested people" items={mockSuggestedPeople} />
            <SidebarItem title="Communities you might like" items={mockCommunities} />
        </aside>
    );
}

export default Sidebar;