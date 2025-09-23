import { MOCK_DATA } from '../store/data'
const calculateRewardPoints = (amount) => {
    let rewardPoints = 0;
    if (amount > 100) {
      rewardPoints += (amount - 100) * 2 + 50;
    } else if (amount > 50) {
      rewardPoints += (amount - 50); 
    }


  return rewardPoints;
};

const processCustomerRewards = (data) => {
    const customerRewards = {};
    data.forEach((data) => {
    const {customerId, customerName, amount, date} = data;
    
    const month = new Date(date).toLocaleString('default', { month: 'short' });
    const rewardPoints = calculateRewardPoints(amount);
    if (!customerRewards[customerId]) {
        customerRewards[customerId] = {
            customerId,
            customerName,
            monthlyRewards: {},
            totalRewards: 0
        };
    }
    if (!customerRewards[customerId].monthlyRewards[month]) {
        customerRewards[customerId].monthlyRewards[month] = 0;
        }
    customerRewards[customerId].monthlyRewards[month] += rewardPoints;
    customerRewards[customerId].totalRewards += rewardPoints;
    });
    return Object.values(customerRewards);
  
}

const filteredMonths = (data)=>{
    const monthsSet = new Set();
    data.forEach((data) => {
        Object.keys(data.monthlyRewards).forEach((month) => {
            monthsSet.add(month);
        });
    });
    return Array.from(monthsSet);
}

const mockApiFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1500); // Simulate network delay
  });
};

export { calculateRewardPoints,processCustomerRewards,mockApiFetch,filteredMonths };