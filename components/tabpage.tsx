export default function TabPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center md:flex-row gap-20 pt-10 ">
      {children}
    </div>
  );
}
