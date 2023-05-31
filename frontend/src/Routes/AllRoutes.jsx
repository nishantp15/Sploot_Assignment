import Home from './Home'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from '../Components/PrivateRoute';
function AllRoutes() {
  
  return <div>{/* Add Home, Login dashboard and restaurant pages */}
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login />} />
    <Route path='/dashboard' element={<PrivateRoute>
      <Dashboard/>
    </PrivateRoute>}/>
    </Routes>
  </div>;
}

export default AllRoutes;
