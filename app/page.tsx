import Image from "next/image";
import InputDialog from "./InputDialog";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <InputDialog />
    </div>
  );
}
