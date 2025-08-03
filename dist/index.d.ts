#!/usr/bin/env ts-node
import { PortfolioMonitor } from './monitoring/portfolio-monitor';
import { EmergencyResponse } from './emergency/emergency-response';
declare const app: import("express-serve-static-core").Express;
declare const portfolioMonitor: PortfolioMonitor;
declare const emergencyResponse: EmergencyResponse;
export { app, portfolioMonitor, emergencyResponse };
//# sourceMappingURL=index.d.ts.map