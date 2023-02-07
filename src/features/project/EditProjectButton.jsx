import { useState } from 'react';
import { Popover, List, ListItem, ListItemText, Divider, ListItemButton, ListItemIcon } from '@mui/material';

import { EllipsisIcon } from '../../components/asset/svgIcons';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const EditProjectButton = ({ setIsEditing, onClickDeleteProject }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);

    const onClickShowPopover = (e) => {
        setShowPopover(true);
        setAnchorEl(e.currentTarget);
    };
    const onClickClose = () => {
        setShowPopover(false);
    };

    const onClickEdit = () => {
        setIsEditing(true);
        setShowPopover(false);
    };

    const popoverContent = (
        <List
            sx={{
                bgcolor: 'background.paper',
                '.MuiListItemIcon-root': {
                    minWidth: '2.5rem',
                },
            }}
            disablePadding
        >
            <ListItem disablePadding>
                <ListItemButton onClick={onClickEdit}>
                    <ListItemIcon>
                        <EditOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Edit'} />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton onClick={onClickDeleteProject}>
                    <ListItemIcon>
                        <DeleteOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Delete'} />
                </ListItemButton>
            </ListItem>
        </List>
    );

    const popover = (
        <Popover
            anchorEl={anchorEl}
            open={showPopover}
            onClose={onClickClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            {popoverContent}
        </Popover>
    );

    return (
        <>
            <EllipsisIcon
                onClick={onClickShowPopover}
                sx={{ color: 'grey.700', '&:hover': { color: 'secondary.main' }, cursor: 'pointer' }}
            />
            {popover}
        </>
    );
};
export default EditProjectButton;