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
}

const mockApiFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1000); // Simulate network delay
  });
};

export { calculateRewardPoints };