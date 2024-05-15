import Image from "next/image";

export default function LoadingBall() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image src="/loadingBall.svg" alt="loading" width={200} height={200} />
    </div>
  );
}
