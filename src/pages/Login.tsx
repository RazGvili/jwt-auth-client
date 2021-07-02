import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLoginMutation } from '../generatedGraphQL/graphql';
import { ACCESS_TOKEN } from '../utils/auth';
import { useHistory } from 'react-router-dom';

interface Props {}

const styles: { [name: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        marginTop: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
    },
    field: {
        width: '25%',
    },
};

/**
 * TODO:
 * 1. Move form logic to a form component
 * 2. try/catch
 * 3. move login to utils
 */
export const Login: React.FC<Props> = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();

    const onSubmit = async () => {
        try {
            const response = await login({
                variables: {
                    email,
                    password,
                },
            });
            console.log('onSubmit ~ response', response);
            const accessToken = response.data?.login.accessToken;

            if (accessToken) {
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                history.push('/');
            }

            // TODO handle failed case
            // if (!accessToken) {

            // }
        } catch (err) {
            console.log('onSubmit ~ err', err);
        }
    };

    return (
        <div style={styles.container}>
            <TextField
                id="email"
                label="email"
                variant="outlined"
                style={styles.field}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <TextField
                id="password"
                label="password"
                variant="outlined"
                style={styles.field}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <Button onClick={onSubmit} variant="contained">
                Login
            </Button>
        </div>
    );
};
