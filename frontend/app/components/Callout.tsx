"use client";
import { useTheme } from "../../src/context/ThemeContext";
import { Info, AlertTriangle, Lightbulb, ShieldAlert } from "lucide-react";

type CalloutType = "info" | "tip" | "warning" | "danger";

export default function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const { darkMode } = useTheme();

  const config = {
    info: {
      icon: Info,
      light: "bg-blue-50 border-blue-200 text-blue-900",
      dark: "bg-blue-950/30 border-blue-900/50 text-blue-200",
      iconColor: "text-blue-500",
    },
    tip: {
      icon: Lightbulb,
      light: "bg-emerald-50 border-emerald-200 text-emerald-900",
      dark: "bg-emerald-950/30 border-emerald-900/50 text-emerald-200",
      iconColor: "text-emerald-500",
    },
    warning: {
      icon: AlertTriangle,
      light: "bg-amber-50 border-amber-200 text-amber-900",
      dark: "bg-amber-950/30 border-amber-900/50 text-amber-200",
      iconColor: "text-amber-500",
    },
    danger: {
      icon: ShieldAlert,
      light: "bg-red-50 border-red-200 text-red-900",
      dark: "bg-red-950/30 border-red-900/50 text-red-200",
      iconColor: "text-red-500",
    },
  };

  const activeConfig = config[type];
  const Icon = activeConfig.icon;

  return (
    <div
      className={`my-6 flex gap-3 rounded-xl border p-4 ${
        darkMode ? activeConfig.dark : activeConfig.light
      } transition-colors duration-200`}
    >
      <div className="mt-0.5 shrink-0">
        <Icon size={18} className={activeConfig.iconColor} />
      </div>
      <div className="flex w-full flex-col gap-1">
        {title && (
          <h5 className="font-semibold tracking-tight">
            {title}
          </h5>
        )}
        <div className="prose-sm leading-relaxed opacity-90">
          {children}
        </div>
      </div>
    </div>
  );
}