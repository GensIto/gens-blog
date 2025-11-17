type CodeLine = {
  code: string;
  prefix?: string | number;
  className?: string;
};

export const CodeBlock = ({
  lines,
  className,
}: {
  lines: CodeLine[];
  className?: string;
}) => {
  return (
    <div className={`mockup-code w-full ${className || ""}`}>
      {lines.map((line, index) => (
        <pre key={index} data-prefix={line.prefix} className={line.className}>
          <code>{line.code}</code>
        </pre>
      ))}
    </div>
  );
};
