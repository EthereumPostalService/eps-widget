export declare function encrypt(data: string, pubkey: string): string;
export declare function encryptAddress(address: Address, pubkey: string): Address;
export declare function decrypt(data: string, seckey: string): string;
export interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    countryCode: string;
    postalOrZip: string;
    name: string;
}
