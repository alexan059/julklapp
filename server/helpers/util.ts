// Source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export const shuffle = (array: any[]): any[] => {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
};

export const isLast = (index: number, array: any[]) => index === array.length - 1;