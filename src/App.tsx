import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CeramicTiles from './pages/CeramicTiles';
import PorcelainTiles from './pages/PorcelainTiles';
import MosaicTiles from './pages/MosaicTiles';
import NaturalStoneTiles from './pages/NaturalStoneTiles';
import GlassTiles from './pages/GlassTiles';
import Purchased from './pages/Purchased';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ceramic" element={<CeramicTiles />} />
            <Route path="/porcelain" element={<PorcelainTiles />} />
            <Route path="/mosaic" element={<MosaicTiles />} />
            <Route path="/natural-stone" element={<NaturalStoneTiles />} />
            <Route path="/glass" element={<GlassTiles />} />
            <Route path="/purchased" element={<Purchased />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App; 