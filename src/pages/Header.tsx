import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router-dom';
import { useMeQuery } from '../generatedGraphQL/graphql';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

interface Props {}

export const Header: React.FC<Props> = () => {
    const classes = useStyles();
    const history = useHistory();

    const { data } = useMeQuery();

    let userId: undefined | number;
    if (data?.me?.id) {
        userId = data?.me?.id;
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography
                        variant="h6"
                        onClick={() => history.push('/')}
                        style={{ cursor: 'pointer' }}
                    >
                        🚀
                    </Typography>
                    <div>
                        {!userId && (
                            <Button
                                color="inherit"
                                onClick={() => history.push('/Login')}
                            >
                                Login
                            </Button>
                        )}
                        <Button
                            color="inherit"
                            onClick={() => history.push('/Register')}
                        >
                            Register
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
