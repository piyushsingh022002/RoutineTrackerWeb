import React from 'react';
import { StatCard, StatTitle, StatValue } from '../../pages.styles/Dashboard.styles';

interface Props {
  title: string;
  value: React.ReactNode;
}

const StatsCard: React.FC<Props> = ({ title, value }) => {
  return (
    <StatCard>
      <StatTitle>{title}</StatTitle>
      <StatValue>{value}</StatValue>
    </StatCard>
  );
};

export default StatsCard;
