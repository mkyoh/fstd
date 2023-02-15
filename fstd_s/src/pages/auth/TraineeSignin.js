import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link,  Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page'
import {TraineeForm } from '../../sections/auth/signin';


const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));



export default function TraineeLogin() {


  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  
  return (
    <Page title="Trainee Login">
      <RootStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <img src='/favicon/logoo.png' alt='logo'/>
                <Typography variant="h4" gutterBottom align='center' >
                Trainee? Signin to SCMS
                </Typography>
              </Box>
            </Stack>
            <TraineeForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};
