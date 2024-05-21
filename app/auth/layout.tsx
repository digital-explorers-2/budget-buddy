import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='bg-slate-200 p-10'>{children}</div>
  );
}

export default AuthLayout;
