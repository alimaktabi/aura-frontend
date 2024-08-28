export default function EvaluationThumb({
  rating,
  ...props
}: Partial<React.HTMLProps<SVGSVGElement>> & {
  rating: number | null | undefined;
}) {
  if (!rating) return <></>;
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={rating < 0 ? 'scale(1 -1)' : undefined}
      {...props}
    >
      <path
        d="M8.55859 1.15234C9.26953 1.31641 9.73438 2 9.59766 2.71094L9.51562 3.01172C9.37891 3.75 9.10547 4.43359 8.75 5.0625H12.6875C13.3984 5.0625 14 5.66406 14 6.375C14 6.89453 13.6992 7.33203 13.2891 7.55078C13.5898 7.79688 13.7812 8.15234 13.7812 8.5625C13.7812 9.21875 13.3164 9.73828 12.7148 9.875C12.8242 10.0664 12.9062 10.2852 12.9062 10.5312C12.9062 11.1328 12.5234 11.625 11.9766 11.7891C12.0039 11.8711 12.0312 11.9805 12.0312 12.0625C12.0312 12.8008 11.4297 13.375 10.7188 13.375H8.03906C7.51953 13.375 7.02734 13.2383 6.58984 12.9375L5.52344 12.2539C4.8125 11.7617 4.375 10.9414 4.375 10.0664V9V7.6875V7.03125C4.375 6.21094 4.73047 5.47266 5.35938 4.98047L5.55078 4.81641C6.26172 4.21484 6.78125 3.42188 6.94531 2.49219L7 2.19141C7.16406 1.48047 7.84766 1.01562 8.55859 1.15234ZM0.875 5.5H2.625C3.08984 5.5 3.5 5.91016 3.5 6.375V12.5C3.5 12.9922 3.08984 13.375 2.625 13.375H0.875C0.382812 13.375 0 12.9922 0 12.5V6.375C0 5.91016 0.382812 5.5 0.875 5.5Z"
        fill={Math.abs(rating) > 2 ? 'white' : 'black'}
      />
    </svg>
  );
}
