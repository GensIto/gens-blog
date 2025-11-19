import { Child, FC } from "hono/jsx";

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

type TooltipProps = {
  children: Child;
  tip: string;
  position?: TooltipPosition;
  color?: TooltipColor;
  open?: boolean;
  responsive?: boolean;
  className?: string;
};

export const Tooltip: FC<TooltipProps> = ({
  children,
  tip,
  position = "tooltip-top",
  color,
  open,
  responsive,
  className,
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
