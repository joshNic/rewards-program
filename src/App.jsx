import { useEffect, useState } from "react";
import {
  processCustomerRewards,
  mockApiFetch,
  filteredMonths,
} from "./utils/rewardsUtil";
import Loading from "./components/Loading";
import { CustomerRewardsDisplay } from "./components/CustomerRewardsDisplay";
function App() {
  const [customerTransactions, setCustomerTransactions] = useState([]);
  const [customerRewards, setCustomerRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await mockApiFetch();
        setCustomerTransactions(data);
        const processedRewards = processCustomerRewards(data);
        setCustomerRewards(processedRewards);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUniqueMonths = filteredMonths(customerRewards);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Customer Rewards Program
            </h1>
            <p className="text-gray-600 mt-2">
              Points earned: 2 points per $1 over $100, 1 point per $1 between
              $50-$100
            </p>
          </div>
          <CustomerRewardsDisplay rewardsData={customerRewards} filteredMonths={filteredUniqueMonths}/>
        </div>
      </div>
    </div>
  );
}

export default App;
