import React from 'react';
import Button from './Button';

const UnauthenticatedPage: React.FC = () => {
  return (
    <section className="flex flex-col min-h-600 mt-10 bg-[url('../public/cloud.png')] bg-no-repeat bg-custom-size bg-right sm-max:bg-[url('../public/lins.png')]">
      <h1 className="color-white text-6xl font-medium">Welcome to API Nexus</h1>
      <p className="my-2 text-lg">A powerful tool for testing and interacting with your APIs.</p>
      <div className="flex gap-4 my-8">
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </section>
  );
};

export default UnauthenticatedPage;
