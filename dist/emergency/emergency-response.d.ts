import { EmergencyIncident } from '../types';
export declare class EmergencyResponse {
    private incidents;
    private notificationService;
    constructor();
    createIncident(incidentData: Omit<EmergencyIncident, 'id'>): Promise<EmergencyIncident>;
    private processIncident;
    private handleP0Incident;
    private handleP1Incident;
    private handleP2Incident;
    private shouldNotifyAuthority;
    private notifyAuthority;
    private generateAuthorityTemplate;
    private getResponseTime;
    private calculateCompliance;
    updateIncidentStatus(incidentId: string, status: EmergencyIncident['status']): Promise<void>;
    getActiveIncidents(): EmergencyIncident[];
    getIncidentsByType(type: 'P0' | 'P1' | 'P2'): EmergencyIncident[];
    checkSLABreaches(): EmergencyIncident[];
    generateEmergencyReport(): {
        totalIncidents: number;
        p0Count: number;
        p1Count: number;
        p2Count: number;
        slaBreaches: number;
        averageResponseTime: number;
    };
}
//# sourceMappingURL=emergency-response.d.ts.map