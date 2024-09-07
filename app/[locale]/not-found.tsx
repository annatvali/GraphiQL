import React from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center  justify-center min-h-[88vh] mt-40 mx-4">
      <Image src={'/not-found.png'} width={300} height={600} alt="cat" className="max-w-300 h-auto" />
      <h1 className="text-4xl md:text-6xl  text-center mt-[30px]">404 - Not Found</h1>
      <p className="text-center mt-[30px]">Sorry, we couldn`t find the page you were looking for.</p>
      <Link className="text-blue-500 hover:underline" href="/">
        Go to main page
      </Link>
    </div>
  );
};

export default NotFoundPage;
