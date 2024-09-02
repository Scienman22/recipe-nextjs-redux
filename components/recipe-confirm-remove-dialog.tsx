"use client";
import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

export interface ConfirmationDialogRawProps {
    keepMounted: boolean;
    recipeId?: number;
    open: boolean;
    onClose: (value?: number) => void;
}
  
export default function RecipeConfirmRemoveDialog(props: ConfirmationDialogRawProps) {
    const { onClose, recipeId, open, ...other } = props;
  
    const handleCancel = () => {
        onClose();
    };
  
    const handleYes = () => {
        onClose(recipeId);
    };
  
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>{`Confirm Remove`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`Are you  sure you to remove this recipe?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    {`Cancel`}
                </Button>
                <Button onClick={handleYes}>{`Yes`}</Button>
            </DialogActions>
        </Dialog>
    );
  }