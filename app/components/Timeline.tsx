type EmploymentType = "regular" | "side";

export type TimelineItem = {
  period: string;
  type: EmploymentType;
  position: string;
  company: string;
  description: string;
  skills: string[];
};

export const TIMELINE_DATA: TimelineItem[] = [
  {
    period: "2025年10月 - 現在",
    type: "regular",
    position: "フルスタックエンジニア",
    company: "株式会社パブリックテクノロジーズ",
    description:
      "Next.jsを使用したWebアプリケーション開発を担当。フロントエンドとバックエンドを担当。",
    skills: ["Next.js", "tRPC"],
  },
  {
    period: "2025年3月 - 現在",
    type: "side",
    position: "フロントエンドエンジニア",
    company: "Connectiv株式会社",
    description: "Next.jsを使用したWebアプリケーション開発を担当。",
    skills: ["Next.js"],
  },
  {
    period: "2024年7月 - 2025年1月",
    type: "side",
    position: "エンジニア",
    company: "Philduct Inc.",
    description: "コードベースのリファクタリングや新規機能の開発を担当。",
    skills: ["TypeScript", "Next.js"],
  },
  {
    period: "2023年1月 - 2025年9月",
    type: "regular",
    position: "フロントエンドエンジニア",
    company: "アイリス株式会社",
    description:
      "フロントエンドエンジニアとして、Webアプリケーションの開発を担当。簡単なバックエンドの開発も担当。",
    skills: ["React", "TypeScript", "Next.js", "FastAPI"],
  },
  {
    period: "2022年10月 - 2022年12月",
    type: "side",
    position: "エンジニア",
    company: "ジークス株式会社",
    description:
      "フロントエンドエンジニアとして、Webアプリケーションの開発を担当",
    skills: ["next.js", "react", "typescript"],
  },
  {
    period: "2021年10月 - 2022年12月",
    type: "regular",
    position: "webコーダー",
    company: "合同会社ATE UNIVERSE",
    description: "webコーダーとして、LPの作成やWordPressのカスタマイズを担当",
    skills: ["html", "css", "javascript", "wordpress"],
  },
];

type TimelineProps = {
  data: TimelineItem[];
};

const CheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
    class='w-5 h-5'
  >
    <path
      fill-rule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
      clip-rule='evenodd'
    />
  </svg>
);

export const Timeline = ({ data }: TimelineProps) => {
  return (
    <ul class='timeline timeline-vertical'>
      {data.map((item, index) => {
        const isRegular = item.type === "regular";
        const badgeClass = isRegular ? "badge-info" : "badge-accent";
        const iconColorClass = isRegular ? "text-info" : "text-accent";
        const label = isRegular ? "正社員" : "副業";
        const isLast = index === data.length - 1;

        return (
          <li key={index}>
            {index > 0 && <hr class='bg-primary' />}

            {isRegular ? (
              <>
                <div class='timeline-middle'>
                  <div class={iconColorClass}>
                    <CheckIcon />
                  </div>
                </div>
                <div class='timeline-end timeline-box'>
                  <div class='flex items-center gap-2 mb-1'>
                    <div class='font-bold'>{item.period}</div>
                    <span class={`badge ${badgeClass} badge-xs`}>{label}</span>
                  </div>
                  <div class='text-sm font-semibold'>{item.position}</div>
                  <div class='text-xs text-base-content/60'>{item.company}</div>
                  <div class='text-xs mt-2'>{item.description}</div>
                  {item.skills.length > 0 && (
                    <div class='flex flex-wrap gap-1 mt-2'>
                      {item.skills.map((skill) => (
                        <span key={skill} class='badge badge-xs'>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div class='timeline-start timeline-box'>
                  <div class='flex items-center gap-2 mb-1'>
                    <div class='font-bold'>{item.period}</div>
                    <span class={`badge ${badgeClass} badge-xs`}>{label}</span>
                  </div>
                  <div class='text-sm font-semibold'>{item.position}</div>
                  <div class='text-xs text-base-content/60'>{item.company}</div>
                  <div class='text-xs mt-2'>{item.description}</div>
                  {item.skills.length > 0 && (
                    <div class='flex flex-wrap gap-1 mt-2'>
                      {item.skills.map((skill) => (
                        <span key={skill} class='badge badge-xs'>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div class='timeline-middle'>
                  <div class={iconColorClass}>
                    <CheckIcon />
                  </div>
                </div>
              </>
            )}

            {!isLast && <hr class='bg-primary' />}
          </li>
        );
      })}
    </ul>
  );
};
