interface OTPGeneratorOptions {
    digits?: boolean,
    alphabets?: boolean,
    upperCase?: boolean,
    specialChars?: boolean,
}

declare module 'otp-generator' {
    function generate(length: number, options?: OTPGeneratorOptions): string;
}