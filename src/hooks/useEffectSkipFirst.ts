import { useEffect, useState } from "react";

type EffectCallback = () => void | (() => void);

/**
 * Es un `useEffect` pero omitiendo la primera ejecución.
 * @param callback  La función a ejecutar.
 * @param dependencies  Los valores que, al cambiar, harán que se ejecute la callback.
 */
export const useEffectSkipFirst = (
    callback: EffectCallback,
    dependencies: any[]
) => {
    const [isFirstRun, setIsFirstRun] = useState(true);

    useEffect(() => {
        if (isFirstRun) {
            // Evitar ejecución la primera vez
            setIsFirstRun(false);
        } else {
            // Ejecutar la callback si no es la primera vez
            return callback();
        }
    }, dependencies);
};
