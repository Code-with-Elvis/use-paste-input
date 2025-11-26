import { usePaste } from "./hook/usePaste";

const App = () => {
  const { paste, pasted, error, result, reset } = usePaste({
    minLength: 3,
    maxLength: [50, "Too long! Maximum 50 characters"],
    alphanumeric: true,
  });

  return (
    <section>
      <div className="container">
        <h1>Pasting Hook</h1>
        <p>
          A lightweight, type-safe React hook for seamlessly handling paste
          events with customizable validation, formatting, and error handling
          capabilities.
        </p>

        <div className="form">
          <input
            value={result?.type === "text" ? result.value : ""}
            placeholder="Click paste to insert from clipboard"
            readOnly
          />
          <button onClick={paste}>Paste</button>
          {pasted && result && (
            <button onClick={reset} style={{ marginLeft: "8px" }}>
              Reset
            </button>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {pasted && result?.type === "text" && (
          <p style={{ color: "green" }}>✓ Pasted: {result.value}</p>
        )}

        {pasted && result?.type === "image" && (
          <div>
            <p style={{ color: "green" }}>✓ Image pasted</p>
            <img src={result.url} alt="Pasted" style={{ maxWidth: "300px" }} />
          </div>
        )}
      </div>
    </section>
  );
};
export default App;
