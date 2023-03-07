// @ts-ignore
import React from 'react';

import { FC } from 'react';
import { Meta } from '@storybook/react';

import { EPSWidget, EPSWidgetProps } from './EPSWidget';

export default {
    title: 'EPSWidget',
    component: EPSWidget,
} as Meta<EPSWidgetProps>;

export const Default: FC = () => {
    return <EPSWidget></EPSWidget>;
};