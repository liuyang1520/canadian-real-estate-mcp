import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { FreeRealEstateDataClient } from "./free-sources.js";
import { EnhancedFreeRealEstateClient } from "./enhanced-free-sources.js";

export class RealEstateHandlers {
  private freeClient: FreeRealEstateDataClient;
  private enhancedClient: EnhancedFreeRealEstateClient;

  constructor() {
    this.freeClient = new FreeRealEstateDataClient();
    this.enhancedClient = new EnhancedFreeRealEstateClient();
  }

  // Core Housing Data Handlers
  async handleGetHousingPriceIndex(args: any) {
    try {
      const { province = "ON" } = args;
      const data = await this.enhancedClient.getStatCanHousingPriceIndex(province);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get housing price index: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetCMHCHousingData(args: any) {
    try {
      const { city } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const data = await this.enhancedClient.getCMHCHousingStarts(city);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get CMHC housing data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetBankOfCanadaRates(_args: any) {
    try {
      const data = await this.enhancedClient.getBankOfCanadaRates();

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get Bank of Canada rates: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetOpenGovHousingData(args: any) {
    try {
      const { province = "ON" } = args;
      const data = await this.enhancedClient.getOpenGovHousingData(province);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get open government housing data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Market Analysis Handlers
  async handleGetMarketData(args: any) {
    try {
      const { city, dataType = "all" } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      let data: any = {};

      if (dataType === "all" || dataType === "sales") {
        data.marketData = await this.freeClient.getCMHCMarketData(city);
      }

      if (dataType === "all" || dataType === "rentals") {
        data.rentalData = await this.freeClient.getRentalMarketData(city);
      }

      if (dataType === "all" || dataType === "trends") {
        data.trendsData = await this.freeClient.getMarketTrends(city);
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get market data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetPropertyListings(args: any) {
    try {
      const { city, propertyType = "all", priceRange, limit = 20 } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const properties = await this.freeClient.getMunicipalPropertyData(city, limit);

      // Apply filters
      let filteredProperties = properties || [];
      
      if (properties.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  city,
                  message: "No property listings available - no free public API exists",
                  totalResults: 0,
                  properties: [],
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      if (propertyType !== "all") {
        filteredProperties = filteredProperties.filter(
          (p: any) => p.propertyType === propertyType,
        );
      }

      if (priceRange) {
        filteredProperties = filteredProperties.filter((p: any) => {
          if (priceRange.min && p.price < priceRange.min) return false;
          if (priceRange.max && p.price > priceRange.max) return false;
          return true;
        });
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                city,
                totalResults: filteredProperties.length,
                filters: { propertyType, priceRange },
                properties: filteredProperties.slice(0, limit),
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get property listings: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetRentalMarketData(args: any) {
    try {
      const { city } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const data = await this.freeClient.getRentalMarketData(city);

      if (!data) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  city,
                  message: "Rental market data not available - no free public API exists",
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get rental market data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetMarketTrends(args: any) {
    try {
      const { city } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const data = await this.freeClient.getMarketTrends(city);

      if (!data) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  city,
                  message: "Market trends data not available - no free public API exists",
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get market trends: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Demographics and Census Handlers
  async handleGetCensusHousingData(args: any) {
    try {
      const { city } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const data = await this.enhancedClient.getCensusHousingData(city);

      if (!data) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  city,
                  message: "Census housing data not available - no free public API exists",
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get census housing data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetNeighborhoodInsights(args: any) {
    try {
      const { city, neighborhood } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const censusData = await this.enhancedClient.getCensusHousingData(city);
      const marketData = await this.enhancedClient.getRealEstateBoardData(city);
      const propertyData = await this.enhancedClient.getPropertyTaxData(city);

      const insights = this.generateNeighborhoodInsights(
        censusData,
        marketData,
        propertyData,
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                city,
                neighborhood: neighborhood || "City-wide",
                insights,
                data: {
                  census: censusData,
                  market: marketData,
                  assessment: propertyData,
                },
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get neighborhood insights: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Municipal and Assessment Handlers
  async handleGetPropertyTaxData(args: any) {
    try {
      const { city } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const data = await this.enhancedClient.getPropertyTaxData(city);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get property tax data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetRealEstateBoardData(args: any) {
    try {
      const { city } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const data = await this.enhancedClient.getRealEstateBoardData(city);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get real estate board data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Economic and Analysis Handlers
  async handleGetEconomicIndicators(_args: any) {
    try {
      const data = await this.enhancedClient.getEconomicIndicators();

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get economic indicators: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetAffordabilityAnalysis(args: any) {
    try {
      const { city, householdIncome = 75000 } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      const marketData = await this.enhancedClient.getRealEstateBoardData(city);
      const ratesData = await this.enhancedClient.getBankOfCanadaRates();
      const censusData = await this.enhancedClient.getCensusHousingData(city);

      if (!marketData || !ratesData) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  city,
                  message: "Affordability analysis not available - required data sources unavailable",
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      const affordabilityMetrics = {
        householdIncome,
        averageHomePrice: (marketData as any).marketReport?.averageSalePrice || 0,
        monthlyPayment: 0,
        affordabilityRatio: 0,
        maxAffordablePrice: 0,
        downPaymentRequired: 0,
        qualifiesForMortgage: false,
      };

      // Calculate affordability metrics
      const downPaymentPercent = affordabilityMetrics.averageHomePrice > 500000 ? 0.2 : 0.05;
      affordabilityMetrics.downPaymentRequired = Math.round(
        affordabilityMetrics.averageHomePrice * downPaymentPercent,
      );

      const mortgageAmount = affordabilityMetrics.averageHomePrice - affordabilityMetrics.downPaymentRequired;
      const monthlyRate = ((ratesData as any).mortgageRate5Year || 6.0) / 100 / 12;
      const numPayments = 30 * 12;

      if (monthlyRate > 0) {
        affordabilityMetrics.monthlyPayment = Math.round(
          (mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1),
        );
      }

      affordabilityMetrics.affordabilityRatio = Math.round(
        (affordabilityMetrics.monthlyPayment * 12 / householdIncome) * 100,
      );

      affordabilityMetrics.maxAffordablePrice = Math.round(
        (householdIncome * 0.28 / 12 / monthlyRate) *
        (1 - Math.pow(1 + monthlyRate, -numPayments)),
      );

      affordabilityMetrics.qualifiesForMortgage = affordabilityMetrics.affordabilityRatio <= 28;

      const recommendations = this.generateAffordabilityRecommendations(
        affordabilityMetrics,
        city,
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                city,
                affordabilityMetrics,
                recommendations,
                currentMarketData: marketData,
                interestRates: ratesData,
                demographics: censusData,
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get affordability analysis: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetMarketComparison(args: any) {
    try {
      const { cities, metrics = ["all"] } = args;
      if (!cities || !Array.isArray(cities) || cities.length < 2) {
        throw new McpError(
          ErrorCode.InvalidParams,
          "At least 2 cities are required for comparison",
        );
      }

      const cityData = [];
      for (const city of cities) {
        const marketData = await this.enhancedClient.getRealEstateBoardData(city);
        const rentalData = await this.freeClient.getRentalMarketData(city);
        const censusData = await this.enhancedClient.getCensusHousingData(city);

        cityData.push({
          city,
          marketData,
          rentalData,
          censusData,
        });
      }

      const comparison = this.generateCityComparison(cityData, metrics);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                cities,
                metrics,
                comparison,
                summary: this.generateComparisonSummary(cityData),
                detailedData: cityData,
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get market comparison: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async handleGetComprehensiveMarketAnalysis(args: any) {
    try {
      const { city, province } = args;
      if (!city || typeof city !== "string") {
        throw new McpError(ErrorCode.InvalidParams, "City is required");
      }

      // Gather data from multiple sources
      const marketData = await this.enhancedClient.getRealEstateBoardData(city);
      const censusData = await this.enhancedClient.getCensusHousingData(city);
      const economicData = await this.enhancedClient.getEconomicIndicators();
      const ratesData = await this.enhancedClient.getBankOfCanadaRates();
      const trendsData = await this.freeClient.getMarketTrends(city);

      const analysis = {
        city,
        province,
        analysisDate: new Date().toISOString(),
        marketSummary: marketData ? this.generateMarketSummary(marketData, censusData, economicData) : [],
        keyMetrics: {
          averagePrice: marketData ? (marketData as any).marketReport?.averageSalePrice || 0 : 0,
          daysOnMarket: marketData ? (marketData as any).marketReport?.averageDaysOnMarket || 0 : 0,
          salesVolume: marketData ? (marketData as any).marketReport?.salesVolume || 0 : 0,
          priceIndex: 0, // housingIndexData no longer provides this
          vacancyRate: 0, // rentalData no longer provides this
          medianIncome: 0, // censusData no longer provides this
        },
        trends: trendsData,
        economicFactors: economicData,
        interestRates: ratesData,
        demographics: censusData,
        recommendations: this.generateMarketRecommendations(marketData, economicData),
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(analysis, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get comprehensive market analysis: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Helper methods
  private generateMarketSummary(marketData: any, _censusData: any, _economicData: any) {
    const summary = [];

    if (marketData.marketReport?.priceIndex > 105) {
      summary.push("Strong price growth indicates a seller's market");
    } else if (marketData.marketReport?.priceIndex < 95) {
      summary.push("Price decline suggests buyer opportunities");
    } else {
      summary.push("Market shows stable pricing conditions");
    }

    if (marketData.marketReport?.averageDaysOnMarket < 20) {
      summary.push("Very competitive market, properties sell quickly");
    }

    return summary;
  }

  private generateAffordabilityRecommendations(metrics: any, city: string) {
    const recommendations = [];

    if (!metrics.qualifiesForMortgage) {
      recommendations.push("Consider increasing income or looking at more affordable areas");
      recommendations.push(`Explore alternative markets near ${city}`);
    }

    if (metrics.downPaymentRequired > 100000) {
      recommendations.push("Consider saving for a larger down payment to reduce monthly costs");
    }

    if (metrics.affordabilityRatio > 35) {
      recommendations.push("Housing costs may strain budget - consider smaller properties");
    }

    return recommendations;
  }

  private generateMarketRecommendations(marketData: any, economicData: any) {
    const recommendations = [];

    if (marketData.marketReport?.averageDaysOnMarket < 15) {
      recommendations.push("Sellers market - act quickly on good properties");
    }

    if (economicData.inflationRate > 4) {
      recommendations.push("High inflation may impact mortgage rates");
    }

    return recommendations;
  }

  private generateNeighborhoodInsights(censusData: any, marketData: any, _propertyData: any): string[] {
    const insights = [];

    if (censusData.medianHouseholdIncome > 80000) {
      insights.push("High-income neighborhood with strong buying power");
    }

    if (censusData.dwellingTypes.singleDetached > 60) {
      insights.push("Primarily single-family homes, family-oriented area");
    } else if (censusData.dwellingTypes.apartments > 50) {
      insights.push("High-density area with many condominiums and apartments");
    }

    if (marketData.marketReport?.averageDaysOnMarket < 20) {
      insights.push("Very competitive market, properties sell quickly");
    }

    return insights;
  }

  private generateCityComparison(cityData: any[], _metrics: string[]) {
    const comparison: any = {};

    cityData.forEach(({ city, marketData, rentalData }) => {
      comparison[city] = {
        averagePrice: marketData.marketReport?.averageSalePrice || 0,
        priceChange: marketData.marketReport?.priceIndex || 0,
        marketActivity: marketData.marketReport?.averageDaysOnMarket || 0,
        rentalYield: Math.round(
          ((rentalData.averageRents?.twoBedroom * 12) / (marketData.marketReport?.averageSalePrice || 1)) * 100
        ) / 100,
      };
    });

    return comparison;
  }

  private generateComparisonSummary(cityData: any[]) {
    const prices = cityData.map(d => d.marketData.marketReport?.averageSalePrice || 0);
    const mostExpensive = cityData[prices.indexOf(Math.max(...prices))];
    const mostAffordable = cityData[prices.indexOf(Math.min(...prices))];

    return {
      mostExpensive: mostExpensive?.city,
      mostAffordable: mostAffordable?.city,
      priceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices),
      },
    };
  }
}