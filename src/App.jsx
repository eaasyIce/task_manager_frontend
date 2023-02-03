import Navbar from './components/nav/Navbar';
import Footer from './components/Footer';
import BodyLayout from './components/BodyLayout';
import Login from './features/auth/Login';
import Layout from './components/Layout';

import All from './components/page/All';
import Today from './components/page/Today';
import Priority from './components/page/Priority';
import Prefetch from './features/auth/Prefetch';
import { lightTheme, darkTheme } from './features/visual/themes';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const userInState = useSelector((state) => state.auth.user);
    const themeState = useSelector((state) => state.theme.theme);

    return (
        <ThemeProvider theme={themeState === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />

            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route element={<Prefetch />}>
                        {/* <Route
                            index
                            element={<Box sx={{ height: '500px', width: '500px', bgcolor: 'blue' }}>testing</Box>}
                        /> */}
                        <Route index element={<All />} />
                        <Route path='priority' element={<Priority />} />
                    </Route>
                </Route>
            </Routes>
        </ThemeProvider>
    );
}
export default App;

// {userInState ? (
//     <Routes>
// <Route element={<Prefetch />}>
//     <Route path='/' element={<Layout />}>
//         <Route index element={<All />} />
//         <Route path='priority' element={<Priority />} />
//     </Route>
// </Route>
//         {/* </Route> */}
//     </Routes>
// ) : (
//     <Routes>
//         <Route path='/' element={<Login />} />
//     </Routes>
// )}
// <Box display='flex' justifyContent='center' alignContent='center'>
//     <Footer />
// </Box>
