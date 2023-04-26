interface Props {
  children: React.ReactNode;
}
const Scaffold = ({ children }: Props) => {
  return (
    <main className="w-full h-full bg-gray-200 text-black p-4">{children}</main>
  );
};

export default Scaffold;
