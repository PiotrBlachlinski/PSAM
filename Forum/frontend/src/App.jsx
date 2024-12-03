import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './admin/AdminPage';
import PostAdd from './pages/PostAdd';
import ModView from './mod/ModView';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/postAdd' element={<PostAdd />} />
        
        {/* Trasy chronione */}
        <Route path='/modView' element={
          <ProtectedRoute roleRequired="MOD">
            <ModView />
          </ProtectedRoute>
        } />

        <Route path='/admin' element={
          <ProtectedRoute roleRequired="ADMIN">
            <AdminPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
