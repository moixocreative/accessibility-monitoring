import { EmergencyCommunication } from '../types';
interface EmergencyAlert {
    level: 'P0' | 'P1' | 'P2';
    title: string;
    description: string;
    sites: string[];
    violations: any[];
    deadline: Date;
}
interface MaintenanceAlert {
    title: string;
    description: string;
    sites: string[];
    violations: any[];
    deadline: Date;
}
export declare class NotificationService {
    private transporter;
    constructor();
    sendEmergencyAlert(alert: EmergencyAlert): Promise<void>;
    sendMaintenanceAlert(alert: MaintenanceAlert): Promise<void>;
    sendAuthorityNotification(communication: EmergencyCommunication): Promise<void>;
    private sendEmail;
    private sendSlackNotification;
    private generateEmergencyEmail;
    private generateMaintenanceEmail;
}
export {};
//# sourceMappingURL=notification-service.d.ts.map