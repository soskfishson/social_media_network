import { useEffect, useState } from 'react';
import SidebarItem, { type LinkableItem } from '../SidebarItem/SidebarItem.tsx';
import SidebarItemSkeleton from '../Skeletons/SidebarItemSkeleton';
import './Sidebar.css';
import type { Group, SuggestedUser } from '../../interfaces/interfaces.ts';

interface SidebarState {
    suggestedUsers: LinkableItem[];
    groups: LinkableItem[];
    isLoading: boolean;
    error: string | null;
}

const Sidebar = () => {
    const [sidebarData, setSidebarData] = useState<SidebarState>({
        suggestedUsers: [],
        groups: [],
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers: HeadersInit = {
                    'Content-Type': 'application/json',
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const usersRes = await fetch('/api/getSuggested', {
                    method: 'GET',
                    headers,
                });

                const groupsRes = await fetch('/api/groups', {
                    method: 'GET',
                    headers,
                });

                if (!usersRes.ok || !groupsRes.ok) {
                    throw new Error('Failed to fetch sidebar data');
                }

                const users = (await usersRes.json()).map((user: SuggestedUser) => ({
                    id: user.id,
                    title: `${user.firstName} ${user.secondName}`,
                    description: user.username || 'Suggested for you',
                    pictureLink: user.photo || '/assets/default-avatar.png',
                })) as LinkableItem[];
                const groups = (await groupsRes.json()).map((group: Group) => ({
                    id: group.id,
                    title: group.title,
                    description: `${group.membersCount} members`,
                    pictureLink: group.photo || '/assets/default-group.png',
                })) as LinkableItem[];

                setSidebarData({
                    suggestedUsers: users,
                    groups,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                setSidebarData((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: error instanceof Error ? error.message : 'An error occurred',
                }));
            }
        };

        fetchSidebarData();
    }, []);

    return (
        <aside className="sidebar">
            {sidebarData.isLoading ? (
                <>
                    <SidebarItemSkeleton title="Suggested people" count={5} />
                    <SidebarItemSkeleton title="Communities you might like" count={4} />
                </>
            ) : (
                <>
                    <SidebarItem title="Suggested people" items={sidebarData.suggestedUsers} />
                    <SidebarItem title="Communities you might like" items={sidebarData.groups} />
                </>
            )}
        </aside>
    );
};

export default Sidebar;
