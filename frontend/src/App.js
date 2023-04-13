import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Login from './Pages/Admin/login/Login';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import { ResizeProvider } from './Context/ResizeContext';
import Users from './Pages/Admin/Users/Users';
import Guides from './Pages/Admin/Guides/Guides';
import Destinations from './Pages/Admin/Destinations/Destinations';
import UserAdd from './Pages/Admin/UserAdd/UserAdd';
import GuideAdd from './Pages/Admin/GuideAdd/GuideAdd';
import DestinationAdd from './Pages/Admin/DestinationAdd/DestinationAdd';
import DestinationView from './Pages/Admin/DestinationView/DestinationView';
import DestinationUpdate from './Pages/Admin/DestinationUpdate/DestinationUpdate';
import Authentication from './Pages/Users/Authentication/Authentication';
import Landing from './Pages/Users/Landing/Landing';
import Destination from './Pages/Users/Destination/Destination';
import Guide from './Pages/Users/Guide/Guide';
import GuideLogin from './Pages/Guides/login/GuideLogin';
import GuideHome from './Pages/Guides/Home/GuideHome';
import GuideSchedule from './Pages/Guides/Schedule/GuideSchedule';
import ProfileEdit from './Pages/Guides/ProfileEdit/ProfileEdit';
import Chat from './Pages/Users/Chat/Chat';
import Checkout from './Pages/Users/Checkout/Checkout';
import { UserIsLoggedInProvider } from './Context/UserIsLoggedIn';
import AllBookings from './Pages/Users/AllBookings/AllBookings';
import AdminBookings from './Pages/Admin/Bookings/AdminBookings';
import Payments from './Pages/Admin/Payments/Payments';
import Payment from './Pages/Guides/Payment/Payment';
import GuideChat from './Pages/Guides/Chat/GuideChat';
import Profile from './Pages/Users/Profile/Profile';


function App() {
  return (
    <div className="App">
      <ResizeProvider>
      <UserIsLoggedInProvider>
      <Router>
       <Routes>

          {/* <------- Admin Routes -------> */}

         <Route path="/admin" element={<Login/>} />
         <Route path="/admin/dashboard" element={<Dashboard/>} />
         <Route path="/admin/payments" element={<Payments/>} />
         <Route path="/admin/users" element={<Users/>} />
         <Route path="/admin/users/add" element={<UserAdd/>} />
         <Route path="/admin/guides" element={<Guides/>} />
         <Route path="/admin/guides/add" element={<GuideAdd/>} />
         <Route path="/admin/destinations" element={<Destinations/>} />
         <Route path="/admin/destination/add" element={<DestinationAdd/>} />
         <Route path="/admin/destinations/:destinationId" element={<DestinationView/>} />
         <Route path="/admin/destinations/update/:destinationId" element={<DestinationUpdate/>} />
         <Route path="/admin/bookings" element={<AdminBookings/>} />

         {/* <------- User Routes -------> */}

         <Route path="/" exact element={<Landing/>} />
         <Route path="/login" element={<Authentication/>} />
         <Route path="/signup" element={<Authentication/>} />
         <Route path="/destination/:destinationId" element={<Destination/>} />
         <Route path="/guide/:guideId" element={<Guide/>} />
         <Route path="/checkout" element={<Checkout/>} />
         <Route path="/chat" element={<Chat/>} />
         <Route path="/chat/:chatId" element={<Chat/>} />
         <Route path="/bookings" element={<AllBookings/>} />
         <Route path="/profile" element={<Profile/>} />

         {/* <------- Guide Routes -------> */}

         <Route path="/guide" element={<GuideLogin/>} />
         <Route path="/guide/profile" element={<GuideHome/>} />
         <Route path="/guide/profile/edit" element={<ProfileEdit/>} />
         <Route path="/guide/bookings" element={<GuideSchedule/>} />
         <Route path="/guide/payments" element={<Payment/>} />
         <Route path="/guide/chat" element={<GuideChat/>} />
         <Route path="/guide/chat/:chatId" element={<GuideChat/>} />
        


        </Routes>
      </Router>
      </UserIsLoggedInProvider>
      </ResizeProvider>
    
    </div>
  );
}

export default App;
