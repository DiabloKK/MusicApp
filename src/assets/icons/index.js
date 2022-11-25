// export const icons = {
//     playList: require('~/assets/icons/playList.svg').default,
//     musicLiBrary: require('~/assets/icons/musicLibrary.svg').default,
//     home: require('~/assets/icons/Home.svg').default,
//     playQueue: require('~/assets/icons/playQueue.svg').default,
// };
export const UploadIcon = ({ width = '2rem', height = '2rem', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2.5C7.58579 2.5 7.25 2.83579 7.25 3.25V7.25H3.25C2.83579 7.25 2.5 7.58579 2.5 8C2.5 8.41421 2.83579 8.75 3.25 8.75H7.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V8.75H12.75C13.1642 8.75 13.5 8.41421 13.5 8C13.5 7.58579 13.1642 7.25 12.75 7.25H8.75V3.25C8.75 2.83579 8.41421 2.5 8 2.5Z"
        ></path>
    </svg>
);
export const MessageIcon = ({ width = '2.6rem', height = '2.6rem', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 48 48"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.17877 7.17357C2.50304 6.45894 3.21528 6 4.00003 6H44C44.713 6 45.372 6.37952 45.7299 6.99615C46.0877 7.61278 46.0902 8.37327 45.7365 8.99228L25.7365 43.9923C25.3423 44.6821 24.5772 45.0732 23.7872 44.9886C22.9972 44.9041 22.3321 44.3599 22.0929 43.6023L16.219 25.0017L2.49488 9.31701C1.97811 8.72642 1.85449 7.88819 2.17877 7.17357ZM20.377 24.8856L24.531 38.0397L40.5537 10H8.40757L18.3918 21.4106L30.1002 14.2054C30.5705 13.9159 31.1865 14.0626 31.4759 14.533L32.5241 16.2363C32.8136 16.7066 32.6669 17.3226 32.1966 17.612L20.377 24.8856Z"
        ></path>
    </svg>
);

export const InboxIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.0362 21.3333H18.5243L15.9983 24.4208L13.4721 21.3333H7.96047L7.99557 8H24.0009L24.0362 21.3333ZM24.3705 23.3333H19.4721L17.2883 26.0026C16.6215 26.8176 15.3753 26.8176 14.7084 26.0026L12.5243 23.3333H7.62626C6.70407 23.3333 5.95717 22.5845 5.9596 21.6623L5.99646 7.66228C5.99887 6.74352 6.74435 6 7.66312 6H24.3333C25.2521 6 25.9975 6.7435 26 7.66224L26.0371 21.6622C26.0396 22.5844 25.2927 23.3333 24.3705 23.3333ZM12.6647 14C12.2965 14 11.998 14.2985 11.998 14.6667V15.3333C11.998 15.7015 12.2965 16 12.6647 16H19.3313C19.6995 16 19.998 15.7015 19.998 15.3333V14.6667C19.998 14.2985 19.6995 14 19.3313 14H12.6647Z"
        ></path>
    </svg>
);

export const SearchIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 48 48"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
        ></path>
    </svg>
);

