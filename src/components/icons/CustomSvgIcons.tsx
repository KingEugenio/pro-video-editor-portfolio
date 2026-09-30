import React from 'react';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

// 1. Authentic WhatsApp Vector Icon
export const WhatsAppIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M17.472 14.382c-.301-.15-1.782-.878-2.058-.978-.276-.101-.476-.15-.676.15-.201.3-.777.978-.952 1.178-.175.201-.35.226-.652.075-.3-.15-1.266-.467-2.41-1.488-.89-.794-1.492-1.776-1.667-2.076-.176-.301-.019-.463.132-.613.136-.134.301-.35.452-.526.15-.175.201-.3.3-.501.101-.2.05-.375-.025-.526-.075-.15-.676-1.63-1.028-2.23-.275-.652-.551-.551-.752-.551-.201 0-.426-.025-.652-.025-.226 0-.602.075-.928.426-.326.35-1.228 1.203-1.228 2.934 0 1.73 1.254 3.409 1.429 3.635.176.226 2.469 3.771 5.981 5.289.837.362 1.49.578 2.001.739.84.267 1.605.229 2.21.139.674-.101 2.058-.84 2.348-1.655.29-.815.29-1.516.202-1.666-.088-.15-.288-.225-.59-.375zM12.042 2C6.502 2 2.008 6.495 2.008 12.035c0 1.947.558 3.764 1.524 5.309L2 22.042l4.834-1.503a10.01 10.01 0 0 0 5.208 1.496c5.54 0 10.034-4.495 10.034-10.035C22.076 6.495 17.582 2 12.042 2zm0 18.258a8.214 8.214 0 0 1-4.223-1.164l-.303-.18-3.134.975.985-3.056-.197-.314a8.204 8.204 0 0 1-1.26-4.484c0-4.542 3.696-8.238 8.24-8.238 4.544 0 8.24 3.696 8.24 8.238 0 4.543-3.696 8.239-8.24 8.239z" />
  </svg>
);

// 2. Authentic YouTube Vector Icon
export const YouTubeIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// 3. Authentic Instagram Vector Icon
export const InstagramIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// 4. Authentic X / Twitter Vector Icon
export const TwitterXIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// 5. Authentic LinkedIn Vector Icon
export const LinkedInIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-1.66-1.66 1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

// 6. Authentic Google Drive Vector Icon
export const GoogleDriveIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5L7.71 3.5z"
      fill="#4285F4"
    />
    <path
      d="M16.29 3.5H7.71l3.42 6h8.58L16.29 3.5z"
      fill="#34A853"
    />
    <path
      d="M19.71 9.5H11.13l-3.42 6h12l3.42-6h-3.42z"
      fill="#FBBC05"
    />
  </svg>
);

// 7. Authentic WordPress Vector Icon
export const WordPressIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M12.158 12.786l-2.698 7.85c.806.236 1.657.364 2.54.364 1.488 0 2.875-.36 4.102-.992l-3.944-7.222zm-7.61-4.048c-.027.24-.04.484-.04.73 0 1.674.604 3.208 1.606 4.398L9.08 5.795c-1.89.47-3.414 1.623-4.532 2.943zm12.358-4.22c.69 0 1.25.105 1.25.105-.333.376-.84.947-.84 1.956 0 1.077.568 2.052.568 3.328 0 1.01-.39 2.09-.908 3.325l-2.85 8.448c2.812-1.637 4.71-4.697 4.71-8.202 0-3.642-2.05-6.8-5.068-8.384l3.138-.576zm-5.064-1.986c-4.992 0-9.084 3.65-9.832 8.448l5.88 16.14a9.92 9.92 0 0 0 3.952.816 9.87 9.87 0 0 0 3.73-.732L9.626 5.86c0-.022.012-.04.012-.06 0-.256-.098-.42-.098-.636 0-.616.716-.948 1.41-.948.09 0 .178.01.268.016A10.02 10.02 0 0 0 11.842 2.532zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

// 8. Authentic DaVinci Resolve Vector Icon
export const DaVinciResolveIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 5.5v6.5l5.5 3.2"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <circle cx="12" cy="6" r="1.5" fill="#FF5E3A" />
    <circle cx="17.5" cy="15.5" r="1.5" fill="#00D4FF" />
    <circle cx="6.5" cy="15.5" r="1.5" fill="#8B5CF6" />
  </svg>
);

// 9. Authentic Adobe Premiere Pro Vector Icon
export const PremiereProIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="4" fill="#00005B" stroke="#9999FF" strokeWidth="1.5" />
    <text
      x="7.5"
      y="15.5"
      fill="#EA77FF"
      fontSize="10"
      fontFamily="monospace"
      fontWeight="bold"
      letterSpacing="-0.5"
    >
      Pr
    </text>
  </svg>
);

// 10. Authentic Adobe After Effects Vector Icon
export const AfterEffectsIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="4" fill="#00005B" stroke="#D291FF" strokeWidth="1.5" />
    <text
      x="6.5"
      y="15.5"
      fill="#D291FF"
      fontSize="10"
      fontFamily="monospace"
      fontWeight="bold"
      letterSpacing="-0.5"
    >
      Ae
    </text>
  </svg>
);

// 11. Authentic Apple Final Cut Pro Clapper Vector Icon
export const FinalCutIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4z" />
    <path d="M4 11l2-7h14l-2 7H4z" />
    <path d="M7 4l2 7M11 4l2 7M15 4l2 7" />
  </svg>
);

// 12. Vimeo Vector Icon
export const VimeoIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M22.8 6.7c-.1 2.2-1.6 5.2-4.5 9-3 3.9-5.5 5.8-7.5 5.8-1.2 0-2.2-1.1-3-3.3l-1.6-6c-.6-2.2-1.2-3.3-2-3.3-.2 0-.8.4-1.8 1.1L1 8.8C2.3 7.6 3.6 6.5 4.8 5.4c1.7-1.5 2.9-2.3 3.8-2.3 2.1 0 3.3 1.4 3.7 4.3.4 3.1.7 5.1.8 5.9.4 2.5 1 3.7 1.7 3.7.6 0 1.4-.8 2.4-2.5 1-1.6 1.5-2.8 1.5-3.6 0-1.3-.7-1.9-2.1-1.9-.6 0-1.3.1-2 .4 1.3-4.2 3.8-6.2 7.5-6.2 2.7.1 4 1.5 3.9 4.1z" />
  </svg>
);

// 13. Frame.io Vector Icon
export const FrameIoIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h5M8 16h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 14. Star Rating Vector Icon (Filled & Half/Outline)
export const StarSvgIcon: React.FC<{ filled?: boolean; className?: string }> = ({
  filled = true,
  className = 'w-4 h-4 text-amber-400',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// 15. Befitting Custom Settings & Precision Tuning SVG Icon (replaces AI sparkle/starburst)
export const CustomTuningIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M4 21v-7" />
    <path d="M4 10V3" />
    <path d="M12 21v-9" />
    <path d="M12 8V3" />
    <path d="M20 21v-5" />
    <path d="M20 12V3" />
    <path d="M1 14h6" />
    <path d="M9 8h6" />
    <path d="M17 16h6" />
  </svg>
);

// 16. Custom Geometric Diamond Star SVG Icon
export const DiamondStarIcon: React.FC<SvgIconProps> = ({ className = 'w-4 h-4', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M12 2l2.8 6.4L21 12l-6.2 3.6L12 22l-2.8-6.4L3 12l6.2-3.6L12 2z" />
  </svg>
);

