import React, { useEffect } from 'react';
import { useUsersQuery, useByeQuery } from '../generatedGraphQL/graphql';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ChipList } from '../components/chipList';

interface Props {}

export const Home: React.FC<Props> = () => {
    // network-only to not read from cache
    const { data, error, loading } = useUsersQuery({
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        console.log('useEffect ~ error', { error });
        console.log('useEffect ~ data', data);
    }, []);

    // Foramt data
    let users: string[] = [];
    if (data) {
        users = data.users.map((user) => user.email);
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Whoops</div>;
    }

    return <ChipList list={users} />;
};
