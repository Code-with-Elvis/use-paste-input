import { useState } from "react";
function extractRule(value) {
    if (value === undefined)
        return [undefined, null];
    if (Array.isArray(value))
        return [value[0], value[1]];
    return [value, null];
}
export function usePaste(schema) {
    const [pasted, setPasted] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const validateText = (value) => {
        if (!schema)
            return null;
        const isAlpha = /^[A-Za-z]+$/;
        const isNumeric = /^[0-9]+$/;
        const isAlphanumeric = /^[A-Za-z0-9]+$/;
        // length
        const [length, lengthMsg] = extractRule(schema.length);
        if (length && value.length !== length) {
            return lengthMsg ?? `Must be exactly ${length} characters`;
        }
        // minLength
        const [minLength, minMsg] = extractRule(schema.minLength);
        if (minLength && value.length < minLength) {
            return minMsg ?? `Must be at least ${minLength} characters`;
        }
        // maxLength
        const [maxLength, maxMsg] = extractRule(schema.maxLength);
        if (maxLength && value.length > maxLength) {
            return maxMsg ?? `Must be at most ${maxLength} characters`;
        }
        // startsWith
        const [startsWith, startMsg] = extractRule(schema.startsWith);
        if (startsWith && !value.startsWith(startsWith)) {
            return startMsg ?? `Must start with "${startsWith}"`;
        }
        // endsWith
        const [endsWith, endMsg] = extractRule(schema.endsWith);
        if (endsWith && !value.endsWith(endsWith)) {
            return endMsg ?? `Must end with "${endsWith}"`;
        }
        // includes
        const [includes, includesMsg] = extractRule(schema.includes);
        if (includes && !value.includes(includes)) {
            return includesMsg ?? `Must include "${includes}"`;
        }
        // numeric
        const [numeric, numMsg] = extractRule(schema.numeric);
        if (numeric && !isNumeric.test(value)) {
            return numMsg ?? "Must contain only numbers";
        }
        // alpha
        const [alpha, alphaMsg] = extractRule(schema.alpha);
        if (alpha && !isAlpha.test(value)) {
            return alphaMsg ?? "Must contain only letters (A–Z)";
        }
        // alphanumeric
        const [alphanumeric, alnumMsg] = extractRule(schema.alphanumeric);
        if (alphanumeric && !isAlphanumeric.test(value)) {
            return alnumMsg ?? "Must contain letters and numbers only";
        }
        // lowercase
        const [lowercase, lowerMsg] = extractRule(schema.lowercase);
        if (lowercase && value !== value.toLowerCase()) {
            return lowerMsg ?? "Must be lowercase";
        }
        // uppercase
        const [uppercase, upperMsg] = extractRule(schema.uppercase);
        if (uppercase && value !== value.toUpperCase()) {
            return upperMsg ?? "Must be uppercase";
        }
        // regex
        const [regex, regexMsg] = extractRule(schema.regex);
        if (regex && !regex.test(value)) {
            return regexMsg ?? "Does not match required pattern";
        }
        // custom
        if (schema.custom) {
            const customResult = schema.custom(value);
            if (typeof customResult === "string")
                return customResult;
            if (Array.isArray(customResult))
                return customResult[1]; // message
        }
        return null;
    };
    const paste = async () => {
        setError(null);
        try {
            // support images
            const items = await navigator.clipboard.read().catch(() => null);
            if (items) {
                for (const item of items) {
                    for (const type of item.types) {
                        if (type.startsWith("image/")) {
                            const blob = await item.getType(type);
                            const file = new File([blob], "pasted-image", { type });
                            const url = URL.createObjectURL(file);
                            setResult({ type: "image", file, url });
                            setPasted(true);
                            return;
                        }
                    }
                }
            }
            // text fallback
            const text = await navigator.clipboard.readText();
            const trimmed = text.trim();
            if (!trimmed) {
                setError("Clipboard is empty.");
                return;
            }
            const validationError = validateText(trimmed);
            if (validationError) {
                setError(validationError);
                return;
            }
            setResult({ type: "text", value: trimmed });
            setPasted(true);
        }
        catch (error) {
            console.error(error);
            setError("Failed to access clipboard. Check permissions.");
        }
    };
    return {
        paste,
        pasted,
        error,
        result,
        reset: () => {
            setPasted(false);
            setResult(null);
            setError(null);
        },
    };
}
export default usePaste;
