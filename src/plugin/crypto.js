import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';

export default {
    // 加密
    encrypt(word, keyStr, ivStr) {
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);
        let srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        let str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        return Base64.encode(str);
    },
    //解密
    decrypt(word, keyStr, ivStr) {
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);
        let base64 = CryptoJS.enc.Base64.parse(Base64.decode(word));
        let src = CryptoJS.enc.Base64.stringify(base64);
        var decrypt = CryptoJS.AES.decrypt(src, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
}