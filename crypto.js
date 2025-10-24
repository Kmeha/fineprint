// Minimal encryption utilities using Web Crypto API. Uses PBKDF2 + AES-GCM.
const CryptoUtil = (function(){
 async function getKeyMaterial(passphrase) {
   const enc = new TextEncoder();
   return crypto.subtle.importKey('raw', enc.encode(passphrase), {name:'PBKDF2'}, false, ['deriveKey']);
 }


 async function deriveKey(passphrase, salt, iterations=250000){
   const keyMat = await getKeyMaterial(passphrase);
   return crypto.subtle.deriveKey(
     {name:'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256'},
     keyMat,
     {name:'AES-GCM', length: 256},
     false,
     ['encrypt','decrypt']
   );
 }


 async function encryptString(passphrase, plain){
   const enc = new TextEncoder();
   const salt = crypto.getRandomValues(new Uint8Array(16));
   const iv = crypto.getRandomValues(new Uint8Array(12));
   const key = await deriveKey(passphrase, salt);
   const ct = await crypto.subtle.encrypt({name:'AES-GCM', iv: iv}, key, enc.encode(plain));
   // return base64 JSON
   return {
     version:1,
     salt: arrayBufferToBase64(salt),
     iv: arrayBufferToBase64(iv),
     ct: arrayBufferToBase64(ct)
   };
 }


 async function decryptObject(passphrase, obj){
   const dec = new TextDecoder();
   const salt = base64ToArrayBuffer(obj.salt);
   const iv = base64ToArrayBuffer(obj.iv);
   const ct = base64ToArrayBuffer(obj.ct);
   const key = await deriveKey(passphrase, salt);
   const plain = await crypto.subtle.decrypt({name:'AES-GCM', iv: iv}, key, ct);
   return dec.decode(plain);
 }


 function arrayBufferToBase64(buf){ return btoa(String.fromCharCode(...new Uint8Array(buf))); }
 function base64ToArrayBuffer(b64){ const bin = atob(b64); const len = bin.length; const bytes = new Uint8Array(len); for(let i=0;i<len;i++) bytes[i]=bin.charCodeAt(i); return bytes.buffer; }


 return { encryptString, decryptObject };
})();
