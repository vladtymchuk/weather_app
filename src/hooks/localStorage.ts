import React from "react";

export const useLocalStorage = (key: string) => {
    const [value, setValue] = React.useState(localStorage.getItem(key) ?? localStorage.getItem('cities'));
    const updatedSetValue = React.useCallback(
        (newValue: string) => {
            if (newValue === localStorage.getItem('cities') || typeof newValue === 'undefined') {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, newValue);
            }
            setValue(newValue ?? localStorage.getItem('cities'));
        },
        [localStorage.getItem('cities'), key]
    );
    return [value, updatedSetValue];
}
