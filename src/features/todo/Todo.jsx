import { useDeleteTodosMutation, useUpdateTodosMutation, useGetTodosQuery } from './todosApiSlice';
import { useGetProjectsQuery } from '../project/ProjectsApiSlice';
import { useState } from 'react';
import EditTodo from './EditTodo';
import StyledPaper from '../../components/muiTemplate/StyledPaper';
import PatchTooltip from '../../components/PatchTooltip';
import { compareDates } from '../util/compareDates';
import {
    CalendarIcon,
    ProjectIcon,
    EditIcon,
    DeleteIcon,
    RadioButtonUncheckedIcon,
    CheckCircleOutlineRoundedIcon,
    CheckCircleFillIcon,
} from '../../components/asset/svgIcons';

import { Box, Checkbox, IconButton, Typography, Collapse } from '@mui/material';

const Todo = ({ todoId }) => {
    const { todo } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            // Select from cache
            todo: data?.entities[todoId],
        }),
    });
    const { project } = useGetProjectsQuery('projectsList', {
        selectFromResult: ({ data }) => ({
            // Select from cache
            project: data?.entities[todo?.projectId],
        }),
    });

    const [deleteTodo] = useDeleteTodosMutation();
    const [updateTodo] = useUpdateTodosMutation();
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (!todo) {
        return null;
    }
    const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
    const overdue = compareDates(dueDate);

    const onClickEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const onClickCheckbox = () => {
        updateTodo({ ...todo, completed: !todo.completed });
    };
    const onClickDelete = () => {
        deleteTodo({ _id: todo._id });
    };

    return isEditing ? (
        <EditTodo setIsEditing={setIsEditing} todo={todo} />
    ) : (
        <Collapse in timeout={{ enter: 500, exit: 100 }} easing={{ enter: 'linear', exit: 'linear' }}>
            <StyledPaper>
                <Box id='todo-info' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        id='todo-info-box-checkbox'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        icon={
                            isHovered ? (
                                <CheckCircleOutlineRoundedIcon color='secondary' />
                            ) : (
                                <RadioButtonUncheckedIcon color='secondary' />
                            )
                        }
                        checkedIcon={<CheckCircleFillIcon color='secondary' />}
                        onChange={onClickCheckbox}
                        checked={todo?.completed}
                        sx={{ mr: 1 }}
                        size='small'
                    />
                    <Box
                        id='todo-info-box'
                        sx={{
                            textAlign: 'left',
                            '& .MuiTypography-root': { flexGrow: 2, whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
                        }}
                    >
                        <Box id='todo-info-box-title'>
                            {todo.completed ? (
                                <Typography>
                                    <s>{todo.title}</s>
                                </Typography>
                            ) : (
                                <Typography>{todo.title}</Typography>
                            )}
                        </Box>
                        <Box
                            id='todo-info-box-subtitle'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                // border: '1px solid yellow',
                                columnGap: '1rem',
                                '&>* .MuiTypography-root': {
                                    fontSize: '0.8rem',
                                },
                            }}
                        >
                            {dueDate ? (
                                <Box
                                    id='todo-info-box-subtitle-dueDate'
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& > *': {
                                            color: overdue ? 'error.dark' : 'inherit',
                                        },
                                    }}
                                >
                                    <CalendarIcon sx={{ height: '18px', width: '18px', mr: '0.2rem' }} />
                                    <Typography>
                                        {overdue
                                            ? 'Overdue ' + dueDate.toLocaleDateString('en-US')
                                            : dueDate.toLocaleDateString('en-US')}
                                    </Typography>
                                </Box>
                            ) : null}

                            {project ? (
                                <Box
                                    id='todo-info-box-subtitle-project'
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        // border: '1px solid black',
                                    }}
                                >
                                    <ProjectIcon sx={{ height: '18px', width: '18px', mr: '0.2rem' }} />
                                    <Typography> {project.title}</Typography>
                                </Box>
                            ) : null}
                        </Box>
                    </Box>
                </Box>
                <Box id='todo-actions' sx={{ display: 'flex' }}>
                    <PatchTooltip title='Edit task' arrow>
                        <IconButton title='Edit' onClick={onClickEdit} sx={{ borderRadius: '50%' }}>
                            <EditIcon sx={{ height: '20px', width: '20x', color: 'secondary.main' }} />
                        </IconButton>
                    </PatchTooltip>
                    <PatchTooltip title='Delete task' arrow>
                        <IconButton title='Delete' onClick={onClickDelete} sx={{ borderRadius: '50%' }}>
                            <DeleteIcon sx={{ height: '20px', width: '20x', color: 'secondary.main' }} />
                        </IconButton>
                    </PatchTooltip>
                </Box>
            </StyledPaper>
        </Collapse>
    );
};

export default Todo;
