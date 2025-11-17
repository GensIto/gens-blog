import { ReactNode } from "hono/jsx";

type LinkColor =
  | "link-neutral"
  | "link-primary"
  | "link-secondary"
  | "link-accent"
  | "link-success"
  | "link-info"
  | "link-warning"
  | "link-error";

export const Link = ({
  children,
  href,
  color,
  hover,
  className,
  ...props
}: {
  children: ReactNode;
  href: string;
  color?: LinkColor;
  hover?: boolean;
  className?: string;
  [key: string]: unknown;
}) => {
  const classes = ["link", color, hover && "link-hover", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
};
