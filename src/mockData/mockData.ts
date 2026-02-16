import type { PostData } from '../interfaces/interfaces.ts';

export const mockUserData = {
    name: 'Pavel',
    surname: 'Synkaruk',
    email: 'pavel@synkaruk.com',
    password: 'password123',
    description: 'Peaked back in elementary school',
    pfplink:
        'https://lastfm.freetls.fastly.net/i/u/770x0/fc1dd6dd023a83813f9fd4694fe2e78f.jpg#fc1dd6dd023a83813f9fd4694fe2e78f',
};

const now = new Date();

export const mockPosts:PostData[]  = [
    {
        id: 1,
        author: {
            name: "sk8r_die_trying",
            pfplink: "https://api.dicebear.com/7.x/avataaars/svg?seed=skater",
        },
        time: new Date(now.getTime() - 5 * 60 * 1000).toISOString(),
        content: "Everyone says kickflips are easier, but heelflips just feel more natural to my feet. Finally cleared the 3-stair at the local park. 🛹🩹",
        image: "https://lastfm.freetls.fastly.net/i/u/770x0/3c7639b3cd18c31717a827bf9e608dec.jpg#3c7639b3cd18c31717a827bf9e608dec",
        likes: 42,
        comments: [
            "Heelflip gang rise up ✊",
            "Post the clip or it didn't happen",
            "RIP your ankles bro"
        ],
        isLiked: false
    },
    {
        id: 2,
        author: {
            name: "pixel_goth_xp",
            pfplink: "https://api.dicebear.com/7.x/avataaars/svg?seed=goth",
        },
        time: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        content: "just recorded a new demo using a guitar hero microphone and fl studio 9. it sounds terrible. link in bio. #epunk #lofi #webcore",
        likes: 128,
        comments: [
            "The crunchier the audio, the better the song.",
            "link is broken?",
            "based"
        ],
        isLiked: false
    },
    {
        id: 3,
        author: {
            name: "SwitchStance",
            pfplink: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        },
        time: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        content: "Why do programmers wear grip tape on their Enter key? ... I'll show myself out.",
        likes: 12,
        comments: [
            "Unfollow.",
            "I actually laughed."
        ],
        isLiked: false
    },
    {
        id: 4,
        author: {
            name: "BitCrushed",
            pfplink: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoey",
        },
        time: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        content: "Nostalgia for a time I never lived in.",
        image: "https://lastfm.freetls.fastly.net/i/u/770x0/90f8f1340ec767bdba50f2c88f710396.jpg#90f8f1340ec767bdba50f2c88f710396",
        likes: 892,
        comments: [
            "Real.",
            "Is this a Screenshot from Serial Experiments Lain?",
            "vibes"
        ],
        isLiked: false
    },
    {
        id: 5,
        author: {
            name: "local_poser",
            pfplink: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
        },
        time: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        content: "Broke my deck trying to impress a girl who listens to 100 gecs. She didn't even look up from her phone.",
        likes: 5,
        comments: [],
        isLiked: false
    }
];

export const mockSidebar = [
    {
        title: 'Suggested people',
        items: [
            {
                id: 1,
                title: 'Pacific Purgatory',
                description: '@paxpacifica',
                pictureLink: 'https://lastfm.freetls.fastly.net/i/u/770x0/5c6cb67ddcfe8b5de5fe0357557bfa86.jpg#5c6cb67ddcfe8b5de5fe0357557bfa86',
            },
                {
                    id: 2,
                    title: 'Leawn',
                    description: '@crustsox',
                    pictureLink: 'https://lastfm.freetls.fastly.net/i/u/770x0/559b80095fec9e836ed0bb89194374b0.jpg#559b80095fec9e836ed0bb89194374b0',
                },
                {
                    id: 3,
                    title: 'Heelflip',
                    description: '@techclub',
                    pictureLink: 'https://lastfm.freetls.fastly.net/i/u/770x0/b98815e043c3e6558ebe3986d73f7d64.jpg#b98815e043c3e6558ebe3986d73f7d64',
                },
                {
                    id: 4,
                    title: 'Rick Reese',
                    description: '@normie70',
                    pictureLink: 'https://lastfm.freetls.fastly.net/i/u/770x0/b19325613c903a3a9562e8865544373d.jpg#b19325613c903a3a9562e8865544373d',
                },
                {
                    id: 5,
                    title: 'Arin',
                    description: '@arin',
                    pictureLink: 'https://lastfm.freetls.fastly.net/i/u/770x0/375f98986c617513e0f2146f374c8ea3.jpg#375f98986c617513e0f2146f374c8ea3',
                }
            ],
    },
    {
        title: 'Communities you might like',
        items: [
            { id: 1, title: 'Tech Club', description: '11.7k members', pictureLink: 'https://lastfm.freetls.fastly.net/i/u/770x0/c2988b9c064c3f6dbd0bced2139ab419.jpg#c2988b9c064c3f6dbd0bced2139ab419' },
            { id: 2, title: 'New World Order', description: '9k members', pictureLink: 'https://lastfm.freetls.fastly.net/i/u/770x0/110b1d0ffa86ebe72311b2cfb0ffca31.jpg#110b1d0ffa86ebe72311b2cfb0ffca31' },
            { id: 3, title: 'Misatocore', description: '1.2k members', pictureLink: 'https://lastfm.freetls.fastly.net/i/u/770x0/dd2227ad55f5eb2d1d834a55afdcb757.jpg#dd2227ad55f5eb2d1d834a55afdcb757' }
        ]
    }
]