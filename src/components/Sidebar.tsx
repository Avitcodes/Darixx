import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Ceramic Tiles', icon: <HomeIcon />, path: '/ceramic' },
  { text: 'Porcelain Tiles', icon: <HomeIcon />, path: '/porcelain' },
  { text: 'Mosaic Tiles', icon: <HomeIcon />, path: '/mosaic' },
  { text: 'Natural Stone Tiles', icon: <HomeIcon />, path: '/natural-stone' },
  { text: 'Glass Tiles', icon: <HomeIcon />, path: '/glass' },
  { text: 'Purchased', icon: <ShoppingCartIcon />, path: '/purchased' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Typography variant="h6" sx={{ p: 2 }}>
        Tile Gallery
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 