// app/components/MdxTypography.tsx
"use client";
import React from "react";
import { useTheme } from "../../src/context/ThemeContext";

const getHeadingId = (children: React.ReactNode) => {
  const text = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      return "";
    })
    .join("")
    .trim();

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

export const MdxH2 = (props: any) => {
  const { darkMode } = useTheme();
  const { className = "", style, children, ...rest } = props;
  const headingId = props.id || getHeadingId(children);

  return (
    <h2
      id={headingId}
      className={`mt-16 mb-6 block w-full box-border break-words border-b border-current/10 pb-4 text-3xl font-semibold tracking-[-0.05em] text-current md:text-4xl ${
        darkMode ? "text-zinc-100" : "text-zinc-900"
      } ${className}`.trim()}
      style={{ scrollMarginTop: "1rem", ...style }}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const MdxH3 = (props: any) => {
  const { darkMode } = useTheme();
  const { children, ...rest } = props;
  const headingId = props.id || getHeadingId(children);

  return (
    <h3
      id={headingId}
      className={`pt-8 text-xl font-semibold tracking-[-0.04em] ${
        darkMode ? "text-zinc-100" : "text-zinc-900"
      }`}
      {...rest}
    >
      {children}
    </h3>
  );
};

export const MdxP = (props: any) => {
  const { darkMode } = useTheme();
  return (
    <p
      className={`mb-6 max-w-3xl text-[1.03rem] leading-8 text-current/80 ${
        darkMode ? "text-zinc-300" : "text-zinc-700"
      }`}
      {...props}
    />
  );
};

export const MdxUl = (props: any) => {
  const { darkMode } = useTheme();
  return (
    <ul
      className={`mb-6 list-disc list-inside space-y-2 text-[1.02rem] leading-7 text-current/80 ${
        darkMode ? "text-zinc-300" : "text-zinc-700"
      }`}
      {...props}
    />
  );
};
