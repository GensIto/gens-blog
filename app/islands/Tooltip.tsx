import { ReactNode } from "hono/jsx";

type TooltipPosition =
  | "tooltip-top"
  | "tooltip-bottom"
  | "tooltip-left"
  | "tooltip-right";
type TooltipColor =
  | "tooltip-neutral"
  | "tooltip-primary"
  | "tooltip-secondary"
  | "tooltip-accent"
  | "tooltip-info"
  | "tooltip-success"
  | "tooltip-warning"
  | "tooltip-error";

export const Tooltip = ({
  children,
  tip,
  position = "tooltip-top",
  color,
  open,
  responsive,
  className,
}: {
  children: ReactNode;
  tip: string;
  position?: TooltipPosition;
  color?: TooltipColor;
  open?: boolean;
  responsive?: boolean;
  className?: string;
}) => {
  const classes = [
    "tooltip",
    position,
    color,
    open && "tooltip-open",
    responsive && "lg:tooltip",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-tip={tip}>
      {children}
    </div>
  );
};
