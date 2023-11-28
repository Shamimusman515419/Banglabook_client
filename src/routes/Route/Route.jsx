
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
import { MyComponent } from "./PrivateRoute/Teaxt";
import MessengerRoute from "../../Pages/MessengerRoute/MessengerRoute";
import VideoPage from "../../Pages/Video/Videopage";
import OtherProfile from "../../Pages/OrthersProfile/OrthersProfile";

import OtherPhoto from "../../Pages/OrthersProfile/OtherPhoto";
import OtherVideo from "../../Pages/OrthersProfile/OtherVideo";
import OtherPost from "../../Pages/OrthersProfile/OtherPost";
import ErrorPage from "../../Component/ErrorPage/ErrorPage";
import Setting from "../../Pages/setting/Setting";
import About from "../../Pages/Profilepage/About";
import OtherAbout from "../../Pages/OrthersProfile/OtherAbout";
import Followers from "../../Pages/Profilepage/followers/Followers";
import OtherFollowers from "../../Pages/OrthersProfile/OtherFollower";
import Massage from "../../Component/Massage.jsx/Massage";
import SinglePost from "../../Pages/Home/SinglePost/SinglePost";

const Route = createBrowserRouter([
      {
            path: '/',
            element: <PrivateRoute> <Main></Main></PrivateRoute>,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                  {
                        path: '/',
                        element: <Home></Home>
                  },
                  {
                        path: '/massage',
                        element: <Massage></Massage>
                  },
                  {
                        path: '/createStory',
                        element: <CreateStoryText></CreateStoryText>

                  },
                  {
                        path: '/post/:id',
                        element: <SinglePost></SinglePost>

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
                              },
                              {
                                    path: '/profile/about',
                                    element: <About></About>
                              },
                              {
                                    path: '/profile/followers',
                                    element: <Followers></Followers>
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
                        path: '/setting',
                        element: <Setting></Setting>
                  },

                  {
                        path: '/weather',
                        element: <WeatherBig></WeatherBig>
                  },
                  {
                        path: '/messenger',
                        element: <MessengerRoute></MessengerRoute>
                  },
                  {
                        path: '/video',
                        element: <VideoPage></VideoPage>
                  },

                  {
                        path: '/otherProfile/profile/:id',
                        element: <OtherProfile></OtherProfile>,
                        children: [
                              {
                                    path: '/otherProfile/profile/:id',
                                    element: <OtherPost></OtherPost>
                              },
                              {
                                    path: '/otherProfile/profile/:id/photo/:id',
                                    element: <OtherPhoto></OtherPhoto>
                              },
                              {
                                    path: '/otherProfile/profile/:id/video/:id',
                                    element: <OtherVideo></OtherVideo>
                              },
                              {
                                    path: '/otherProfile/profile/:id/about/:id',
                                    element: <OtherAbout></OtherAbout>
                              },
                              {
                                    path: '/otherProfile/profile/:id/followers/:id',
                                    element: <OtherFollowers></OtherFollowers>
                              },

                        ]



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
            path: "/text",
            element: <MyComponent></MyComponent>
      },

      {
            path: "/upload",
            element: <UploadForm></UploadForm>
      }

])
export default Route;