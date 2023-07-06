import Format from "../Format"
import { describe, it, expect } from "vitest";
describe("Test Format if it gives the right data", () => {
   
   const sampleValue = new Format("10",3)
   const totalVCount = sampleValue.wei;
   const decimals = sampleValue.decimals;
   const fixed = sampleValue.fixed;
   const value = "2.34";
   const totalFixed = "23.4";
   const totalFixedWei = "2340"
   it("format working right", () => {
      // setting value of asset
      sampleValue.value = value;
      console.log(sampleValue.value)
      expect(sampleValue.fixed).toBe(fixed);
      expect(sampleValue.wei).toBe(totalVCount);
      expect(sampleValue.value.wei).toBe(totalFixedWei);
      expect(sampleValue.value.fixed).toBe(totalFixed);
   })
   
   
})