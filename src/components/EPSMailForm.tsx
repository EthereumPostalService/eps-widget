import React from 'react';
import {
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    LinearProgress,
    Grid,
    Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { all } from "iso-3166-1";
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead,
} from "wagmi";

import { Address, encrypt, encryptAddress } from "../utils/enc";
import abi from "../EthereumPostalService.json";
import { formatEther } from 'ethers/lib/utils.js';


export interface FormProps {
    contractAddress: `0x${string}`;
    encryptedDestination?: Address;
}

/**
 * Form only for mailing from EPS. Assumes page has already handeled wallet connection and injection.
 * @param address (Optional) Address of the EthereumPostalService contract (will default to 0x2156fcCff55637317D211B62318007309378fB95).
 * @param defaultEncryptedAddress (Optional) Default reciever address. If supplied, address fields in the form will not be shown.
 */
export function EPSMailForm(props: FormProps) {
    const feeRead = useContractRead({
        address: props.contractAddress,
        abi: abi.abi,
        functionName: "getPostageWei",
        watch: true,
    });
    const encryptionRead = useContractRead({
        address: props.contractAddress,
        abi: abi.abi,
        functionName: "encryptionPubKey",
        watch: true,
    });

    const [encryptAdd, setEncAdd] = useState(true);
    const [encryptMsg, setEncMsg] = useState(true);
    const [recipient, setName] = useState("");
    const [addLine1, setAddLine1] = useState("");
    const [addLine2, setAddLine2] = useState("");
    const [countryCode, setCountryCode] = useState("US");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [msg, setMsg] = useState("");

    const [messageEnc, setMessageEnc] = useState("");
    const [addressEnc, setAddressEnc] = useState<Address>();

    useEffect(() => {
        if (!encryptionRead || !encryptionRead.isSuccess || !encryptionRead.data) {
            return;
        }
        if (encryptMsg) {
            let em = encrypt(msg, encryptionRead.data as string);
            setMessageEnc(em);
        }
        if (encryptAdd) {
            const address = {
                addressLine1: addLine1,
                addressLine2: addLine2,
                city: city,
                countryCode: countryCode,
                postalOrZip: zip,
                name: recipient,
            };
            let ea = encryptAddress(
                address as Address,
                encryptionRead.data as string
            );
            setAddressEnc(ea);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        msg,
        encryptMsg,
        encryptAdd,
        addLine1,
        addLine2,
        city,
        countryCode,
        zip,
        recipient,
    ]);

    const [attemptedSubmit, setAttempted] = useState(false);

    const validName = () => {
        return !!recipient;
    };
    const validAdd1 = () => {
        return !!addLine1;
    };
    const validAdd2 = () => {
        return true;
    };
    const validCountry = () => {
        // further validation possible here
        let isCountry =
            all().filter(
                (country: {
                    country: string;
                    alpha2: string;
                    alpha3: string;
                    numeric: string;
                }) => {
                    return (
                        // countryCode === country.country ||
                        countryCode === country.alpha2
                        // countryCode === country.alpha3 ||
                        // countryCode === country.numeric
                    );
                }
            ).length === 1;
        return isCountry;
    };
    const validZip = () => {
        return !!zip;
    };
    const validCity = () => {
        return !!city;
    };
    const validMsg = () => {
        return !!msg;
    };
    const allValid = () => {
        if (props.encryptedDestination) {
            return validMsg() && 
                encryptionRead.isSuccess &&
                feeRead.isSuccess
        }
        return (
            validName() &&
            validAdd1() &&
            validAdd2() &&
            validCountry() &&
            validCity() &&
            validZip() &&
            validMsg() &&
            encryptionRead.isSuccess &&
            feeRead.isSuccess
        );
    };


    let sendAddress: Address;
    if (props.encryptedDestination) {
        // TODO: Allow updating name here?
        sendAddress = props.encryptedDestination!;
    } else if (encryptAdd) {
        sendAddress = addressEnc!;
    } else {
        sendAddress = {
            addressLine1: addLine1,
            addressLine2: addLine2,
            city: city,
            countryCode: countryCode,
            postalOrZip: zip,
            name: recipient
        }
    }
    const { config } = usePrepareContractWrite({
        address: props.contractAddress,
        abi: abi.abi,
        functionName: "sendEncryptedMail",
        args: [
            sendAddress,
            encryptMsg ? messageEnc : msg,
            encryptAdd,
            encryptMsg,
        ],
        enabled: allValid(),
        overrides: { value: feeRead.data as any },
    });
    const { data, write } = useContractWrite(config);

    const { isLoading, isSuccess, isError } = useWaitForTransaction({
        hash: data?.hash,
    });

    const submitForm = () => {
        if (allValid()) {
            write?.();
        } else {
            setAttempted(true);
        }
    };
    return (
        <>
            <Grid container spacing={2}>

                {
                    !props.encryptedDestination ?
                        <>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={encryptAdd}
                                            onChange={() => {
                                                setEncAdd(!encryptAdd);
                                            }}
                                            defaultChecked
                                        />
                                    }
                                    label="Encrypt the postage recipient's information."
                                />
                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    error={!validName() && attemptedSubmit}
                                    label="To"
                                    id="name"
                                    sx={{ width: "100%" }}
                                    value={recipient}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setName(event.target.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    error={!validAdd1() && attemptedSubmit}
                                    label="Address line 1"
                                    id="address1"
                                    sx={{
                                        width: "100%",
                                    }}
                                    value={addLine1}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setAddLine1(event.target.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={!validAdd2() && attemptedSubmit}
                                    label="Address line 2"
                                    id="address2"
                                    sx={{ width: "100%" }}
                                    value={addLine2}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setAddLine2(event.target.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={!validCity() && attemptedSubmit}
                                    label="City"
                                    id="city"
                                    sx={{ width: "100%" }}
                                    value={city}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setCity(event.target.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    error={!validCountry() && attemptedSubmit}
                                    label="Country Code"
                                    id="cc"
                                    sx={{ width: "100%" }}
                                    value={countryCode}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setCountryCode(event.target.value.toUpperCase());
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    error={!validZip() && attemptedSubmit}
                                    label="ZIP/Postal Code"
                                    id="zip"
                                    sx={{ width: "100%" }}
                                    value={zip}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setZip(event.target.value);
                                    }}
                                />
                            </Grid>
                        </>
                        : <></>}

                <Grid item xs={12}>
                    <Tooltip title="Unencrypted messages are publicly viewable" placement="top">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={encryptMsg}
                                    onChange={() => {
                                        setEncMsg(!encryptMsg);
                                    }}
                                    defaultChecked
                                />
                            }
                            label="Encrypt the postage message content."
                        />
                    </Tooltip>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        error={!validMsg() && attemptedSubmit}
                        sx={{ width: "100%" }}
                        id="message"
                        label="Message"
                        multiline
                        rows={4}
                        value={msg}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setMsg(event.target.value);
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    {isLoading ? (
                        <LinearProgress sx={{}} color="secondary" />
                    ) : isSuccess ? (
                        <>Success</>
                    ) : isError ? (
                        <>Error</>
                    ) : (
                        <Button
                            disabled={!allValid() && attemptedSubmit}
                            onClick={submitForm}
                            sx={{ float: "right" }}
                            variant="contained"
                        >
                            Send for{" "}
                            {feeRead &&
                                feeRead.isSuccess
                                &&
                                formatEther(feeRead.data as any).substring(0, 6)}
                            {"Ξ"}
                        </Button>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default EPSMailForm;
