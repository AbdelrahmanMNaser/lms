import { Check, X, Info, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";
import {
  ToastContainer,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ────────────────────────────────────────────────────────
 * Styles & Config
 * ──────────────────────────────────────────────────────── */
const baseIconClass = "flex h-5 w-5 items-center justify-center rounded-full";

const baseCloseButtonClass =
  "absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center border rounded-full transition hover:opacity-80";

const baseNotificationClass = "font-bold shadow-2xl px-4 py-3 rounded-xl border-2";

export type NotificationVariant = "success" | "error" | "info" | "warning";

export const variantClasses = {
  success: {
    bg: "bg-slate-950 border-accent/30 text-accent",
    iconCircle: "bg-accent",
    iconText: "text-slate-950",
    closeButton: "border-accent bg-slate-950 text-accent hover:bg-slate-900",
  },
  error: {
    bg: "bg-slate-950 border-danger/30 text-danger",
    iconCircle: "bg-danger",
    iconText: "text-slate-950",
    closeButton: "border-danger bg-slate-950 text-danger hover:bg-slate-900",
  },
  info: {
    bg: "bg-slate-950 border-primary/30 text-primary",
    iconCircle: "bg-primary",
    iconText: "text-slate-950",
    closeButton: "border-primary bg-slate-950 text-primary hover:bg-slate-900",
  },
  warning: {
    bg: "bg-slate-950 border-yellow-500/30 text-yellow-500",
    iconCircle: "bg-yellow-500",
    iconText: "text-slate-950",
    closeButton: "border-yellow-500 bg-slate-950 text-yellow-500 hover:bg-slate-900",
  },
} as const;

/* ────────────────────────────────────────────────────────
 * Helper Components
 * ──────────────────────────────────────────────────────── */

export const CustomCloseButton = ({
  closeToast,
  type,
}: {
  closeToast?: () => void;
  type: NotificationVariant;
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        closeToast?.();
      }}
      type="button"
      className={clsx(baseCloseButtonClass, variantClasses[type].closeButton)}
    >
      <X size={12} strokeWidth={3} />
    </button>
  );
};

export const VariantIcon = ({ variant }: { variant: NotificationVariant }) => {
  const Icon = variant === "success" ? Check : variant === "error" ? X : variant === "info" ? Info : AlertTriangle;

  return (
    <div className={clsx(baseIconClass, variantClasses[variant].iconCircle)}>
      <Icon
        size={14}
        strokeWidth={3}
        className={variantClasses[variant].iconText}
      />
    </div>
  );
};

/* ────────────────────────────────────────────────────────
 * Main Notification Container
 * ──────────────────────────────────────────────────────── */

export const Notification = () => (
  <ToastContainer
    position="top-center"
    theme="dark"
    newestOnTop
    hideProgressBar
    className="fixed! left-1/2! -translate-x-1/2! flex! flex-col! items-center! px-0! w-[calc(100vw-2rem)]! top-4! md:top-8! md:w-80!"
    toastClassName={(context) =>
      clsx(
        baseNotificationClass,
        variantClasses[(context?.type as NotificationVariant) || "info"].bg,
        "relative flex items-center gap-3 mb-4 w-full md:w-auto"
      )
    }
    bodyClassName={() => "flex items-center gap-3 p-0 m-0 w-full"}
    closeButton={(props) => (
      <CustomCloseButton 
        closeToast={props.closeToast} 
        type={(props.type as NotificationVariant) || "info"} 
      />
    )}
    icon={(props) => <VariantIcon variant={(props.type as NotificationVariant) || "info"} />}
  />
);
