import './App.css'
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PostAdd from './pages/PostAdd';
import ModView from './pages/ModView';

function App() {

  return (

    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/postAdd' element={<PostAdd />} />
        <Route path='/modView' element={<ModView />} />
        



      </Route>
      
    </Routes>

    
    
  )
}

export default App
