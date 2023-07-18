export default function formatTime(timestamp) {
    const currentTime = Date.now();
    const timeDiff = currentTime - timestamp;
  
    // 定义时间间隔的阈值（毫秒）
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;
  
    if (timeDiff < minute) {
      return `${Math.floor(timeDiff / 1000)}秒前`;
    } else if (timeDiff < hour) {
      return `${Math.floor(timeDiff / minute)}分钟前`;
    } else if (timeDiff < day) {
      return `${Math.floor(timeDiff / hour)}小时前`;
    } else if (timeDiff < month) {
      return `${Math.floor(timeDiff / day)}天前`;
    } else if (timeDiff < year) {
      return `${Math.floor(timeDiff / month)}个月前`;
    } else {
      return `${Math.floor(timeDiff / year)}年前`;
    }
  }