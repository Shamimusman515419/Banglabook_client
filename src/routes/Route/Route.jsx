
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
import Video from '../../Pages/Profilepage/Video';
import ViewStrory from '../../Pages/ViewStory/ViewStrory';
import Friends from '../../Pages/Friends/Frienda';
import YourFriend from '../../Pages/Friends/YourFriend';
import SuggestFriends from "../../Pages/Friends/SuggestFriends";

import WeatherBig from "../../Pages/Home/Weather/WeatherBig";
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
                                    path: '/profile/post',
                                    element: <ProfilePost></ProfilePost>
                              },
                              {
                                    path: '/profile/photo',
                                    element: <Photo></Photo>
                              },
                              {
                                    path: '/profile/video',
                                    element: <Video></Video>
                              }
                        ]
                  },
                  {
                        path: '/friends/yourFriends',
                        element: <Friends></Friends>,
                        children: [
                              {
                                    path: '/friends/yourFriends',
                                    element: <YourFriend></YourFriend>
                              },
                   ]
                  },
                  {
                        path: '/friends/suggestFriends',
                        element: <Friends></Friends>,
                        children: [
                              {
                                    path: '/friends/suggestFriends',
                                    element: <SuggestFriends></SuggestFriends>
                              }


                        ]
                  },
                  {
                        path:'/weather',
                        element:<WeatherBig></WeatherBig>
                  }
            ]
      },
      {
            path: '/story',
            element: <PrivateRoute><ViewStrory></ViewStrory></PrivateRoute>

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