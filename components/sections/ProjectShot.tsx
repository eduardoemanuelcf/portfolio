"use client";

import { useRef } from "react";

interface Props {
  src: string;
  alt: string;
}

export function ProjectShot({ src, alt }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <figure className="mt-5 panel-sunk p-1.5 overflow-hidden" style={{ borderRadius: "2px" }}>
        <button
          type="button"
          onClick={open}
          className="block w-full"
          style={{ background: "none", border: "none", padding: 0, margin: 0, cursor: "zoom-in" }}
          aria-label={alt}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="block w-full"
            style={{ aspectRatio: "16 / 9", objectFit: "cover", objectPosition: "top", border: "1px solid var(--line)" }}
          />
        </button>
      </figure>

      <dialog
        ref={dialogRef}
        className="project-zoom"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <button type="button" className="project-zoom-close" onClick={close} aria-label="Cerrar">
          ✕
        </button>
        <img src={src} alt={alt} />
      </dialog>
    </>
  );
}
