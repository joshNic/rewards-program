import { useEffect, useState } from 'react'

function App() {

  const [customerTransactions, setCustomerTransactions] = useState([])
  const [customerRewards, setCustomerRewards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // console.log(calculateRewards(MOCK_DATA
    // ))
  },[])  
  return (
    <>
      <div>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
        
      </div>
    </>
    
  )
}

export default App
