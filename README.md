# 🏠 Free Real Estate MCP Server

## 100% Free Canadian Real Estate Data - No API Keys Required!

A comprehensive Model Context Protocol (MCP) server providing free access to Canadian real estate market data, statistics, and analytics from government and public sources.

## ✨ Key Features

### 🆓 **Completely Free**

- **No API keys required**
- **No registration needed**
- **No usage limits**
- **No paid tiers**

### 🇨🇦 **Comprehensive Canadian Coverage**

- All provinces and major cities
- Government data sources (Statistics Canada, CMHC)
- Municipal open data
- Real estate board public reports

### 📊 **Rich Data Sources**

- **Statistics Canada**: Official housing price indices and economic indicators
- **CMHC**: Housing starts, market reports, and rental data
- **Bank of Canada**: Interest rates affecting housing market
- **Municipal Data**: Property assessments and tax information
- **Census Data**: Demographics and housing characteristics
- **Economic Indicators**: GDP, unemployment, inflation affecting real estate

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server (no configuration needed!)
npm start
```

**That's it!** The server works immediately with free data sources.

## 🛠️ Available Tools (19 Total)

### **Government Data Sources (5 tools)**

1. **`get_statcan_housing_data`** - Statistics Canada housing data
2. **`get_statcan_housing_index`** - Official housing price index
3. **`get_cmhc_market_data`** - CMHC market reports
4. **`get_cmhc_housing_starts`** - Housing construction data
5. **`get_opengov_housing_data`** - Open Government Portal data

### **Market Analysis (5 tools)**

6. **`get_basic_market_data`** - Basic market overview for any city
7. **`get_free_market_trends`** - Market trends and forecasts
8. **`get_rental_market_data`** - Rental market statistics
9. **`get_realestate_board_data`** - Local real estate board reports
10. **`get_market_comparison`** - Compare multiple cities

### **Property & Demographics (4 tools)**

11. **`get_property_listings`** - Property listings from public sources
12. **`get_municipal_property_data`** - Municipal property data
13. **`get_property_tax_data`** - Property assessments and taxes
14. **`get_census_housing_data`** - Demographics and housing characteristics

### **Advanced Analysis (3 tools)**

15. **`get_neighborhood_insights`** - Neighborhood analysis and demographics
16. **`get_comprehensive_market_analysis`** - Complete market analysis combining all sources
17. **`get_affordability_analysis`** - Housing affordability calculator

### **Economic Context (2 tools)**

18. **`get_boc_interest_rates`** - Bank of Canada interest rates
19. **`get_economic_indicators`** - Economic factors affecting housing

## 📝 Usage Examples

### Get Vancouver Market Data

```json
{
  "tool": "get_basic_market_data",
  "args": {
    "city": "Vancouver",
    "dataType": "all"
  }
}
```

### Compare Toronto vs Montreal

```json
{
  "tool": "get_market_comparison",
  "args": {
    "cities": ["Toronto", "Montreal"],
    "metrics": ["price", "affordability", "market_activity"]
  }
}
```

### Housing Affordability Analysis

```json
{
  "tool": "get_affordability_analysis",
  "args": {
    "city": "Calgary",
    "householdIncome": 85000
  }
}
```

### Comprehensive Market Analysis

```json
{
  "tool": "get_comprehensive_market_analysis",
  "args": {
    "city": "Ottawa",
    "province": "ON"
  }
}
```

### Get Property Listings with Filters

```json
{
  "tool": "get_property_listings",
  "args": {
    "city": "Toronto",
    "propertyType": "condo",
    "priceRange": { "min": 400000, "max": 800000 },
    "limit": 25
  }
}
```

## 🏙️ Supported Cities

**Major Cities**: Toronto, Vancouver, Calgary, Ottawa, Montreal, Edmonton, Winnipeg, Halifax, Quebec City, Hamilton, Kitchener, London, Victoria, Saskatoon, Regina, St. John's

**Provinces**: All Canadian provinces (ON, BC, AB, QC, MB, SK, NS, NB, PE, NL)

## 📈 Data Sources

### Government & Official Sources

- **Statistics Canada Web Data Service** - Housing price indices, economic indicators
- **CMHC Housing Market Information Portal** - Market reports, housing starts, rental data
- **Bank of Canada API** - Interest rates, monetary policy
- **Canada Open Government Portal** - Public housing datasets
- **Canadian Census Data** - Demographics, housing characteristics

### Municipal & Regional Sources

- **Property Assessment Data** - Municipal tax assessments and property values
- **Real Estate Board Reports** - Market statistics and trends
- **Municipal Open Data** - Property listings and zoning information

## 🔧 Development

```bash
# Development mode with hot reload
npm run dev

# Build
npm run build

# Type checking
npm run typecheck

# Lint code
npm run lint
```

## 📊 Sample Data Structure

### Market Data Response

```json
{
  "city": "Vancouver",
  "averagePrice": 1231793,
  "medianPrice": 769601,
  "totalSales": 1358,
  "averageDaysOnMarket": 45,
  "priceChangePercent": -6.97,
  "inventoryCount": 3154,
  "source": "CMHC Market Data"
}
```

### Comprehensive Analysis Response

```json
{
  "city": "Toronto",
  "analysisDate": "2024-08-17",
  "marketOverview": {
    /* CMHC market data */
  },
  "demographics": {
    /* Census housing data */
  },
  "propertyAssessment": {
    /* Municipal tax data */
  },
  "rentalMarket": {
    /* Rental statistics */
  },
  "economicContext": {
    /* Economic indicators */
  },
  "constructionActivity": {
    /* Housing starts */
  },
  "summary": [
    "Strong price growth indicates a seller's market",
    "Fast-moving market with high demand"
  ]
}
```

## 🌟 Why This Server?

### **Versus Paid APIs**

- ❌ Paid APIs: Require expensive subscriptions ($50-500/month)
- ✅ This server: **Completely free**

### **Versus Limited Free APIs**

- ❌ Limited APIs: Only basic data, require registration
- ✅ This server: **Comprehensive data from 19 different tools**

### **Versus Web Scraping**

- ❌ Web scraping: Unreliable, breaks frequently, legal issues
- ✅ This server: **Official government data sources, always reliable**

## 🏆 Perfect For

- **Real Estate Analysis** - Market research and investment decisions
- **Academic Research** - Housing market studies and analysis
- **App Development** - Building real estate applications
- **Personal Use** - Home buying/selling decisions
- **Market Reports** - Creating comprehensive market analysis

## 📄 License

MIT License - Free for commercial and personal use

## 🤝 Contributing

Contributions welcome! This server uses only public, free data sources to ensure it remains completely free for everyone.

---

**🎯 Start using comprehensive Canadian real estate data in seconds - no setup required!**
