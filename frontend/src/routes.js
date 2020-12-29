// icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import Notifications from "@material-ui/icons/Notifications";

// core components and views for Student layout.

import StudentDashboard from "views/StudentDashboard/StudentDashboard.js";
import FeedbackPage from "views/Feedback/Feedback.js";
import StudentProfile from "views/UserProfile/UserProfile.js";


const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Home",
        icon: Dashboard,
        component: StudentDashboard,
        layout: "/student"
    },
    {
        path: "/user",
        name: "Student Profile",
        icon: Person,
        component: StudentProfile,
        layout: "/student"
    },
    {
        path: "/feedback",
        name: "Feedback",
        icon: Notifications,
        component: FeedbackPage,
        layout: "/student"
    }
];

export default dashboardRoutes;
