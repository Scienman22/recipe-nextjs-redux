import React from 'react'
import TextField from '@mui/material/TextField';
import { ConnectForm } from '@/components/form-elements/connect-form';

export const Input = ({ type, name, rule, ...rest } : any) => {
    return (
        <ConnectForm>
            {({ register }:any) => <TextField fullWidth {...register(name, {...rule})} {...rest} />}
        </ConnectForm>
    )
}

export default Input;