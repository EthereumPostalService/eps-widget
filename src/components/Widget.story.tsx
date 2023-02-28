import React, { FC } from 'react';
import { Meta } from '@storybook/react';
import { Widget, WidgetProps } from './Widget';

export default {
    title: 'Button',
    component: Widget,
} as Meta<WidgetProps>;

export const Default: FC = () => {
    return <Widget> </Widget>;
};