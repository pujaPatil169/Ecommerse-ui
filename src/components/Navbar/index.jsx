import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser, selectCurrentUser } from '../../features/auth/authSlice';
import { auth } from '../../firebase/firebaseConfig';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Clothes', value: '1' },
  { label: 'Furniture', value: '3' },
  { label: 'Electronics', value: '2' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const reduxUser = useSelector(selectCurrentUser);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Firebase auth state changed:', user);
      setFirebaseUser(user);
    });
    return unsubscribe;
  }, []);

  const user = reduxUser || firebaseUser;
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    navigate(`/?category=${newValue}`);
  };

  const executeSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch();
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <TextField
            fullWidth
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && executeSearch()}
            InputProps={{
              startAdornment: <SearchIcon />
            }}
          />
        </ListItem>

        {categories.map((category) => (
          <ListItem 
            button 
            key={category.value}
            selected={selectedCategory === category.value}
            onClick={() => {
              setSelectedCategory(category.value);
              navigate(`/?category=${category.value}`);
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary={category.label} />
          </ListItem>
        ))}

        <ListItem button component={Link} to="/cart" onClick={toggleDrawer(false)}>
          <ListItemText primary="Cart" />
        </ListItem>

        {user ? (
          <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', mr: 2 }}>
          E-Commerce Store
        </Typography>

        <Tabs 
          value={selectedCategory} 
          onChange={handleCategoryChange}
          textColor="inherit"
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
          {categories.map((category) => (
            <Tab key={category.value} label={category.label} value={category.value} />
          ))}
        </Tabs>

        <Box sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }} />

        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ display: { xs: 'none', md: 'block' } }}
            InputProps={{
              startAdornment: <SearchIcon />
            }}
          />
          
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {user ? (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.email?.charAt(0).toUpperCase()}
              </Avatar>
              <Button color="white" startIcon={<LogoutIcon />} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="white" component={Link} to="/login" sx={{ display: { xs: 'none', md: 'block' } }}>
              Login
            </Button>
          )}

          <IconButton color="inherit" onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
