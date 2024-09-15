'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PATH } from '@/constants';
import GitHub from './components/GitHub';

export default function NotFoundPage(): ReactNode {
  return (
    <html lang="en">
      <body className="mt-23">
        <div className="flex flex-col items-center justify-center pt-10 mx-4">
          <Image
            src={'/not-found.png'}
            width={300}
            height={600}
            alt="cat"
            className="max-w-300 h-auto w-auto"
            priority
          />
          <h1 className="text-4xl md:text-6xl text-center mt-[30px]">404 - Not Found</h1>
          <Link className="text-blue-500 hover:underline mt-[30px]" href={PATH.MAIN}>
            Main Page
          </Link>
        </div>
        <footer className="flex flex-col md:flex-row ms:gap-2 justify-around items-center max-w-1440px mx-auto border-t-2 border-white w-full min-h-11">
          <Link
            href="https://github.com/your-profile"
            target="_blank"
            className="flex items-center gap-1.5 text-white hover:text-custom-gray font-light text-[20px]"
            rel="noreferrer"
          >
            <GitHub />
            <span>GitHub</span>
          </Link>
          <p className="text-white font-light text-[20px]">
            &copy; <span id="year"></span> 2024
          </p>
          <Link
            href="https://rs.school/courses/reactjs"
            target="_blank"
            className="flex items-center gap-1.5 text-white hover:text-custom-gray font-light text-[20px]"
            rel="noreferrer"
          >
            RS School
          </Link>
        </footer>
      </body>
    </html>
  );
}
