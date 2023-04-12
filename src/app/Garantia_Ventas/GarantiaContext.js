import { createContext, useContext } from 'react';

export const GarantiaContext = createContext();

export function GarantiaCon (){
    return useContext(GarantiaContext);
};