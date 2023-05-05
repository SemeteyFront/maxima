import Profile from '../pages/Profile'
import NewsPage from "../pages/News/NewsPage";
import Courses from '../pages/Courses/Courses';
import NewsControl from '../pages/NewsControl/NewsControl';
import Teachers from '../pages/Teachers/Teachers';

export const profileConfig = {
    "PARTNER": {
        menu: [
            {
                name: 'Главная',
                path: '/',
                component: <Profile/>,
                isMenuItem: true,
                exact: true,
            },
            {
                name: 'Управление новостями',
                path: '/management',
                component: <NewsControl/>,
                isMenuItem: false,
                exact: true,
            },
            {
                name: 'Курсы',
                component: <Courses />,
                isMenuItem: true,
                exact: true,
                children: [
                    {
                        name: 'Курсы',
                        path: '/course',
                        component: <Courses />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Расписание',
                        path: '/schedule',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Список Дз',
                        path: '/listdz',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Дисциплины',
                        path: '/disciplines',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Архив курсов',
                        path: '/archive',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                ]
            },
            {
                name: 'Пользователи',
                path: '/users',
                // component: <NewsPage />,
                isMenuItem: true,
                exact: true,
                children: [
                    {
                        name: 'Ученики',
                        path: '/students',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Преподаватели',
                        path: '/teachers',
                        component: <Teachers />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Наставники',
                        path: '/mentors',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Работодатели',
                        path: '/employers',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Демо-ученики',
                        path: '/demostudents',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                ]
            },
            {
                name: 'Maxima Play',
                path: 'play',
                // component: <NewsPage />,
                isMenuItem: true,
                exact: true,
            },
            {
                name: 'Дополнительно',
                path: '/additionally',
                // component: <NewsPage />,
                isMenuItem: true,
                exact: true,
                children: [
                    {
                        name: 'Новости',
                        path: '/news',
                        component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Материалы',
                        path: '/materials',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Видеоконференции',
                        path: '/videoconferencing',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'UI Page',
                        path: '/uipage',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'Обращения',
                        path: '/appeals',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                    {
                        name: 'История уведомлений',
                        path: '/notification',
                        // component: <NewsPage />,
                        isMenuItem: true,
                        exact: true,
                    },
                ]
            },
        ],
    },
    "STUDENT": {
        menu: [
        ],
    },
    "TEACHER": {
        menu: [
        ],
    },
    "PUBLIC": {
        menu: [
        ],
    },
}
