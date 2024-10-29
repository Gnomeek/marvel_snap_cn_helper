import PrelineScript from "@/components/PrelineScript";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <PrelineScript />
    </>
  );
}
