import React from "react";

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
  const { className = "", style, children, ...rest } = props;
  const headingId = props.id || getHeadingId(children);

  return (
    <h2
      id={headingId}
      className={`mt-16 mb-6 block w-full box-border break-words border-b border-current/10 pb-4 text-3xl font-semibold tracking-[-0.05em] text-zinc-900 md:text-4xl dark:text-zinc-100 ${className}`.trim()}
      style={{ scrollMarginTop: "1rem", ...style }}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const MdxH3 = (props: any) => {
  const { children, ...rest } = props;
  const headingId = props.id || getHeadingId(children);

  return (
    <h3
      id={headingId}
      className="pt-8 text-xl font-semibold tracking-[-0.04em] text-zinc-900 dark:text-zinc-100"
      {...rest}
    >
      {children}
    </h3>
  );
};

export const MdxP = (props: any) => {
  return (
    <p
      className="mb-6 max-w-3xl text-[1.03rem] leading-8 text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  );
};

export const MdxUl = (props: any) => {
  return (
    <ul
      className="mb-6 list-disc list-inside space-y-2 text-[1.02rem] leading-7 text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  );
};