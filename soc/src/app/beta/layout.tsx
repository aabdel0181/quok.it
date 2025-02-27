export default function BetaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-grow flex flex-col">{children}</main>;
}
