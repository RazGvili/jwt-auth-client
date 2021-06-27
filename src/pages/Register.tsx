import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRegisterMutation } from '../generatedGraphQL/graphql';

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
 */
export const Register: React.FC<Props> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register] = useRegisterMutation();

    const onSubmit = async () => {
        await register({
            variables: {
                email,
                password,
            },
        });
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
                Register
            </Button>
        </div>
    );
};
