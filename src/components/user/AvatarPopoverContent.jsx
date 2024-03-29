import { useSelector, useDispatch } from 'react-redux';
import { signOutGoogle } from '../../config/firebase';
import { logout } from '../../features/auth/authSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { apiSlice } from '../../app/api/apiSlice';
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    Typography,
    Avatar,
} from '@mui/material';

import { ExitIcon } from '../asset/svgIcons';

const AvatarPopoverContent = () => {
    const userInState = useSelector(selectCurrentUser); // The user in redux state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickSignOut = async () => {
        dispatch(logout());
        dispatch(apiSlice.util.resetApiState());
        await signOutGoogle();
        navigate('/');
    };

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} disablePadding={true}>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar
                    // src={userInState?.photoUrl}
                    sx={{ width: 50, height: 50 }}
                >
                    <Avatar src={userInState?.photoUrl} imgProps={{ referrerPolicy: 'no-referrer' }} />
                </ListItemAvatar>
                {userInState?.isAnonymous ? (
                    <p>Anonymous User</p>
                ) : (
                    <ListItemText
                        primary={
                            <Typography
                                sx={{ fontWeight: 'medium' }}
                                component='div'
                                variant='body1'
                                color='text.primary'
                            >
                                {userInState.firstName + ' ' + userInState.lastName[0]}
                            </Typography>
                        }
                        secondary={
                            <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.secondary'
                            >
                                {userInState.email}
                            </Typography>
                        }
                    />
                )}
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton onClick={onClickSignOut}>
                    <ListItemIcon>
                        <ExitIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Log out'} />
                </ListItemButton>
            </ListItem>
        </List>
    );
};
export default AvatarPopoverContent;
