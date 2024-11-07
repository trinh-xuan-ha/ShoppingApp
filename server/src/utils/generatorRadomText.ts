export const generatorRandomText = (num: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys0123456789'
    let text = '';
    for (let i = 0; i <= num; i++) {
        const str = characters[Math.floor(Math.random() * characters.length)];
        text += str;
    }
    return text.toLocaleUpperCase()
}