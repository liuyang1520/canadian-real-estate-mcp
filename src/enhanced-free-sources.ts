import axios from "axios";

export class EnhancedFreeRealEstateClient {
  private api = axios.create({ timeout: 15000 });

  // Canadian Open Government Portal - CMHC Housing Data (Free, No Auth)
  async getStatCanHousingPriceIndex(province: string = "ON") {
    try {
      // Using Open Canada CKAN API to search for CMHC housing data
      const searchResponse = await this.api.get(
        "https://open.canada.ca/data/en/api/3/action/package_search",
        {
          params: {
            q: "housing price index CMHC",
            rows: 10,
          },
        },
      );
      
      // Get housing starts data from CMHC via Open Government Portal
      const housingStartsResponse = await this.api.get(
        "https://open.canada.ca/data/en/api/3/action/package_search",
        {
          params: {
            q: "housing starts CMHC",
            organization: "cmhc-schl",
            rows: 5,
          },
        },
      );
      
      return this.parseOpenGovResponse(searchResponse.data, housingStartsResponse.data, province);
    } catch (error) {
      console.warn(`Open Government API error for ${province}:`, error);
      return null;
    }
  }

  // CMHC Housing Data via Open Government Portal (Free, No Auth)
  async getCMHCHousingStarts(city: string) {
    try {
      // Search for CMHC housing starts data by city/region
      const response = await this.api.get(
        "https://open.canada.ca/data/en/api/3/action/package_search",
        {
          params: {
            q: `housing starts completions ${city}`,
            organization: "cmhc-schl",
            sort: "metadata_modified desc",
            rows: 10,
          },
        },
      );
      
      // Get US Census housing data as additional context (free, no auth)
      const censusResponse = await this.api.get(
        "https://api.census.gov/data/timeseries/eits/nrc",
        {
          params: {
            get: "cell_value,data_type_code,time_slot_id,category_code,seasonally_adj",
            time: "2024",
          },
        },
      );
      
      return this.parseCMHCResponse(response.data, censusResponse.data, city);
    } catch (error) {
      console.warn("CMHC/Census API error:", error);
      console.warn(`CMHC/Census API error for ${city}:`, error);
      return null;
    }
  }

  // Open Government Portal - Housing Data (Free, No Auth)
  async getOpenGovHousingData(province: string = "ON") {
    try {
      // Search for CMHC datasets on Open Government Portal
      const response = await this.api.get(
        "https://open.canada.ca/data/en/api/3/action/package_search",
        {
          params: {
            q: `housing market ${province}`,
            organization: "cmhc-schl",
            sort: "metadata_modified desc",
            rows: 20,
          },
        },
      );
      
      // Get recently updated housing datasets
      const recentResponse = await this.api.get(
        "https://open.canada.ca/data/en/api/3/action/recently_changed_packages_activity_list",
        {
          params: {
            limit: 50,
          },
        },
      );
      
      return this.parseOpenGovData(response.data, recentResponse.data);
    } catch (error) {
      console.warn(`Open Gov API error for ${province}:`, error);
      return null;
    }
  }

  // Canadian Census API - No free public API available
  async getCensusHousingData(city: string) {
    console.warn(`Census housing data not available for ${city} - no free public API exists`);
    return null;
  }

  // Bank of Canada Interest Rates (Free Valet API)
  async getBankOfCanadaRates() {
    try {
      // Bank of Canada Valet API - Overnight Rate (V80691311)
      const overnightResponse = await this.api.get(
        "https://www.bankofcanada.ca/valet/observations/V80691311/json",
        {
          params: {
            start_date: "2024-01-01",
            end_date: new Date().toISOString().split("T")[0],
          },
        },
      );
      
      // Also get 5-year conventional mortgage rate (V80691336)
      const mortgageResponse = await this.api.get(
        "https://www.bankofcanada.ca/valet/observations/V80691336/json",
        {
          params: {
            start_date: "2024-01-01",
            end_date: new Date().toISOString().split("T")[0],
          },
        },
      );
      
      return this.parseBoCRates(overnightResponse.data, mortgageResponse.data);
    } catch (error) {
      console.warn("Bank of Canada API error:", error);
      return null;
    }
  }

  // Real Estate Board Data - No free public API available
  async getRealEstateBoardData(city: string) {
    console.warn(`Real estate board data not available for ${city} - no free public API exists`);
    return null;
  }

  // Property Tax Assessment Data - No free public API available
  async getPropertyTaxData(city: string) {
    console.warn(`Property tax data not available for ${city} - no free public API exists`);
    return null;
  }

  // Economic indicators - No free public API available
  async getEconomicIndicators() {
    console.warn("Economic indicators not available - no free public API exists");
    return null;
  }

