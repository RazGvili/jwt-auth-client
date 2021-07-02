import React from 'react';
import { useUsersQuery, useMeQuery } from '../generatedGraphQL/graphql';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ChipList } from '../components/chipList';

interface Props {}

export const Home: React.FC<Props> = () => {
    // TODO fire useUsersQuery on successful login

    // network-only to not read from cache
    const { data, error, loading } = useUsersQuery({
        fetchPolicy: 'network-only',
    });

    const { data: meData } = useMeQuery();

    let userId: undefined | number;
    if (meData?.me?.id) {
        userId = meData?.me?.id;
    }

    // Format data
    let users: { email: string; id: number }[] = [];
    if (userId && data) {
        users = data.users;
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Whoops</div>;
    }

    return <ChipList list={users} userId={userId} />;
};
