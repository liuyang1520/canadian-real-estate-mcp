#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { RealEstateHandlers } from "./handlers.js";
import { allTools } from "./tools.js";

class CanadianRealEstateMCPServer {
  private server: Server;
  private handlers: RealEstateHandlers;

  constructor() {
    this.server = new Server(
      {
        name: "canadian-real-estate-mcp",
        version: "2.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    this.handlers = new RealEstateHandlers();
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: allTools,
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          // Core Housing Data Tools
          case "get_housing_price_index":
            return await this.handlers.handleGetHousingPriceIndex(args);

          case "get_cmhc_housing_data":
            return await this.handlers.handleGetCMHCHousingData(args);

          case "get_bank_of_canada_rates":
            return await this.handlers.handleGetBankOfCanadaRates(args);

          case "get_opengov_housing_data":
            return await this.handlers.handleGetOpenGovHousingData(args);

          // Market Analysis Tools
          case "get_market_data":
            return await this.handlers.handleGetMarketData(args);

          case "get_property_listings":
            return await this.handlers.handleGetPropertyListings(args);

          case "get_rental_market_data":
            return await this.handlers.handleGetRentalMarketData(args);

          case "get_market_trends":
            return await this.handlers.handleGetMarketTrends(args);

          // Demographics and Census Tools
          case "get_census_housing_data":
            return await this.handlers.handleGetCensusHousingData(args);

          case "get_neighborhood_insights":
            return await this.handlers.handleGetNeighborhoodInsights(args);

          // Municipal and Assessment Tools
          case "get_property_tax_data":
            return await this.handlers.handleGetPropertyTaxData(args);

          case "get_realestate_board_data":
            return await this.handlers.handleGetRealEstateBoardData(args);

          // Economic and Analysis Tools
          case "get_economic_indicators":
            return await this.handlers.handleGetEconomicIndicators(args);

          case "get_affordability_analysis":
            return await this.handlers.handleGetAffordabilityAnalysis(args);

          case "get_market_comparison":
            return await this.handlers.handleGetMarketComparison(args);

          case "get_comprehensive_market_analysis":
            return await this.handlers.handleGetComprehensiveMarketAnalysis(args);

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Tool not found: ${name}`,
            );
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }

        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error(
      "Canadian Real Estate MCP Server running - 100% Free, No API Keys Required!",
    );
  }
}

async function main() {
  try {
    const server = new CanadianRealEstateMCPServer();
    await server.run();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
  });
}