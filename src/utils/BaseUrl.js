import crypto from "crypto-js";
import { toast } from "react-toastify";
export const BaseUrl = "https://doniaa-twitter-clone-backend.onrender.com";

export function validateEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
    );
}

export const decryptMessage = (key, message, iv) => {
    let _key = crypto.enc.Hex.parse(key);
    const result = crypto.AES.decrypt(message, _key, {
        iv: crypto.enc.Hex.parse(iv),
        mode: crypto.mode.CBC,
        format: crypto.format.Hex,
    }).toString(crypto.enc.Utf8);
    return result;
};



export function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
}