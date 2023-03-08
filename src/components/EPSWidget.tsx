// @ts-ignore
import React from 'react';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { DynamicContextProvider, DynamicWidget } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

import { Address } from '../utils/enc';
import EthMailForm from "./EPSMailForm";

import logo from "../resources/eps-logo.png";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const DEFAULT_ADDRESS = "0x2156fcCff55637317D211B62318007309378fB95";

export interface EPSWidgetProps {
    contractAddress?: `0x${string}`;
    encryptedDestination?: Address;
}

/**
 * Widget for interacting with the Ethereum Postal Service. Includes a card and wallet connector.
 * @param address (Optional) Address of the EthereumPostalService contract (will default to 0x2156fcCff55637317D211B62318007309378fB95).
 * @param defaultEncryptedAddress (Optional) Default reciever address. If supplied, address fields in the form will not be shown.
 */
export function EPSWidget(props: EPSWidgetProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <DynamicContextProvider
                theme={"dark"}
                settings={{
                    appName: "EPS",
                    appLogoUrl: "EPS-01.png",
                    environmentId: "a1608d4b-85bc-4adb-b5a0-ed4ee480fa37",
                    initialAuthenticationMode: "connect-only",
                }}
            >
                <DynamicWagmiConnector>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Card
                            sx={{
                                maxWidth: 800,
                                mt: { sm: 1, md: "5vh" },
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                        >
                            <Box sx={{ float: "right", p: 1 }}>
                                <DynamicWidget
                                    variant="dropdown"
                                    buttonClassName="MuiButtonBase-root MuiButton-roo"
                                    innerButtonComponent={
                                        <Box sx={{ pl: 1, pr: 1 }}>Connect Wallet</Box>
                                    }
                                />
                            </Box>

                            <div style={{margin: "5%"}}>
                                <img src={logo} alt="eps-logo" style={{ objectFit: "scale-down", width: "100%"}}/>
                            </div>

                            <CardContent>
                                <EthMailForm
                                    contractAddress={props.contractAddress ? props.contractAddress ! : DEFAULT_ADDRESS}
                                    encryptedDestination={props.encryptedDestination}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </DynamicWagmiConnector>
            </DynamicContextProvider>
        </ThemeProvider >
    );
}

export default EPSWidget;
