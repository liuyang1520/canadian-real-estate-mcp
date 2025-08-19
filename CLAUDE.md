# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
npm run build          # Compile TypeScript to dist/
npm run dev            # Development server with hot reload
npm start             # Run compiled server
npm run typecheck     # TypeScript type checking without build
npm run lint          # ESLint code quality checks
```

### Testing
```bash
npm test              # Run Jest tests (currently configured but no tests implemented)
```

## Architecture Overview

This is a **Model Context Protocol (MCP) server** that provides free Canadian real estate data through 16 categorized tools. The server operates entirely with free government APIs and requires no authentication.

### Core Architecture Components

**MCP Server (`src/index.ts`)**
- `CanadianRealEstateMCPServer` - Main server class using MCP SDK
- Handles `ListToolsRequestSchema` and `CallToolRequestSchema` 
- Routes tool calls to appropriate handlers via switch statement
- Uses stdio transport for communication

**Tool Definitions (`src/tools.ts`)**
- 16 tools organized into 5 categories: Core Data, Market Analysis, Demographics, Municipal, Analysis
- Each tool defines `name`, `description`, and `inputSchema` (JSON Schema)
- Tools exported as categorized arrays: `coreDataTools`, `marketAnalysisTools`, etc.
- Combined into `allTools` array consumed by server

**Request Handlers (`src/handlers.ts`)**
- `RealEstateHandlers` class with methods matching each tool
- Dependency injection of two data client classes
- Consistent error handling with `McpError` wrapper
- JSON response format with `content[].type: "text"` structure

**Data Source Clients**
- `FreeRealEstateDataClient` (`src/free-sources.ts`) - Basic data operations
- `EnhancedFreeRealEstateClient` (`src/enhanced-free-sources.ts`) - Advanced analytics
- Both use axios with 10-15 second timeouts
- Connect to: Open Government Portal (CKAN API), Bank of Canada Valet API, US Census API
- Graceful fallback to mock data when APIs unavailable

### Data Flow Pattern

1. **Tool Call** → Server routes to handler method
2. **Handler** → Calls appropriate client method(s) 
3. **Client** → Makes HTTP requests to government APIs
4. **Response** → JSON data wrapped in MCP content format
5. **Error Handling** → McpError with specific error codes and fallback data

### Key Integration Points

**Tool Registration**: Tools must be added to both `tools.ts` definitions and `index.ts` switch statement

**Handler Implementation**: Each tool requires corresponding `handleGet*` method in `RealEstateHandlers`

**API Endpoints Used**:
- `https://open.canada.ca/data/en/api/3/action/package_search` (CMHC/StatCan data)
- `https://www.bankofcanada.ca/valet/observations/` (Interest rates)
- `https://api.census.gov/data/timeseries/eits/` (US housing context data)

## Data Source Philosophy

The server prioritizes **free, automatically updating government sources**:
- No API keys or authentication required anywhere
- Real-time connections to official government databases
- Fallback mock data maintains functionality during API outages
- All data sources are public and legally accessible

## Tool Categories & Usage Patterns

**Core Housing Data (4 tools)**: Government housing indices, CMHC data, interest rates, open government datasets

**Market Analysis (4 tools)**: Comprehensive market data, property listings, rental markets, trends

**Demographics & Census (2 tools)**: Census housing data, neighborhood insights with multi-source analysis

**Municipal & Assessment (2 tools)**: Property tax data, real estate board reports

**Economic & Analysis (4 tools)**: Economic indicators, affordability calculations, market comparisons, comprehensive analysis

## Critical Implementation Notes

**Error Handling**: All handlers wrap errors in `McpError` with appropriate `ErrorCode` enum values

**Type Safety**: Use `(ratesData as any).mortgageRate5Year` pattern for dynamic API response properties

**Response Format**: Always return `{ content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }`

**Province Codes**: Standard Canadian province abbreviations (ON, BC, AB, QC, MB, SK, NS, NB, PE, NL)

**City Support**: Major Canadian cities (Toronto, Vancouver, Calgary, Ottawa, Montreal, Edmonton, Winnipeg, Halifax, etc.)