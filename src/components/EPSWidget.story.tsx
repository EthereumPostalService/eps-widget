// @ts-ignore
import React from 'react';

import { FC } from 'react';
import { Meta } from '@storybook/react';

import { EPSWidget, EPSWidgetProps } from './EPSWidget';
import { Address } from 'utils/enc';

export default {
    title: 'EPSWidget',
    component: EPSWidget,
    argTypes: {
        defaultAddress: {
            options: ["No default", "Default"],
            control: { type: 'radio'}
        }
    }
} as Meta<EPSWidgetProps>;

export const Default: FC = (args: any) => {
    if (args['defaultAddress'] === "No default") {
        console.log("going no default")
        return <EPSWidget></EPSWidget>;
    } else {
        console.log("going default")
        let address: Address = {
                addressLine1: "asdfasd",
                addressLine2: "asdfasdfs",
                city: "asdfasdfa",
                countryCode: "asdfasdfasd",
                postalOrZip: "asdfasd",
                name: "asdfasd" 
            };

        return <EPSWidget encryptedDestination={address}></EPSWidget>;
    }
};