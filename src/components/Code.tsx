import { useRef, useState } from "react";

export type Props = {};

export function Code(props: Props) {
  const [hasCopied, setHasCopied] = useState(false);
  const inputEl = useRef<HTMLInputElement | null>(null);
  const code = getCode();
  return (
    <div
      className="fixed top-0 left-0 p-1 pb-4 m-2 text-gray-900 rounded cursor-pointer dark:text-gray-100"
      onClick={() => {
        inputEl.current?.select();
        document.execCommand("copy");
        setHasCopied(true);
      }}
    >
      <span className="absolute bottom-0 right-0 p-1 text-xs text-gray-900 dark:text-gray-100">
        {hasCopied ? "Copied!" : "Click to copy"}
      </span>
      <input
        className="max-w-0"
        ref={inputEl}
        value={window.location.href + code}
        type="text"
        readOnly
      />
      {code}
    </div>
  );
}

export function getCode() {
  const codeLength = 8;
  const codeInUrl = window.location.pathname.slice(1);
  if (codeInUrl && codeInUrl.length === codeLength) {
    localStorage.code = codeInUrl;
    return codeInUrl;
  } else {
    if (localStorage.code) {
      return localStorage.code;
    } else {
      const code = generateCode(codeLength);
      localStorage.code = code;
      return code;
    }
  }
}

function generateCode(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
