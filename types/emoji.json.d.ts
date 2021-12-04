interface Emoji {
    codes: string,
    char: string,
    name: string,
    category: string,
    group: string,
    subgroup: string,
}

declare module 'emoji.json' {
    const value: Emoji[]
    export default value;
}