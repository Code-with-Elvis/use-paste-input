# use-paste-input

A lightweight, type-safe React hook for seamlessly handling paste events with customizable validation, formatting, and error handling capabilities.

## Features

✅ **Text & Image Support** - Handle both text and image paste events  
✅ **Validation Schema** - Built-in validators for common patterns  
✅ **Custom Validation** - Add your own validation logic  
✅ **TypeScript** - Full type safety and IntelliSense  
✅ **Zero Dependencies** - Only requires React  
✅ **Tiny Bundle** - Minimal footprint

## Installation

```bash
npm install use-paste-input
```

```bash
yarn add use-paste-input
```

```bash
pnpm add use-paste-input
```

## Usage

### Basic Example

```tsx
import { usePaste } from "use-paste-input";

function App() {
  const { paste, pasted, error, result, reset } = usePaste();

  return (
    <div>
      <input
        value={result?.type === "text" ? result.value : ""}
        placeholder="Click paste to insert"
        readOnly
      />
      <button onClick={paste}>Paste</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
```

### With Validation

```tsx
import { usePaste } from "use-paste-input";

function App() {
  const { paste, pasted, error, result, reset } = usePaste({
    minLength: 3,
    maxLength: [50, "Too long! Maximum 50 characters"],
    alphanumeric: true,
    uppercase: true,
  });

  return (
    <div>
      <button onClick={paste}>Paste Code</button>
      {pasted && result?.type === "text" && <p>✓ Pasted: {result.value}</p>}
      {error && <p>✗ {error}</p>}
    </div>
  );
}
```

### Image Paste

```tsx
import { usePaste } from "use-paste-input";

function App() {
  const { paste, result } = usePaste();

  return (
    <div>
      <button onClick={paste}>Paste Image</button>
      {result?.type === "image" && (
        <img src={result.url} alt="Pasted" style={{ maxWidth: "300px" }} />
      )}
    </div>
  );
}
```

## API

### `usePaste(schema?)`

Returns an object with the following properties:

| Property | Type                  | Description                    |
| -------- | --------------------- | ------------------------------ |
| `paste`  | `() => Promise<void>` | Trigger paste from clipboard   |
| `pasted` | `boolean`             | Whether paste was successful   |
| `error`  | `string \| null`      | Validation error message       |
| `result` | `PasteResult \| null` | Pasted content (text or image) |
| `reset`  | `() => void`          | Clear state                    |

### Schema Options

| Option         | Type                                | Description                |
| -------------- | ----------------------------------- | -------------------------- |
| `length`       | `number \| [number, string]`        | Exact length required      |
| `minLength`    | `number \| [number, string]`        | Minimum length             |
| `maxLength`    | `number \| [number, string]`        | Maximum length             |
| `startsWith`   | `string \| [string, string]`        | Must start with string     |
| `endsWith`     | `string \| [string, string]`        | Must end with string       |
| `includes`     | `string \| [string, string]`        | Must contain string        |
| `numeric`      | `boolean \| [boolean, string]`      | Only numbers allowed       |
| `alpha`        | `boolean \| [boolean, string]`      | Only letters allowed       |
| `alphanumeric` | `boolean \| [boolean, string]`      | Only letters and numbers   |
| `lowercase`    | `boolean \| [boolean, string]`      | Must be lowercase          |
| `uppercase`    | `boolean \| [boolean, string]`      | Must be uppercase          |
| `regex`        | `RegExp \| [RegExp, string]`        | Custom regex pattern       |
| `custom`       | `(value: string) => string \| null` | Custom validation function |

### Custom Error Messages

Use tuple syntax `[value, errorMessage]` for custom error messages:

```tsx
const { paste } = usePaste({
  minLength: [5, "Code must be at least 5 characters"],
  regex: [/^[A-Z0-9]+$/, "Only uppercase letters and numbers allowed"],
});
```

### Custom Validation

```tsx
const { paste } = usePaste({
  custom: (value) => {
    if (!value.includes("@")) {
      return "Must contain @ symbol";
    }
    return null; // valid
  },
});
```

## TypeScript

Full TypeScript support included:

```tsx
import { usePaste, PasteSchema, PasteResult } from "use-paste-input";

const schema: PasteSchema = {
  minLength: 3,
  alphanumeric: true,
};

const { result } = usePaste(schema);

if (result?.type === "text") {
  console.log(result.value); // string
} else if (result?.type === "image") {
  console.log(result.file); // File
  console.log(result.url); // string (blob URL)
}
```

## Browser Compatibility

Requires browsers with Clipboard API support:

- Chrome 66+
- Firefox 63+
- Safari 13.1+
- Edge 79+

## License

MIT © [Elvis Okumu](https://github.com/Code-with-Elvis)

## Repository

[https://github.com/Code-with-Elvis/use-paste-input](https://github.com/Code-with-Elvis/use-paste-input)
