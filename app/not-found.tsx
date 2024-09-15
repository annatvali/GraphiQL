'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PATH } from '@/constants';

export default function NotFoundPage(): ReactNode {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center pt-10 mx-4">
          <Image src={'/not-found.png'} width={300} height={600} alt="cat" className="max-w-300 h-auto" />
          <h1 className="text-4xl md:text-6xl  text-center mt-[30px]">404 - Not Found</h1>
          <Link className="text-blue-500 hover:underline" href={PATH.MAIN}>
            Main Page
          </Link>
        </div>
      </body>
    </html>
  );
}
