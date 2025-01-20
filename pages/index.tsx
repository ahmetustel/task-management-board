import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Hoş Geldiniz!</h1>
      <button
        onClick={() => router.push('/board')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Board&apos;a Git
      </button>
    </div>
  );
}
