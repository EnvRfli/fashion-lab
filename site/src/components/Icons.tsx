import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: "false" as const,
    ...props,
  };
}

export function ShirtIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8.6 4.2 12 6.4l3.4-2.2 4.1 2.1c.6.3.8.9.5 1.5l-1.8 3.4-2.1-1v8.2c0 .8-.6 1.4-1.4 1.4H9.3c-.8 0-1.4-.6-1.4-1.4v-8.2l-2.1 1L4 6.3c-.3-.6-.1-1.2.5-1.5l4.1-2.1Z" />
      <path d="M9.8 4.6 12 8l2.2-3.4" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function SortIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 4v16M4 17l3 3 3-3M17 20V4M14 7l3-3 3 3" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.6-3.2 3.4-5.2 7-5.2s6.4 2 7 5.2" />
    </svg>
  );
}

export function LogOutIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10M14 8l4 4-4 4M8 12h10" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4 10 8-6 8 6v9.2c0 .4-.4.8-.8.8H4.8a.8.8 0 0 1-.8-.8V10Z" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  );
}

export function SchoolIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 20h18M5 20V9l7-4 7 4v11M9 20v-4h6v4" />
      <path d="M9 11h.01M15 11h.01M9 14h.01M15 14h.01" />
    </svg>
  );
}

export function CategoryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4" />
    </svg>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m5 17 5-5 3.5 3.5L16 13l3 3.5" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19c.4-2.7 2.6-4.4 5.5-4.4s5.1 1.7 5.5 4.4M15 6.2a3 3 0 0 1 0 5.6M16.5 14.8c2 .4 3.5 2 3.8 4.2" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v11M8 11l4 4 4-4M5 19h14" />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 20V9M8 13l4-4 4 4M5 5h14" />
    </svg>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4 20 1-4.2L16.4 4.4a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19 4 20Z" />
      <path d="m15 6 3 3" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M9 7V5.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5V7M6 7l1 12.2c0 .4.4.8.9.8h8.2c.5 0 .9-.4.9-.8L18 7M10 11v5M14 11v5" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.8 12s3.2-6 9.2-6 9.2 6 9.2 6-3.2 6-9.2 6-9.2-6-9.2-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.2M12 16.2v.1" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 7.8v.1" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="m8.4 10.8 7.2-3.6M8.4 13.2l7.2 3.6" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 5h5v5M19 5l-7 7M19 14v4.5c0 .3-.2.5-.5.5h-13c-.3 0-.5-.2-.5-.5v-13c0-.3.2-.5.5-.5H10" />
    </svg>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 4h8v3.5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5v1.5A3.5 3.5 0 0 0 8.5 11M16 6h3v1.5A3.5 3.5 0 0 1 15.5 11M12 11.5V16M9 20h6M10 16h4l.6 4H9.4l.6-4Z" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5c2.8-.8 5.3-.2 8 1.5 2.7-1.7 5.2-2.3 8-1.5v13c-2.8-.8-5.3-.2-8 1.5-2.7-1.7-5.2-2.3-8-1.5v-13Z" />
      <path d="M12 7v13" />
    </svg>
  );
}

export function CapIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m3 9 9-4 9 4-9 4-9-4Z" />
      <path d="M6.5 10.7V15c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.3M21 9v5" />
    </svg>
  );
}

export function TeddyIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="7" cy="7" r="2.4" />
      <circle cx="17" cy="7" r="2.4" />
      <path d="M5.5 13.5a6.5 6.5 0 0 1 13 0v2.8a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4v-2.8Z" />
      <path d="M10 15.5h.01M14 15.5h.01M10.5 18c1 .7 2 .7 3 0" />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg {...base(props)} className={`spin ${props.className ?? ""}`}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}
