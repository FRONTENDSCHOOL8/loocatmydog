import { useAuthStore } from '@/store/useAuthStore';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthorizationProps {
  redirectTo: string;
  children: React.ReactNode;
}

const Authorization = ({ redirectTo, children }: AuthorizationProps) => {
  const userData = useAuthStore.getState().user;
  const isEdited = userData?.isEdited;

  if (userData && isEdited) {
    return <>{children}</>;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

export default Authorization;
