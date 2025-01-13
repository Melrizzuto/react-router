import { useEffect } from "react";
import { useAlertContext } from "../context/AlertContext";

export default function Alert() {
    const { alertData, setAlertData } = useAlertContext();
    const { type, message } = alertData;

    useEffect(() => {
        let timer = setTimeout(() => setAlertData({ type: "", message: "" }), 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [alertData, setAlertData]);

    if (!message) return null;

    return (
        <div className={`alert alert-${type} alert-dismissible`} role="alert">
            <div>{message}</div>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertData({ type: "", message: "" })}
            ></button>
        </div>
    );
}