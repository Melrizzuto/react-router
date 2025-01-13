// per usarlo mi serve importare la creazione di contesto
import { createContext, useContext, useState } from "react";

// dentro la create posso metterci un valore che voglio condividere
const AlertContext = createContext();

// Provider per il contesto
const AlertProvider = ({ children }) => {
    const [alertData, setAlertData] = useState({ type: "", message: "" });

    return (
        <AlertContext.Provider value={{ alertData, setAlertData }}>
            {children}
        </AlertContext.Provider>
    );
};

function useAlertContext() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlertContext deve essere usato all'interno di un AlertProvider");
    }
    return context;
}

//  per utilizzarlo la devo importare dove mi serve tramite il Provider
export { AlertProvider, useAlertContext };