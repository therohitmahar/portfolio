"use client";
import { useState } from "react";
export default function CopyEmail() {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText("therohitmahar@gmail.com");
      setMessage("Email address copied.");
    } catch {
      setMessage("Copy unavailable. Use the email link or select the address.");
    }
  }
  return (
    <div className="copy-action">
      <button className="button-secondary" type="button" onClick={copy}>
        Copy email address
      </button>
      <span role="status">{message}</span>
    </div>
  );
}
