/// <reference types="react" />
import { Address } from '../utils/enc';
export interface EPSWidgetProps {
    contractAddress?: `0x${string}`;
    encryptedDestination?: Address;
}
/**
 * Widget for interacting with the Ethereum Postal Service. Includes a card and wallet connector.
 * @param address (Optional) Address of the EthereumPostalService contract (will default to 0x2156fcCff55637317D211B62318007309378fB95).
 * @param defaultEncryptedAddress (Optional) Default reciever address. If supplied, address fields in the form will not be shown.
 */
export declare function EPSWidget(props: EPSWidgetProps): JSX.Element;
export default EPSWidget;
