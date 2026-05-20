import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function Markets() {
  const navigate = useNavigate();

  // Redirect to House View since it's the first Markets tab
  useEffect(() => {
    navigate('/house-view');
  }, [navigate]);

  return null;
}