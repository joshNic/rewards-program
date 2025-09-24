import { describe,it,expect } from "vitest";
import { calculateRewardPoints, processCustomerRewards, filteredMonths } from "../rewardsUtil";

describe("Rewards Utility Functions", () => {
  describe("calculateRewardPoints", () => {
    it("should return 0 points for amounts less than or equal to $50", () => {
      expect(calculateRewardPoints(30)).toBe(0);
      expect(calculateRewardPoints(50)).toBe(0);
    });

    it("should return correct points for amounts between $51 and $100", () => {
      expect(calculateRewardPoints(75)).toBe(25);
      expect(calculateRewardPoints(100)).toBe(50);
    });

    it("should return correct points for amounts over $100", () => {
      expect(calculateRewardPoints(120)).toBe(90); // 2*20 + 50
      expect(calculateRewardPoints(150)).toBe(150); // 2*50 + 50
    });
  });

  describe("processCustomerRewards", () => {
    const mockData = [
      { customerId: "C001", customerName: "John Doe", amount: 120, date: "2024-01-15" },
      { customerId: "C001", customerName: "John Doe", amount: 75, date: "2024-01-22" },
      { customerId: "C002", customerName: "Jane Smith", amount: 200, date: "2024-02-10" },
    ];

    it("should process rewards correctly for multiple customers", () => {
      const result = processCustomerRewards(mockData);
      expect(result).toHaveLength(2);

      const janeRewards = result.find(c => c.customerId === "C002");
      expect(janeRewards.totalRewards).toBe(250); // 2*100 + 50
      expect(janeRewards.monthlyRewards["Feb"]).toBe(250);
    });
  });

  describe("filteredMonths", () => {
    const mockRewardsData = [
      {
        customerId: "C001",
        customerName: "John Doe",
        monthlyRewards: { Jan: 140, Feb: 50 },
        totalRewards: 190,
      },
      {
        customerId: "C002",
        customerName: "Jane Smith",
        monthlyRewards: { Feb: 250, Mar: 100 },
        totalRewards: 350,
      },
    ];

    it("should return unique months from rewards data", () => {
      const result = filteredMonths(mockRewardsData);
      expect(result).toContain("Jan");
      expect(result).toContain("Feb");
      expect(result).toContain("Mar");
      expect(result).toHaveLength(3);
    });
  });
});