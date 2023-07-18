export default function getDaysFromNow(timestamp) {
    const currentTime = Date.now();
    const timeDiff = currentTime - timestamp;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    
    const days = Math.floor(timeDiff / millisecondsPerDay);
    
    if (days >= 365) {
      return `${Math.floor(days / 365)}年`;
    } else {
      return `${days}天`;
    }
  }