import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const fetchUsers = async () => {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const Users: React.FC = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Users List
            </Typography>
            <List>
                {data && data.map((user: any) => (
                    <ListItem key={user.id}>
                        <ListItemText primary={user.name} secondary={user.email} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Users;