import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
//import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
// import Logo from '../../components/Logo';
// import Label from '../../components/Label';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 3, bgcolor: 'rgb(37, 128, 37)' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {

            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >



          <h1>SCMS</h1>

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

          <Button
            variant="contained"
            href="http://localhost:3000/auth/Login">
            Scheduler
          </Button>
          <br />
          <br />

          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
        </Container>
        <img src='/favicon/Logoo.png' width='150px' height='50px' alt='logo' />
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