export const PlayQueueIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_24_3161)">
            <path
                d="M27.5 4.6875H2.5C1.9875 4.6875 1.5625 4.2625 1.5625 3.75C1.5625 3.2375 1.9875 2.8125 2.5 2.8125H27.5C28.0125 2.8125 28.4375 3.2375 28.4375 3.75C28.4375 4.2625 28.0125 4.6875 27.5 4.6875Z"
                fill="currentColor"
            />
            <path
                d="M13.75 12.1875H2.5C1.9875 12.1875 1.5625 11.7625 1.5625 11.25C1.5625 10.7375 1.9875 10.3125 2.5 10.3125H13.75C14.2625 10.3125 14.6875 10.7375 14.6875 11.25C14.6875 11.7625 14.2625 12.1875 13.75 12.1875Z"
                fill="currentColor"
            />
            <path
                d="M10 19.6875H2.5C1.9875 19.6875 1.5625 19.2625 1.5625 18.75C1.5625 18.2375 1.9875 17.8125 2.5 17.8125H10C10.5125 17.8125 10.9375 18.2375 10.9375 18.75C10.9375 19.2625 10.5125 19.6875 10 19.6875Z"
                fill="currentColor"
            />
            <path
                d="M7.5 27.1875H2.5C1.9875 27.1875 1.5625 26.7625 1.5625 26.25C1.5625 25.7375 1.9875 25.3125 2.5 25.3125H7.5C8.0125 25.3125 8.4375 25.7375 8.4375 26.25C8.4375 26.7625 8.0125 27.1875 7.5 27.1875Z"
                fill="currentColor"
            />
            <path
                d="M14.8002 28.4377C12.7877 28.4377 11.1377 26.8002 11.1377 24.7752C11.1377 22.7627 12.7752 21.1127 14.8002 21.1127C16.8252 21.1127 18.4627 22.7502 18.4627 24.7752C18.4627 26.8002 16.8252 28.4377 14.8002 28.4377ZM14.8002 23.0002C13.8127 23.0002 13.0127 23.8002 13.0127 24.7877C13.0127 25.7752 13.8127 26.5752 14.8002 26.5752C15.7877 26.5752 16.5877 25.7752 16.5877 24.7877C16.5877 23.8002 15.7877 23.0002 14.8002 23.0002Z"
                fill="currentColor"
            />
            <path
                d="M17.525 25.7126C17.0125 25.7126 16.5875 25.2876 16.5875 24.7751V13.8126C16.5875 12.3001 17.4875 11.1126 18.95 10.7251L24.3875 9.23762C25.575 8.91262 26.6 9.03759 27.325 9.60009C28.05 10.1626 28.425 11.0751 28.425 12.3376V22.9751C28.425 23.4876 28 23.9126 27.4875 23.9126C26.975 23.9126 26.55 23.4876 26.55 22.9751V12.3376C26.55 11.7126 26.425 11.2751 26.1875 11.1001C25.95 10.9126 25.4625 10.9001 24.875 11.0626L19.4375 12.5501C19.075 12.6501 18.4625 12.9501 18.4625 13.8376V24.8001C18.4625 25.3001 18.0375 25.7126 17.525 25.7126Z"
                fill="currentColor"
            />
            <path
                d="M24.7752 26.6251C22.7627 26.6251 21.1127 24.9876 21.1127 22.9626C21.1127 20.9501 22.7502 19.3001 24.7752 19.3001C26.8002 19.3001 28.4377 20.9376 28.4377 22.9626C28.4377 24.9876 26.8002 26.6251 24.7752 26.6251ZM24.7752 21.1876C23.7877 21.1876 22.9877 21.9876 22.9877 22.9751C22.9877 23.9626 23.7877 24.7626 24.7752 24.7626C25.7627 24.7626 26.5627 23.9626 26.5627 22.9751C26.5627 21.9876 25.7627 21.1876 24.7752 21.1876Z"
                fill="currentColor"
            />
            <path
                d="M17.5252 17.9375C17.1127 17.9375 16.7377 17.6625 16.6252 17.25C16.4877 16.75 16.7877 16.2376 17.2877 16.1001L27.2627 13.3751C27.7627 13.2376 28.2752 13.5375 28.4127 14.0375C28.5502 14.5375 28.2502 15.0501 27.7502 15.1876L17.7752 17.9126C17.6877 17.9251 17.6002 17.9375 17.5252 17.9375Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_24_3161">
                <rect width="30" height="30" fill="currentColor" />
            </clipPath>
        </defs>
    </svg>
);
export const HomeIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M18.475 26.5625H11.525V19.125C11.525 18.4375 12.0875 17.875 12.775 17.875H17.225C17.9125 17.875 18.475 18.4375 18.475 19.125V26.5625V26.5625Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M26.5625 14.2375V22.625C26.5625 24.8 24.8875 26.5625 22.8125 26.5625H7.1875C5.1125 26.5625 3.4375 24.8 3.4375 22.625V14.2375C3.4375 13.0625 
3.925 11.9625 4.7875 11.2125L12.6 4.34999C13.9875 3.12499 16.0125 3.12499 17.4 4.34999L25.2125 11.2125C26.075 11.9625 26.5625 13.0625 26.5625 14.2375Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const PlayListIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M23.55 9.18751H18.7625C17.8625 9.18751 17.025 8.71251 16.5625 7.93751L15.75 6.57501C15.2875 5.80001 14.45 5.32501 13.55 5.32501H6.0125C4.5875 5.32501 3.4375 6.47501 3.4375 7.90001V11.75L3.4375 12.1623C3.4375 12.3052 3.4375 12.0375 3.4375 12.1875V21.625C3.4375 23.2875 4.7875 24.6375 6.45 24.6375H23.55C25.2125 24.6375 26.5625 23.2875 26.5625 21.625V12.1875C26.5625 10.5375 25.2125 9.18751 23.55 9.18751Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M23.55 9.18752H3.4375V21.65C3.4375 23.3125 4.7875 24.6625 6.45 24.6625H23.55C25.2125 24.6625 26.5625 23.3125 26.5625 21.65V12.2125C26.5625 10.5375 25.2125 9.18752 23.55 9.18752Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const MusicLiBraryIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M26.25 10.8125V17.9375C26.25 18.3625 26.2375 18.775 26.2125 19.1625C25.3125 18.1375 23.975 17.5 22.5 17.5C19.7375 17.5 17.5 19.7375 17.5 22.5C17.5 23.4375 17.7625 24.325 18.225 25.075C18.475 25.5 18.8 25.8875 19.175 26.2125C18.7875 26.2375 18.375 26.25 17.9375 26.25H10.8125C4.87499 26.25 2.5 23.875 2.5 17.9375V10.8125C2.5 4.87503 4.87499 2.5 10.8125 2.5H17.9375C23.875 2.5 26.25 4.87503 26.25 10.8125Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.40002 18.025C9.40104 18.025 10.2125 17.2135 10.2125 16.2125C10.2125 15.2114 9.40104 14.4 8.40002 14.4C7.399 14.4 6.58752 15.2114 6.58752 16.2125C6.58752 17.2135 7.399 18.025 8.40002 18.025Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16.85 15V7.92501C16.85 6.41251 15.9001 6.21247 14.9501 6.47497L11.3376 7.46244C10.6876 7.63744 10.225 8.16248 10.225 8.91248V10.175V11.025V16.2124"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15.0375 16.8125C16.0385 16.8125 16.85 16.001 16.85 15C16.85 13.999 16.0385 13.1875 15.0375 13.1875C14.0365 13.1875 13.225 13.999 13.225 15C13.225 16.001 14.0365 16.8125 15.0375 16.8125Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10.2125 11.0375L16.85 9.22501"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M27.5 22.5C27.5 23.4375 27.2375 24.325 26.775 25.075C25.9125 26.525 24.325 27.5 22.5 27.5C20.675 27.5 19.0875 26.525 18.225 25.075C17.7625 24.325 17.5 23.4375 17.5 22.5C17.5 19.7375 19.7375 17.5 22.5 17.5C25.2625 17.5 27.5 19.7375 27.5 22.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M24.3625 22.475H20.6375"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M22.5 20.65V24.3875"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const AddPlayQueueIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15.4125 21.8125C15.1875 21.8875 14.8 21.8875 14.575 21.8125C12.625 21.15 8.25 18.3625 8.25 13.6375C8.25 11.55 9.925 9.86255 12 9.86255C13.225 9.86255 14.3125 10.45 15 11.375C15.675 10.4625 16.775 9.86255 18 9.86255C20.075 9.86255 21.75 11.55 21.75 13.6375C21.75 18.3625 17.375 21.15 15.4125 21.8125Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const AddPlayListIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 20V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
            d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const DeleteIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.25 8.75H23.75V25.5C23.75 26.6046 22.8546 27.5 21.75 27.5H8.25C7.14543 27.5 6.25 26.6046 6.25 25.5V8.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path d="M12.5 13.75V21.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17.5 13.75V21.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
            d="M11.25 3.5C11.25 2.94772 11.6977 2.5 12.25 2.5H17.75C18.3023 2.5 18.75 2.94772 18.75 3.5V5H11.25V3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M3.75 6.875C3.75 5.83947 4.58947 5 5.625 5H24.375C25.4105 5 26.25 5.83947 26.25 6.875V6.875C26.25 7.91053 25.4105 8.75 24.375 8.75H5.625C4.58947 8.75 3.75 7.91053 3.75 6.875V6.875Z"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);
export const UploadFolderIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3 6V16.8C3 17.9201 3 18.4801 3.21799 18.908C3.40973 19.2843 3.71547 19.5902 4.0918 19.782C4.51962 20 5.08009 20 6.2002 20H17.8002C18.9203 20 19.48 20 19.9078 19.782C20.2841 19.5902 20.5905 19.2843 20.7822 18.908C21.0002 18.4801 21.0002 17.9201 21.0002 16.8L21.0002 9.20002C21.0002 8.07992 21.0002 7.51986 20.7822 7.09204C20.5905 6.71572 20.2841 6.40973 19.9078 6.21799C19.48 6 18.9201 6 17.8 6H14M3 6H14M3 6C3 4.89543 3.89543 4.5 5 4.5H11.5C12.5004 4.49999 13.3105 5.3103 13.9737 5.97368L14 6M12 10V16M9 13H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
