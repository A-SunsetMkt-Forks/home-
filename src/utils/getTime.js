import { h } from "vue";
import { SpaCandle } from "@icon-park/vue-next";
import dayjs from "dayjs";

// 时钟
export const getCurrentTime = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
  let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentTime = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday: weekday[time.getDay()],
  };
  return currentTime;
};

// 时光胶囊
export const getTimeCapsule = () => {
  const now = dayjs();
  const dayText = {
    day: "Today",
    week: "This Week",
    month: "This Month",
    year: "This Year",
  };
  /**
   * 计算时间差的函数
   * @param {String} unit 时间单位，可以是 'day', 'week', 'month', 'year'
   */
  const getDifference = (unit) => {
    // 获取当前时间单位的开始时间
    const start = now.startOf(unit);
    // 获取当前时间单位的结束时间
    const end = now.endOf(unit);
    // 计算总的天数或小时数
    const total = end.diff(start, unit === "day" ? "hour" : "day") + 1;
    // 计算已经过去的天数或小时数
    let passed;
    if (unit === "week" && now.day() === 0) {
      // 如果是星期日
      passed = total - 1;
    } else {
      passed = now.diff(start, unit === "day" ? "hour" : "day");
    }
    const remaining = total - passed;
    const percentage = (passed / total) * 100;
    // 返回数据
    return {
      name: dayText[unit],
      total: total,
      passed: passed,
      remaining: remaining,
      percentage: percentage.toFixed(2),
    };
  };
  return {
    day: getDifference("day"),
    week: getDifference("week"),
    month: getDifference("month"),
    year: getDifference("year"),
  };
};

// 欢迎提示
export const helloInit = () => {
  const hour = new Date().getHours();
  let hello = null;
  if (hour < 6) {
    hello = "Good early morning.";
  } else if (hour < 9) {
    hello = "Good morning.";
  } else if (hour < 12) {
    hello = "Good late morning.";
  } else if (hour < 14) {
    hello = "Good afternoon.";
  } else if (hour < 17) {
    hello = "Good late afternoon.";
  } else if (hour < 19) {
    hello = "Good evening.";
  } else if (hour < 22) {
    hello = "Good night.";
  } else {
    hello = "It's late at night.";
  }
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `<strong>${hello}</strong> And we are glad to have you here.`,
  });
};

// 默哀模式
const anniversaries = {
  6.4: "June 4th",
};
export const checkDays = () => {
  const myDate = new Date();
  const mon = myDate.getMonth() + 1;
  const date = myDate.getDate();
  const key = `${mon}.${date}`;
  if (Object.prototype.hasOwnProperty.call(anniversaries, key)) {
    console.log(`Today is ${anniversaries[key]}`);
    const gray = document.createElement("style");
    gray.innerHTML = "html{filter: grayscale(100%)}";
    document.head.appendChild(gray);
    ElMessage({
      message: `Today is ${anniversaries[key]}`,
      duration: 14000,
      icon: h(SpaCandle, { theme: "filled", fill: "#efefef" }),
    });
  }
};

// 建站日期统计
export const siteDateStatistics = (startDate) => {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const differenceInMonths = differenceInDays / 30;
  const differenceInYears = differenceInMonths / 12;
  if (differenceInYears >= 1) {
    return `本站已经苟活了 ${Math.floor(differenceInYears)} 年 ${Math.floor(
      differenceInMonths % 12,
    )} 月 ${Math.round(differenceInDays % 30)} 天`;
  } else if (differenceInMonths >= 1) {
    return `本站已经苟活了 ${Math.floor(differenceInMonths)} 月 ${Math.round(
      differenceInDays % 30,
    )} 天`;
  } else {
    return `本站已经苟活了 ${Math.round(differenceInDays)} 天`;
  }
};
