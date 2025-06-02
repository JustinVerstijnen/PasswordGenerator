
import React, { useState } from "react";

const charset = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?/",
  similar: "il1Lo0O",
};

const generatePassword = (options) => {
  let chars = "";

  if (options.upper) chars += charset.upper;
  if (options.lower) chars += charset.lower;
  if (options.numbers) chars += charset.numbers;
  if (options.symbols) chars += charset.symbols;

  if (options.excludeSimilar) {
    chars = chars
      .split("")
      .filter((c) => !charset.similar.includes(c))
      .join("");
  }

  if (chars.length === 0) return "";

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
};

export default function PasswordGenerator() {
  const [mode, setMode] = useState("password");
  const [length, setLength] = useState(30);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [password, setPassword] = useState("");
  const [showCustomize, setShowCustomize] = useState(true);

  const handleGenerate = () => {
    if (mode === "secret") {
      const secret = generatePassword({
        length: 60,
        upper: true,
        lower: true,
        numbers: true,
        symbols: true,
        excludeSimilar: false,
      });
      setPassword(secret);
    } else {
      const pwd = generatePassword({
        length,
        upper,
        lower,
        numbers,
        symbols,
        excludeSimilar,
      });
      setPassword(pwd);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Password & Secret Generator</h1>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-center mb-4">
            <label className="mr-4">
              <input type="radio" value="password" checked={mode === "password"} onChange={() => { setMode("password"); setShowCustomize(true); }} />
              <span className="ml-2">Password</span>
            </label>
            <label>
              <input type="radio" value="secret" checked={mode === "secret"} onChange={() => { setMode("secret"); setShowCustomize(false); }} />
              <span className="ml-2">Secret (PSK)</span>
            </label>
          </div>

          {showCustomize && (
            <div className="bg-gray-100 p-4 rounded-xl mb-4">
              <div className="mb-2">
                <label>Password Length ({length})</label>
                <input type="number" className="w-full" value={length} min={8} max={256} onChange={(e) => setLength(Number(e.target.value))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} /> Uppercase</label>
                <label><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} /> Lowercase</label>
                <label><input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} /> Numbers</label>
                <label><input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> Symbols</label>
                <label className="col-span-2"><input type="checkbox" checked={excludeSimilar} onChange={(e) => setExcludeSimilar(e.target.checked)} /> Exclude Similar Characters</label>
              </div>
            </div>
          )}

          <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleGenerate}>Generate</button>

          <div className="mt-4">
            <input className="w-full border rounded p-2" readOnly value={password} />
          </div>
        </div>
      </div>
    </div>
  );
}
