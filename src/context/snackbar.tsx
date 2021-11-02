import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextValue = {
  open: boolean;
  setOpen: any;
  handleClose: any;
  message: string;
  setMessage: Function;
  severity: any;
  setSeverity: Function;
};

const DEFAULT_VALUE = {
  open: true,
  setOpen: () => {},
  handleClose: () => {},
  message: '',
  setMessage: () => {},
  severity: 'success',
  setSeverity: () => {},
};

export const SnackbarContext = createContext<ContextValue>(DEFAULT_VALUE);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<any>(true);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const context = {
    open,
    setOpen,
    handleClose,
    message,
    setMessage,
    severity,
    setSeverity,
  };

  return (
    <SnackbarContext.Provider value={context}>
      {children}
    </SnackbarContext.Provider>
  );
};

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  return context;
}
