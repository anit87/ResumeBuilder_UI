import React, { useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as DateTimeField } from '@mui/x-date-pickers/DateTimePicker';
// import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs from 'dayjs';


function Label({ componentName }) {
    const content = (
        <span>
            <strong>{componentName}</strong>
        </span>
    );
    return content;
}
export default function DateAndTime(props) {
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'Date & Time'
                ]}
            >
                <DemoItem
                    label={<Label componentName={props.label||""} />}
                >
                    <DateTimeField
                        onChange={(newValue) => props.onChange(newValue)}
                        value={dayjs(props.value)}
                        disablePast
                        // defaultValue= {dayjs()}
                    />
                </DemoItem>

            </DemoContainer>
        </LocalizationProvider>
    );
}