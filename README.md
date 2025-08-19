# 🏠 Canadian Real Estate MCP Server

## 100% Free Canadian Real Estate Data - No API Keys Required!

A Model Context Protocol (MCP) server providing free access to Canadian real estate market data from **real government APIs only**. No fake data, no mock endpoints - only authentic government sources.

## ✨ Key Features

### 🆓 **Completely Free**

- **No API keys required**
- **No registration needed**
- **No usage limits**
- **No paid tiers**

### 🇨🇦 **Real Government Data Sources**

- **Statistics Canada** via Open Government Portal
- **CMHC** via Open Government Portal  
- **Bank of Canada** Valet API
- **US Census Bureau** (for housing context)

### 🎯 **Honest & Transparent**

- **Real APIs only** - No fake or simulated data
- **Clear messaging** when data sources are unavailable
- **Authentic government data** from official sources

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server (no configuration needed!)
npm start
```

**That's it!** The server connects to real government APIs immediately.

## 🛠️ Available Tools (16 Total)

### **✅ Core Data Tools (4 tools) - With Real APIs**

1. **`get_housing_price_index`** - Statistics Canada housing price index via Open Government Portal
2. **`get_cmhc_housing_data`** - CMHC housing starts and construction data via Open Government Portal
3. **`get_bank_of_canada_rates`** - Current interest rates from Bank of Canada Valet API
4. **`get_opengov_housing_data`** - Housing datasets from Canada Open Government Portal

### **⚠️ Market Analysis Tools (4 tools) - Limited Data Available**

5. **`get_market_data`** - Basic market data (connects to available government sources)
6. **`get_property_listings`** - Property listings (currently unavailable - no free public API)
7. **`get_rental_market_data`** - Rental market data (currently unavailable - no free public API)
8. **`get_market_trends`** - Market trends (currently unavailable - no free public API)

### **⚠️ Demographics Tools (2 tools) - Limited Data Available**

9. **`get_census_housing_data`** - Census housing data (currently unavailable - no free public API)
10. **`get_neighborhood_insights`** - Neighborhood analysis (limited due to data availability)

### **⚠️ Municipal Tools (2 tools) - No Free APIs Available**

11. **`get_property_tax_data`** - Property tax data (currently unavailable - no free public API)
12. **`get_realestate_board_data`** - Real estate board data (currently unavailable - no free public API)

### **⚠️ Analysis Tools (4 tools) - Limited Data Available**

13. **`get_economic_indicators`** - Economic indicators (currently unavailable - no free public API)
14. **`get_affordability_analysis`** - Housing affordability calculator (limited due to data availability)
15. **`get_market_comparison`** - Compare multiple cities (limited due to data availability)
16. **`get_comprehensive_market_analysis`** - Comprehensive analysis (limited due to data availability)

## 📝 Usage Examples

### ✅ Get Housing Price Index (Real Data)

```json
{
  "tool": "get_housing_price_index",
  "args": {
    "province": "ON"
  }
}
```

### ✅ Get Bank of Canada Interest Rates (Real Data)

```json
{
  "tool": "get_bank_of_canada_rates",
  "args": {}
}
```

### ✅ Get CMHC Housing Data (Real Data)

```json
{
  "tool": "get_cmhc_housing_data",
  "args": {
    "city": "Toronto"
  }
}
```

### ✅ Get Open Government Housing Datasets (Real Data)

```json
{
  "tool": "get_opengov_housing_data",
  "args": {
    "province": "BC"
  }
}
```

## 🏙️ Supported Coverage

**Provinces**: All Canadian provinces (ON, BC, AB, QC, MB, SK, NS, NB, PE, NL)
**Cities**: Major Canadian cities supported where government data is available

## 📈 Real Data Sources

### ✅ **Active Government APIs**

- **Statistics Canada** - Housing price indices via Open Government Portal
- **CMHC** - Housing starts and construction data via Open Government Portal
- **Bank of Canada Valet API** - Official interest rates and monetary policy data
- **US Census Bureau** - Housing construction context data (free, no auth)

### ❌ **No Free Public APIs Available**

- **Municipal Property Data** - No unified free API across Canadian municipalities
- **Real Estate Board Data** - Boards require paid subscriptions for API access
- **Census Demographics** - No free real-time API for detailed housing demographics
- **Rental Market Data** - CMHC rental data requires paid access
- **Economic Indicators** - No free consolidated API for real-time economic data

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

## 📊 Sample Real Data Response

### Housing Price Index (Real Data)

```json
{
  "province": "ON",
  "referenceDate": "2024-08-19",
  "datasetCount": 12,
  "source": "Open Government Portal (CMHC Data)",
  "apiUrl": "https://open.canada.ca/data/en/api/3/action/package_search"
}
```

### Bank of Canada Rates (Real Data)

```json
{
  "overnightRate": 4.25,
  "mortgageRate5Year": 6.89,
  "lastUpdated": "2024-08-15",
  "trend": "stable",
  "source": "Bank of Canada Valet API",
  "apiEndpoint": "https://www.bankofcanada.ca/valet/observations"
}
```

### Unavailable Data Response

```json
{
  "city": "Toronto",
  "message": "Rental market data not available - no free public API exists"
}
```

## 🌟 Why This Server?

### **Honest & Transparent**

- ✅ **Real data only** - No fake or simulated data
- ✅ **Clear messaging** when APIs are unavailable
- ✅ **Government sources** - Official, reliable data

### **Versus Other Solutions**

- ❌ **Paid APIs**: Expensive subscriptions ($50-500/month)
- ❌ **Fake Data APIs**: Generate unrealistic mock data
- ❌ **Web Scraping**: Unreliable, breaks frequently, legal issues
- ✅ **This server**: Real government data, completely free, always honest

## 🎯 Current Limitations

**Data Availability**: Many real estate data sources require paid subscriptions or are not available via free public APIs. This server only provides data from sources that are:
- Completely free
- Require no registration
- Are publicly accessible
- Are official government sources

**What This Means**: Some tools return "data not available" messages rather than fake data. This ensures complete transparency and honesty about data availability.

## 🏆 Perfect For

- **Government Data Research** - Access real official housing statistics
- **Interest Rate Monitoring** - Real-time Bank of Canada rates
- **Academic Research** - Authentic government housing data
- **Transparency** - Know exactly what data is real vs. unavailable

## 📄 License

MIT License - Free for commercial and personal use

## 🤝 Contributing

Contributions welcome! This server maintains a strict policy of **real data only** - no fake or mock data generation.

---

**🎯 Real Canadian real estate data from government sources - no fake data, complete transparency!**