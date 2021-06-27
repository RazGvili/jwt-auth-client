import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router-dom';
import { useByeQuery } from '../generatedGraphQL/graphql';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

interface Props {}

export const Header: React.FC<Props> = () => {
    const classes = useStyles();
    const history = useHistory();

    const { data, error, loading } = useByeQuery();
    console.log('data', data);
    console.log('error', error);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.title}
                        onClick={() => history.push('/')}
                        style={{ cursor: 'pointer' }}
                    >
                        🚀
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => history.push('/Login')}
                    >
                        Login
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => history.push('/Register')}
                    >
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};
