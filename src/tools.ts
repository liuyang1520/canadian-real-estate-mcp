import { Tool } from "@modelcontextprotocol/sdk/types.js";

// Core Housing Data Tools
export const getHousingPriceIndexTool: Tool = {
  name: "get_housing_price_index",
  description:
    "Get official housing price index from Statistics Canada via Open Government Portal (free, no API key)",
  inputSchema: {
    type: "object",
    properties: {
      province: {
        type: "string",
        enum: ["ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "PE", "NL"],
        default: "ON",
        description: "Province code for housing price index data",
      },
    },
  },
};

export const getCMHCHousingDataTool: Tool = {
  name: "get_cmhc_housing_data",
  description:
    "Get CMHC housing starts, completions, and market data via Open Government Portal (free, no API key)",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for CMHC housing data",
      },
    },
    required: ["city"],
  },
};

export const getBankOfCanadaRatesTool: Tool = {
  name: "get_bank_of_canada_rates",
  description:
    "Get current interest rates from Bank of Canada Valet API (free, no API key)",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export const getOpenGovHousingDataTool: Tool = {
  name: "get_opengov_housing_data",
  description:
    "Get housing datasets from Canada Open Government Portal (free, no API key)",
  inputSchema: {
    type: "object",
    properties: {
      province: {
        type: "string",
        enum: ["ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "PE", "NL"],
        default: "ON",
        description: "Province for open government housing datasets",
      },
    },
  },
};

// Market Analysis Tools
export const getMarketDataTool: Tool = {
  name: "get_market_data",
  description:
    "Get comprehensive market data for Canadian cities from multiple free sources",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for market data",
      },
      dataType: {
        type: "string",
        enum: ["sales", "rentals", "trends", "all"],
        default: "all",
        description: "Type of market data to retrieve",
      },
    },
    required: ["city"],
  },
};

export const getPropertyListingsTool: Tool = {
  name: "get_property_listings",
  description:
    "Search for property listings (currently returns empty results - no free public API available)",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for property listings",
      },
      propertyType: {
        type: "string",
        enum: ["house", "condo", "townhouse", "all"],
        default: "all",
        description: "Type of property to search for",
      },
      priceRange: {
        type: "object",
        properties: {
          min: { type: "number", minimum: 0 },
          max: { type: "number", minimum: 0 },
        },
        description: "Price range filter",
      },
      limit: {
        type: "number",
        minimum: 1,
        maximum: 100,
        default: 20,
        description: "Maximum number of listings to return",
      },
    },
    required: ["city"],
  },
};

export const getRentalMarketDataTool: Tool = {
  name: "get_rental_market_data",
  description:
    "Get rental market data (currently unavailable - no free public API exists)",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for rental market data",
      },
    },
    required: ["city"],
  },
};

export const getMarketTrendsTool: Tool = {
  name: "get_market_trends",
  description:
    "Get historical market trends (currently unavailable - no free public API exists)",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for market trends",
      },
    },
    required: ["city"],
  },
};

// Demographics and Census Tools
export const getCensusHousingDataTool: Tool = {
  name: "get_census_housing_data",
  description:
    "Get housing demographics from census data (currently unavailable - no free public API exists)",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for census housing data",
      },
    },
    required: ["city"],
  },
};

export const getNeighborhoodInsightsTool: Tool = {
  name: "get_neighborhood_insights",
  description:
    "Get neighborhood demographics, characteristics, and market insights",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for neighborhood insights",
      },
      neighborhood: {
        type: "string",
        description: "Specific neighborhood name (optional)",
      },
    },
    required: ["city"],
  },
};

// Municipal and Assessment Tools
export const getPropertyTaxDataTool: Tool = {
  name: "get_property_tax_data",
  description:
    "Get property tax data (currently unavailable - no free public API exists)",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for property tax assessment data",
      },
    },
    required: ["city"],
  },
};

export const getRealEstateBoardDataTool: Tool = {
  name: "get_realestate_board_data",
  description:
    "Get real estate board data (currently unavailable - no free public API exists)",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for real estate board data",
      },
    },
    required: ["city"],
  },
};

// Economic and Analysis Tools
export const getEconomicIndicatorsTool: Tool = {
  name: "get_economic_indicators",
  description:
    "Get economic indicators (currently unavailable - no free public API exists)",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export const getAffordabilityAnalysisTool: Tool = {
  name: "get_affordability_analysis",
  description:
    "Get housing affordability analysis based on income, prices, and mortgage rates",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for affordability analysis",
      },
      householdIncome: {
        type: "number",
        description: "Annual household income for affordability calculation",
        minimum: 20000,
        default: 75000,
      },
    },
    required: ["city"],
  },
};

export const getMarketComparisonTool: Tool = {
  name: "get_market_comparison",
  description:
    "Compare housing markets between multiple Canadian cities",
  inputSchema: {
    type: "object",
    properties: {
      cities: {
        type: "array",
        items: { type: "string" },
        minItems: 2,
        maxItems: 5,
        description: "Array of city names to compare",
      },
      metrics: {
        type: "array",
        items: {
          type: "string",
          enum: ["price", "affordability", "market_activity", "growth", "all"],
        },
        default: ["all"],
        description: "Metrics to compare between cities",
      },
    },
    required: ["cities"],
  },
};

export const getComprehensiveMarketAnalysisTool: Tool = {
  name: "get_comprehensive_market_analysis",
  description:
    "Get comprehensive housing market analysis combining multiple free data sources",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name for comprehensive market analysis",
      },
      province: {
        type: "string",
        enum: ["ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "PE", "NL"],
        description: "Province code for the city",
      },
    },
    required: ["city"],
  },
};

// All tools organized by category
export const coreDataTools = [
  getHousingPriceIndexTool,
  getCMHCHousingDataTool,
  getBankOfCanadaRatesTool,
  getOpenGovHousingDataTool,
];

export const marketAnalysisTools = [
  getMarketDataTool,
  getPropertyListingsTool,
  getRentalMarketDataTool,
  getMarketTrendsTool,
];

export const demographicsTools = [
  getCensusHousingDataTool,
  getNeighborhoodInsightsTool,
];

export const municipalTools = [
  getPropertyTaxDataTool,
  getRealEstateBoardDataTool,
];

export const analysisTools = [
  getEconomicIndicatorsTool,
  getAffordabilityAnalysisTool,
  getMarketComparisonTool,
  getComprehensiveMarketAnalysisTool,
];

// All tools combined
export const allTools = [
  ...coreDataTools,
  ...marketAnalysisTools,
  ...demographicsTools,
  ...municipalTools,
  ...analysisTools,
];