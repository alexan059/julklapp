import useLocalStorage from '~/composables/useLocalStorage';

export default function () {
    const { valueExists, storeValue, clearStorage } = useLocalStorage();

    const isLoggedIn = (): boolean => valueExists('loggedIn');

    const logIn = () => storeValue('loggedIn', true);

    const logOut = () => clearStorage();

    return { isLoggedIn, logIn, logOut };
}