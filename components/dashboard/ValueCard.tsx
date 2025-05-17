import React from 'react';
import { Card } from '../ui/card';

interface ValueCardProps {
  title: string;
  value: number | string; 
}

const ValueCard = ({ title, value }: ValueCardProps) => {
  return (
    <Card className="w-full p-4 flex flex-col gap-1 rounded-xl shadow-sm">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-semibold text-primary">{value}</p>
    </Card>
  );
};

export default ValueCard;
