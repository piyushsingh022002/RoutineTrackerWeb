import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useNotes } from '../context/NotesContext';

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 26px;
`;

const ChartsRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const ChartCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  min-width: 280px;
  flex: 1 1 360px;
`;

const ChartTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`;

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 180px;
  padding: 8px 4px;
`;

const Bar = styled.div<{ $height: number }>`
  width: 24px;
  background: linear-gradient(180deg,#60a5fa,#3b82f6);
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-size: 11px;
  box-sizing: border-box;
  padding-bottom: 4px;
  height: ${props => props.$height}px;
`;

const XLabels = styled.div`
  display:flex;
  gap:8px;
  margin-top:8px;
`;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const ProgressDashboard: React.FC = () => {
  const { notes } = useNotes();

  const daily = useMemo(() => {
    const result: { label: string; count: number }[] = [];
    const today = startOfDay(new Date());
    const days = 7;
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const label = d.toLocaleDateString(undefined, { weekday: 'short' });
      const start = startOfDay(d).getTime();
      const end = start + 24 * 60 * 60 * 1000;
      const count = (notes || []).filter(n => {
        if (!n || !n.createdAt) return false;
        const t = new Date(n.createdAt).getTime();
        return t >= start && t < end;
      }).length;
      result.push({ label, count });
    }
    return result;
  }, [notes]);

  const weekly = useMemo(() => {
    const result: { label: string; count: number }[] = [];
    const today = startOfDay(new Date());
    const weeks = 8;
    for (let i = weeks - 1; i >= 0; i--) {
      const weekEnd = new Date(today.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      // week label as ISO week start date
      const weekStart = new Date(weekEnd.getTime() - 6 * 24 * 60 * 60 * 1000);
      const label = weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const start = startOfDay(weekStart).getTime();
      const end = start + 7 * 24 * 60 * 60 * 1000;
      const count = (notes || []).filter(n => {
        if (!n || !n.createdAt) return false;
        const t = new Date(n.createdAt).getTime();
        return t >= start && t < end;
      }).length;
      result.push({ label, count });
    }
    return result;
  }, [notes]);

  const maxDaily = Math.max(...daily.map(d => d.count), 1);
  const maxWeekly = Math.max(...weekly.map(w => w.count), 1);

  return (
    <Container>
      <Title>Progress Dashboard</Title>
      <ChartsRow>
        <ChartCard>
          <ChartTitle>Notes Created (last 7 days)</ChartTitle>
          <Bars>
            {daily.map((d, idx) => (
              <Bar key={d.label} $height={Math.round((d.count / maxDaily) * 160)} title={`${d.count} notes`}>
                {d.count > 0 ? d.count : ''}
              </Bar>
            ))}
          </Bars>
          <XLabels>
            {daily.map(d => <div key={d.label} style={{width:24,textAlign:'center',fontSize:12,color:'#374151'}}>{d.label}</div>)}
          </XLabels>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Notes Created Per Week (last 8 weeks)</ChartTitle>
          <Bars>
            {weekly.map(w => (
              <Bar key={w.label} $height={Math.round((w.count / maxWeekly) * 160)} title={`${w.count} notes`}>
                {w.count > 0 ? w.count : ''}
              </Bar>
            ))}
          </Bars>
          <XLabels>
            {weekly.map(w => <div key={w.label} style={{width:24,textAlign:'center',fontSize:11,color:'#374151'}}>{w.label}</div>)}
          </XLabels>
        </ChartCard>
      </ChartsRow>
    </Container>
  );
};

export default ProgressDashboard;
