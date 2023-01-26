import { m } from 'framer-motion';
// import { Link  } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {  Box,  Container, Typography, Stack } from '@mui/material';
// routes

// components

import { MotionContainer} from '../../components/animate';
import Slider from '../home';


// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  // backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => 
<Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 1000,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('')]: {
    margin: 'unset',
    textAlign: 'center',
  },
}));




// ----------------------------------------------------------------------

export default function HomeMain() {
  return (
    <MotionContainer>
      <RootStyle>

        <Container>
          <ContentStyle>
                  {/* <img
                      alt="simulator training"
                      src="/favicon/EAAschool.gif"
                      
                    /> */}
                    <Slider/>
          <div >
              <Typography variant="h4" sx={{ color: 'common.green' }}>
                Welcome To Ethiopian Aviation Academy Simulator Training School
              </Typography>
              </div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}
