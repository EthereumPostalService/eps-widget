import { encrypt as encryptEcies, decrypt as decryptEcies } from 'eciesjs';

export function encrypt(data: string, pubkey: string): string {
    return encryptEcies(pubkey, Buffer.from(data)).toString('hex');
}

export function encryptAddress(address: Address, pubkey: string): Address {
    return {
        addressLine1: encrypt(address.addressLine1, pubkey),
        addressLine2: encrypt(address.addressLine2, pubkey),
        city: encrypt(address.city, pubkey),
        countryCode: encrypt(address.countryCode, pubkey),
        postalOrZip: encrypt(address.postalOrZip, pubkey),
        name: encrypt(address.name, pubkey)
    }
}

export function decrypt(data: string, seckey: string): string {
    return decryptEcies(seckey, Buffer.from(data)).toString();
}

export interface Address {
    addressLine1: string,
    addressLine2: string,
    city: string,
    countryCode: string,
    postalOrZip: string,
    name: string
}