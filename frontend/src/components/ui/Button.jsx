import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const variantStyles = {
  primary: "bg-primary-600 text-white hover:bg-primary-500 shadow-sm transition-colors",
  secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors",
  danger: "bg-danger-500 text-white hover:bg-red-400 shadow-sm transition-colors",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 transition-colors",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-5 py-2.5 text-lg",
  icon: "p-2",
};

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
