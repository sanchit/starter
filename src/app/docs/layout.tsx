import { Leftbar } from "@/components/documentation/leftbar";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Leftbar key="leftbar" />
      <div className="sm:ml-[230px] sm:w-[calc(100%-230px)] w-full overflow-x-hidden">
        {children}
      </div>
    </>
  );
}
