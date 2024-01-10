interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h1 className={"text-3xl font-semibold"}>Auth</h1>
      <p className="text-muted-foregroudn text-sm">{label}</p>
    </div>
  );
};
