import localforage from 'localforage';

export const getFromLocalStorage = async (key: string) => {
    try {
        const value = await localforage.getItem(key);
        console.log('getFromLocalStorage ~ value', value);
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const setLocalStorage = async (key: string, value: string) => {
    try {
        await localforage.setItem(key, value);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
