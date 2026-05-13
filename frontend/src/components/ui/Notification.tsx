import { Check, X, Info, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ────────────────────────────────────────────────────────
 * Styles
 * ──────────────────────────────────────────────────────── */
const baseIconClass = "flex h-5 w-5 items-center justify-center rounded-full";
const baseCloseButtonClass = "absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center border rounded-full transition hover:opacity-80";
const baseNotificationClass = "font-bold shadow-2xl px-4 py-3 rounded-xl border-2 mb-4 relative flex items-center gap-3";

export type NotificationVariant = "success" | "error" | "info" | "warning";

const variantStyles = {
  success: "bg-slate-950 border-accent/30 text-accent",
  error: "bg-slate-950 border-danger/30 text-danger",
  info: "bg-slate-950 border-primary/30 text-primary",
  warning: "bg-slate-950 border-yellow-500/30 text-yellow-500",
};

const iconStyles = {
  success: "bg-accent text-slate-950",
  error: "bg-danger text-slate-950",
  info: "bg-primary text-slate-950",
  warning: "bg-yellow-500 text-slate-950",
};

const closeButtonStyles = {
  success: "border-accent bg-slate-950 text-accent",
  error: "border-danger bg-slate-950 text-danger",
  info: "border-primary bg-slate-950 text-primary",
  warning: "border-yellow-500 bg-slate-950 text-yellow-500",
};

/* ────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────── */

const CustomCloseButton = ({ closeToast, type }: { closeToast?: () => void; type: NotificationVariant }) => (
  <button
    onClick={(e) => { e.stopPropagation(); closeToast?.(); }}
    className={clsx(baseCloseButtonClass, closeButtonStyles[type])}
  >
    <X size={12} strokeWidth={3} />
  </button>
);

const VariantIcon = ({ variant }: { variant: NotificationVariant }) => {
  const Icon = variant === "success" ? Check : variant === "error" ? X : variant === "info" ? Info : AlertTriangle;
  return (
    <div className={clsx(baseIconClass, iconStyles[variant])}>
      <Icon size={14} strokeWidth={3} />
    </div>
  );
};

/* ────────────────────────────────────────────────────────
 * Container
 * ──────────────────────────────────────────────────────── */

export const Notification = () => (
  <ToastContainer
    position="top-center"
    theme="dark"
    hideProgressBar
    newestOnTop
    // We use global container classes to handle the mobile centering logic
    className="fixed! left-1/2! -translate-x-1/2! w-[calc(100vw-2rem)]! top-4! md:top-8! md:w-80! flex! flex-col! items-center! px-0!"
    toastClassName={(context) => 
      clsx(
        baseNotificationClass,
        variantStyles[(context?.type as NotificationVariant) || "info"],
        "w-full md:w-auto"
      )
    }
    closeButton={(props) => <CustomCloseButton closeToast={props.closeToast} type={(props.type as NotificationVariant) || "info"} />}
    icon={(props) => <VariantIcon variant={(props.type as NotificationVariant) || "info"} />}
  />
);
