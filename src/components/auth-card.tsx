import Image from 'next/image';

type Props = Readonly<{
  title: string;
  children: React.ReactNode;
}>;

export function AuthCard({ title, children }: Props) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-6 text-center">
        <Image
          src="/logo-wide-red.png"
          alt="Web Menu"
          loading="eager"
          sizes="100%"
          className="mx-auto mb-4"
          height={0}
          width={0}
          style={{
            width: 150,
            height: 'auto',
          }}
          priority
        />
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      {children}
    </div>
  );
}
