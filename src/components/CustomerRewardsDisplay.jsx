import React from 'react'

export const CustomerRewardsDisplay = ({rewardsData,filteredMonths}) => {
  return (
    <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  {filteredMonths.map(month => (
                    <th key={month} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {month}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rewardsData.map((customer, index) => (
                  <tr key={customer.customerId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.customerId}
                        </div>
                      </div>
                    </td>
                    {filteredMonths.map(month => (
                      <td key={month} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          customer.monthlyRewards[month] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {customer.monthlyRewards[month] || 0} points
                        </span>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {customer.totalRewards} points
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  )
}
