export type SchemaValue<T> = T | [T, string];
export interface PasteSchema {
    length?: SchemaValue<number>;
    minLength?: SchemaValue<number>;
    maxLength?: SchemaValue<number>;
    startsWith?: SchemaValue<string>;
    endsWith?: SchemaValue<string>;
    includes?: SchemaValue<string>;
    numeric?: SchemaValue<boolean>;
    alpha?: SchemaValue<boolean>;
    alphanumeric?: SchemaValue<boolean>;
    lowercase?: SchemaValue<boolean>;
    uppercase?: SchemaValue<boolean>;
    regex?: SchemaValue<RegExp>;
    custom?: (value: string) => string | [string, string] | null;
}
export type PasteResult = {
    type: "text";
    value: string;
} | {
    type: "image";
    file: File;
    url: string;
};
export declare function usePaste(schema?: PasteSchema): {
    paste: () => Promise<void>;
    pasted: boolean;
    error: string | null;
    result: PasteResult | null;
    reset: () => void;
};
export default usePaste;
//# sourceMappingURL=usePaste.d.ts.map