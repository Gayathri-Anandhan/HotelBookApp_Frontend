// import { useState } from 'react'
// import './App.css'
// import Login from './pages/Login.jsx'
// import NewRegistration from './pages/NewRegistration.jsx'
// // import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import {Routes, Route, Navigate, useLocation} from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import HotelDetailsList from './pages/HotelDetailsList.jsx'
// import HotelDetails from './pages/HotelDetails.jsx'
// import AddHotel from './pages/HotelDetails.jsx'
// import SearchHotels from './pages/SearchHotels.jsx'
// import BookHotel from './pages/BookHotel.jsx'
// import Payment from './pages/Payment.jsx'
// import BookRoom from './pages/BookRoom.jsx'
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       <BookRoom />
//       <Routes>
//         <Route path="/Login" element={<Login />} />
//         <Route path="/NewRegistration" element={<NewRegistration />} />
//         <Route path="/HotelDetailsList" element={<HotelDetailsList />} />
//         <Route path="/add-hotel/:id" element={<HotelDetails />} />
//         {/* <Route path="/HoteDetails" element={<HotelDetails/>}/> */}
//         <Route path="/add-hotel" element={<AddHotel />} />
//         <Route path="/SearchHotels" element={<SearchHotels />} />
//         <Route path="/BookHotel" element={<BookHotel />} />
//         <Route path="/Payment" element={<Payment />} />
//       </Routes>
//     </div>
//   )
// }

// export default App

import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from "./pages/HomePage";
import SearchHotels from "./pages/SearchHotels";
import BookRoom from "./pages/BookRoom";
import Payment from "./pages/Payment";
import HotelDetailsList from './pages/HotelDetailsList.jsx'
import HotelDetails from './pages/HotelDetails.jsx'
import BookingHistory from "./pages/BookingHistory.jsx";
import { LogIn } from "lucide-react";
import Login from "./pages/Login.jsx";
import NewRegistration from "./pages/NewRegistration.jsx";

function App() {

  return (

    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/NewRegistration" element={<NewRegistration />} />
      <Route path="/search" element={<SearchHotels />} />
      <Route path="/book" element={<BookRoom />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/HotelDetailsList" element={<HotelDetailsList />} />
      <Route path="/add-hotel/:id" element={<HotelDetails />} />
      <Route path="/add-hotel" element={<HotelDetails />} />
      <Route path="/history" element={<BookingHistory />} />
    </Routes>

  )

}

export default App;
