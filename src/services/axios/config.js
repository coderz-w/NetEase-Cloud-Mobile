// 根据import.meta.env.MODE区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

let baseURL = 'https://api.hanling.space'
const timeout = 10000

// if (import.meta.env.MODE === 'development') {
//   BASE_URL = 'http://codercba.com:5000'
// } else if (import.meta.env.MODE=== 'production') {
//   BASE_URL = 'http://codercba.com:5000'
// } else {
//   BASE_URL = 'http://codercba.com:5000'
// }

export { baseURL, timeout }