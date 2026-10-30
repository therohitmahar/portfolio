"use client";
import { useState } from "react";

const email = "therohitmahar@gmail.com";

function copyWithSelection() {
  const previousFocus = document.activeElement;
  const selection = window.getSelection();
  const previousRanges = selection
    ? Array.from({ length: selection.rangeCount }, (_, i) =>
        selection.getRangeAt(i).cloneRange(),
      )
    : [];
  const field = document.createElement("textarea");
  field.value = email;
  field.readOnly = true;
  field.tabIndex = -1;
  field.setAttribute("aria-hidden", "true");
  // Keep it selectable without moving the page or zooming mobile inputs.
  Object.assign(field.style, {
    position: "fixed",
    top: "0",
    left: "0",
    opacity: "0",
    fontSize: "16px",
  });
  document.body.appendChild(field);
  try {
    field.focus({ preventScroll: true });
    field.select();
    field.setSelectionRange(0, email.length);
    // Compatibility fallback for HTTP previews without navigator.clipboard.
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
    if (previousFocus instanceof HTMLElement)
      previousFocus.focus({ preventScroll: true });
    if (selection) {
      selection.removeAllRanges();
      previousRanges.forEach((range) => selection.addRange(range));
    }
  }
}

export default function CopyEmail() {
  const [message, setMessage] = useState("");
  async function copy() {
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        setMessage("Email address copied.");
        return;
      } catch {
        // Some browsers deny the async API but still allow selection copying.
      }
    }
    setMessage(
      copyWithSelection()
        ? "Email address copied."
        : "Copy unavailable. Use the email link or select the address.",
    );
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
