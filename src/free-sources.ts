import axios from "axios";

export class FreeRealEstateDataClient {
  private api = axios.create({ timeout: 10000 });

  // Open Government Portal Housing Data (Free, No Auth)
  async getStatCanHousingData(province: string = "ON") {
    try {
      // Search for Statistics Canada housing data via Open Government Portal
      const response = await this.api.get(
        "https://open.canada.ca/data/en/api/3/action/package_search",
        {
          params: {
            q: `housing ${province} statistics canada`,
            organization: "statcan",
            sort: "metadata_modified desc",
            rows: 15,
          },
        },
      );
      return this.parseStatCanData(response.data, province);
    } catch (error) {
      console.warn("Open Government API error:", error);
      console.warn(`Open Government API error for ${province}:`, error);
      return null;
    }
  }

  // CMHC Housing Market Data via Open Government Portal (Free, No Auth)
  async getCMHCMarketData(city: string) {
    try {
      // Search for CMHC market data by city
      const response = await this.api.get(
        "https://open.canada.ca/data/en/api/3/action/package_search",
        {
          params: {
            q: `market data ${city}`,
            organization: "cmhc-schl",
            sort: "metadata_modified desc",
            rows: 10,
          },
        },
      );
      
      // Also get US Census housing data for comparison (free, no auth)
      const censusResponse = await this.api.get(
        "https://api.census.gov/data/timeseries/eits/hv",
        {
          params: {
            get: "cell_value,data_type_code,time_slot_id,category_code",
            time: "2024",
          },
        },
      );
      
      return this.parseCMHCData(response.data, censusResponse.data, city);
    } catch (error) {
      console.warn("CMHC/Census API error:", error);
      console.warn(`CMHC/Census API error for ${city}:`, error);
      return null;
    }
  }

  // Municipal property data - No free public API available
  async getMunicipalPropertyData(city: string, _limit: number = 20) {
    console.warn(`Municipal property data not available for ${city} - no free public API exists`);
    return [];
  }

  // Rental market data - No free public API available
  async getRentalMarketData(city: string) {
    console.warn(`Rental market data not available for ${city} - no free public API exists`);
    return null;
  }

  // Market trends - No free public API available
  async getMarketTrends(city: string) {
    console.warn(`Market trends data not available for ${city} - no free public API exists`);
    return null;
  }

  private parseStatCanData(data: any, province: string) {
    let referenceDate = new Date().toISOString().split('T')[0];
    let datasetCount = 0;
    
    // Parse Open Government search results for StatCan data
    if (data?.result?.results) {
      datasetCount = data.result.count || 0;
      const datasets = data.result.results;
      
      console.log(`Found ${datasetCount} Statistics Canada housing datasets`);
      
      // Look for housing price index data
      for (const dataset of datasets) {
        if (dataset.title && dataset.title.toLowerCase().includes('housing price')) {
          console.log(`Found housing price dataset: ${dataset.title}`);
          if (dataset.metadata_modified) {
            referenceDate = dataset.metadata_modified.split('T')[0];
          }
        }
      }
    }
    
    return {
      province,
      referenceDate,
      datasetCount,
      source: "Statistics Canada via Open Government Portal",
      apiUrl: "https://open.canada.ca/data/en/api/3/action/package_search",
      note: "Real data extraction from datasets not yet implemented",
    };
  }

  private parseCMHCData(cmhcData: any, censusData: any, city: string) {
    let datasetCount = 0;
    
    // Parse CMHC data from Open Government Portal
    if (cmhcData?.result?.results) {
      datasetCount = cmhcData.result.count || 0;
      console.log(`Found ${datasetCount} CMHC datasets for ${city}`);
    }
    
    // Parse US Census data for additional context
    if (censusData && Array.isArray(censusData)) {
      console.log(`Received ${censusData.length} housing vacancy records from US Census`);
    }
    
    return {
      city,
      datasetCount,
      source: "CMHC via Open Government Portal + US Census",
      note: "Real data extraction from datasets not yet implemented",
    };
  }
  

  private getCityProvince(city: string): string {
    const cityProvinces = {
      Toronto: "ON",
      Vancouver: "BC",
      Calgary: "AB",
      Ottawa: "ON",
      Montreal: "QC",
      Edmonton: "AB",
      Winnipeg: "MB",
      Halifax: "NS",
    };
    return cityProvinces[city as keyof typeof cityProvinces] || "ON";
  }
}
