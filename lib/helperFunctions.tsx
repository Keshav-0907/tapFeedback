export const getCurrentDate = ({ date }: { date: string }): string => {
    const d = new Date(date);
  
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();
  
    const getDaySuffix = (day: number): string => {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${getDaySuffix(day)} ${month} ${year}`;
  };
  