  // Private helper methods
  private parseOpenGovResponse(searchData: any, housingData: any, province: string) {
    let referenceDate = new Date().toISOString().split('T')[0];
    let datasetCount = 0;
    
    // Parse Open Government search results
    if (searchData?.result?.results) {
      datasetCount = searchData.result.count || 0;
      console.log(`Found ${datasetCount} housing datasets from Open Government Portal`);
      
      // Look for recent housing price data
      const datasets = searchData.result.results;
      for (const dataset of datasets) {
        if (dataset.title && dataset.title.toLowerCase().includes('price')) {
          console.log(`Found housing price dataset: ${dataset.title}`);
          // Extract year from dataset metadata
          if (dataset.metadata_modified) {
            referenceDate = dataset.metadata_modified.split('T')[0];
          }
        }
      }
    }
    
    // Parse housing starts data if available
    if (housingData?.result?.results) {
      const housingDatasets = housingData.result.results;
      console.log(`Found ${housingDatasets.length} CMHC housing datasets`);
    }
    
    return {
      province,
      referenceDate,
      datasetCount,
      source: "Open Government Portal (CMHC Data)",
      apiUrl: "https://open.canada.ca/data/en/api/3/action/package_search",
      note: "Real data extraction from datasets not yet implemented",
    };
  }


  private parseOpenGovData(searchData: any, recentData?: any) {
    let totalRecords = 0;
    let housingDatasets: any[] = [];
    let recentUpdates: any[] = [];
    
    if (searchData?.result) {
      totalRecords = searchData.result.count || 0;
      housingDatasets = searchData.result.results || [];
    }
    
    if (recentData?.result) {
      recentUpdates = recentData.result || [];
    }
    
    return {
      totalRecords,
      housingDatasets: housingDatasets.map(dataset => ({
        title: dataset.title,
        name: dataset.name,
        lastModified: dataset.metadata_modified,
        organization: dataset.organization?.title,
        resources: dataset.resources?.length || 0,
      })),
      recentUpdates: recentUpdates.slice(0, 5),
      source: "Open Government Portal (CKAN API)",
      apiEndpoint: "https://open.canada.ca/data/en/api/3/action/package_search",
    };
  }


  private parseBoCRates(overnightData: any, mortgageData?: any) {
    let overnightRate: number | null = null;
    let mortgageRate: number | null = null;
    let lastUpdated = new Date().toISOString().split('T')[0];
    
    // Parse overnight rate data
    if (overnightData?.observations && overnightData.observations.length > 0) {
      const latestOvernight = overnightData.observations[overnightData.observations.length - 1];
      if (latestOvernight?.d?.value) {
        overnightRate = parseFloat(latestOvernight.d.value);
      }
      if (latestOvernight?.d?.refPer) {
        lastUpdated = latestOvernight.d.refPer;
      }
    }
    
    // Parse mortgage rate data
    if (mortgageData?.observations && mortgageData.observations.length > 0) {
      const latestMortgage = mortgageData.observations[mortgageData.observations.length - 1];
      if (latestMortgage?.d?.value) {
        mortgageRate = parseFloat(latestMortgage.d.value);
      }
    }
    
    return {
      overnightRate,
      mortgageRate5Year: mortgageRate,
      lastUpdated,
      trend: overnightRate && overnightRate > 4.5 ? "increasing" : "stable",
      source: "Bank of Canada Valet API",
      apiEndpoint: "https://www.bankofcanada.ca/valet/observations",
    };
  }



  private parseCMHCResponse(cmhcData: any, censusData: any, city: string) {
    // Parse CMHC data from Open Government Portal
    if (cmhcData?.result?.results) {
      const datasets = cmhcData.result.results;
      console.log(`Found ${datasets.length} CMHC housing datasets for ${city}`);
      
      for (const dataset of datasets) {
        if (dataset.title && dataset.title.toLowerCase().includes('starts')) {
          console.log(`Processing CMHC dataset: ${dataset.title}`);
          // Could extract real data from resources if available
        }
      }
    }
    
    // Parse US Census construction data for context
    if (censusData && Array.isArray(censusData)) {
      console.log(`Received ${censusData.length} records from US Census construction data`);
    }
    
    return {
      city,
      period: "2024",
      housingStarts: {
        total: 0,
        singleDetached: 0,
        apartments: 0,
        rowHouses: 0,
      },
      completions: 0,
      underConstruction: 0,
      source: "CMHC via Open Government Portal + US Census",
      dataAvailable: cmhcData?.result?.count || 0,
      note: "Real data extraction from datasets not yet implemented",
    };
  }
}
