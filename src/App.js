import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'

import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'
import Profile from './components/pages/User/Profile'
import MyPets from './components/pages/Pets/MyPets'
import RegisterPet from './components/pages/Pets/RegisterPet'
import EditPet from './components/pages/Pets/EditPet'
import Pet from './components/pages/Pets/Pet'

import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        < Message />
        <Container>
          <Routes>
            <Route path='/login' element={< Login />} />
            <Route path='/register' element={< Register />} />
            <Route path='/pets/mypets' element={< MyPets />} />
            <Route path='/' element={< Home />} />
            <Route path='/pets/create' element={< RegisterPet />} />
            <Route path='/pets/edit/:id' element={< EditPet />} />
            <Route path='/user/profile' element={< Profile />} />
            <Route path='/pets/:id' element={< Pet />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
