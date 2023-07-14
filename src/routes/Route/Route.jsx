import React from 'react';
import {
      createBrowserRouter,

} from "react-router-dom";

import Main from '../../Layout/Main/Main';
import Home from '../../Pages/Home/Home/Home';
import CreateStoryText from '../../Pages/CreacteStrotyText/CreateStoryText';
import Register from '../../Authontication/Ragistations/Ragistions';
import Login from '../../Authontication/Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import UploadForm from '../../Component/Upload video/Upload';
import Profile from '../../Pages/Profilepage/Profile';
import ProfilePost from '../../Pages/Profilepage/ProfilePost';
import Photo from '../../Pages/Profilepage/Photo';
const Route = createBrowserRouter([
      {
            path: '/',
            element: <PrivateRoute> <Main></Main></PrivateRoute>,
            children: [
                  {
                        path: '/',
                        element: <Home></Home>
                  },
                  {
                        path: '/createStory',
                        element: <CreateStoryText></CreateStoryText>

                  },
                   {
                        path: "/profile",
                        element: <Profile></Profile>,
                        children: [
                              {
                                     path:'/profile/post',
                                     element:<ProfilePost></ProfilePost>
                              },
                              {
                                     path:'/profile/photo',
                                     element:<Photo></Photo>
                              }
                        ]
                  },
            ]
      },
      {
            path: '/register',
            element: <Register></Register>
      },
      {
            path: "/login",
            element: <Login></Login>
      },
     
      {
            path: "/upload",
            element: <UploadForm></UploadForm>
      }

])
export default Route;