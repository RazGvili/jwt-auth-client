import React from 'react';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

interface Props {
    list: string[];
}

/**
 * TODO
 * 1. Add delete user
 *
 */

/**
 * Takes an string[] and creates a list of
 * chips with the string name
 */

const styles: { [name: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        marginTop: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '5px',
    },
    item: {
        width: '30%',
        maxWidth: '200px',
        minWidth: '100px',
    },
};

export const ChipList: React.FC<Props> = (props) => {
    const list = props.list;

    if (!Array.isArray(list)) {
        return <div></div>;
    }

    return (
        <div style={styles.container}>
            {list.map((item) => {
                return (
                    <Chip
                        style={styles.item}
                        key={item}
                        icon={<FaceIcon />}
                        label={item}
                    />
                );
            })}
        </div>
    );
};
