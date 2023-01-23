// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import {HomeMain,} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));


// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page >
      <RootStyle>
        <HomeMain/>
      </RootStyle>
    </Page>
  );
}
