/// <reference types="react" />
import { Address } from "../utils/enc";
export interface FormProps {
    contractAddress: `0x${string}`;
    encryptedDestination?: Address;
}
/**
 * Form only for mailing from EPS. Assumes page has already handeled wallet connection and injection.
 * @param address (Optional) Address of the EthereumPostalService contract (will default to 0x2156fcCff55637317D211B62318007309378fB95).
 * @param defaultEncryptedAddress (Optional) Default reciever address. If supplied, address fields in the form will not be shown.
 */
export declare function EPSMailForm(props: FormProps): JSX.Element;
export default EPSMailForm;
