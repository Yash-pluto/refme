// app/components/MdxTypography.tsx
"use client";
import { useTheme } from "../../src/context/ThemeContext";

export const MdxH2 = (props: any) => {
  const { darkMode } = useTheme();
  return (
    <h2
      className={`text-2xl md:text-3xl font-bold uppercase tracking-tight mt-12 mb-6 border-b pb-4 sticky top-0 z-10 transition-colors duration-200 ${
        darkMode
          ? "text-cyan-400 border-[#222222] bg-[#0A0A0A]"
          : "text-indigo-600 border-[#D1D1D1] bg-[#F4F4F0]"
      }`}
      {...props}
    />
  );
};

export const MdxH3 = (props: any) => {
  const { darkMode } = useTheme();
  return (
    <h3
      className={`text-xl font-bold uppercase tracking-tight pt-8 transition-colors duration-200 ${
        darkMode ? "text-emerald-500" : "text-emerald-600"
      }`}
      {...props}
    />
  );
};

export const MdxP = (props: any) => {
  const { darkMode } = useTheme();
  return (
    <p
      className={`text-lg opacity-80 leading-relaxed max-w-3xl font-medium mb-6 transition-colors duration-200 ${
        darkMode ? "text-[#E5E5E5]" : "text-[#111111]"
      }`}
      {...props}
    />
  );
};

export const MdxUl = (props: any) => {
  const { darkMode } = useTheme();
  return (
    <ul
      className={`list-disc list-inside mb-6 opacity-80 leading-relaxed transition-colors duration-200 ${
        darkMode ? "text-[#E5E5E5]" : "text-[#111111]"
      }`}
      {...props}
    />
  );
};
