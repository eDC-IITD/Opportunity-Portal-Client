import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import eDCLogo from '../../assets/eDCWhiteLogo.svg';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';

// const pages = [
//   {
//     page: "Internship",
//     route: "internship"
//   },
//   {
//     page: "Job",
//     route: "internship"
//   },
//   {
//     page: "Cofounder",
//     route: "internship"
//   }
// ]

function ResponsiveAppBar({ mode, setMode }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    handleCloseUserMenu();
    // setStartUpDetails(null);
    localStorage.removeItem('adminCode');
    localStorage.removeItem('userID');
    navigate('/');
  };

  const changeMode = () => {
    if (mode === 'dark') {
      setMode('light');
      localStorage.setItem('colorMode', 'light');
    } else {
      setMode('dark');
      localStorage.setItem('colorMode', 'dark');
    }
  };

  return (
    <AppBar position='fixed'>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ height: '100%', alignItems: 'center', display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <img src={eDCLogo} alt='eDCLogo' loading='lazy' width={60} height={60} style={{ cursor: 'pointer' }} />
          </Box>

          <Box sx={{ height: '100%', alignItems: 'center', display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <img src={eDCLogo} alt='eDCLogo' loading='lazy' width={60} height={60} style={{ cursor: 'pointer' }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((value, key) => (
              <Button onClick={() => moveToNavPage(value)} sx={{ my: 2, color: "white", display: 'block' }} key={key}>
                {value.page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={'Hello'} src='#' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={logOut}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <LogoutIcon sx={{ mr: 1 }} /> {'Logout'}
                </Box>
              </MenuItem>
              <MenuItem onClick={changeMode}>
                {mode === 'dark' ? (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <WbSunnyIcon sx={{ mr: 1 }} /> {'Light'}
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Brightness2Icon sx={{ mr: 1 }} />
                    {'Dark'}
                  </Box>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
