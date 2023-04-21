import { Route, Routes } from 'react-router';
import Missions from './components/routes/Missions';
import Profile from './components/routes/Profile';
import Rockets from './components/routes/Rockets';
import LayOut from './components/view/LayOut';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route index element={<Rockets />} />
        <Route path="missions" element={<Missions />} />
        <Route path="my profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}

export default App;
