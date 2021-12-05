export default function () {

    const getItem = (key: string): object|[] => {
        return JSON.parse(localStorage.getItem(key));
    }

    const storeItem = (key: string, item: object|[]) => {
        localStorage.setItem(key, JSON.stringify(item));
    }

    const getValue = (key: string): string => {
        return localStorage.getItem(key);
    }

    const storeValue = (key: string, value: string) => {
        localStorage.setItem(key, value);
    }

    const removeItem = (key: string) => {
        localStorage.removeItem(key);
    }

    const valueExists = (key: string): boolean => {
        return !!localStorage.getItem(key);
    }

    return {
        getItem,
        storeItem,
        getValue,
        storeValue,
        valueExists,
        removeItem
    }

}