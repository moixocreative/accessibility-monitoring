"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditStatus = exports.Technology = exports.ViolationSeverity = exports.EmergencyLevel = void 0;
var EmergencyLevel;
(function (EmergencyLevel) {
    EmergencyLevel["P0_CRITICAL"] = "P0";
    EmergencyLevel["P1_HIGH"] = "P1";
    EmergencyLevel["P2_MEDIUM"] = "P2";
})(EmergencyLevel || (exports.EmergencyLevel = EmergencyLevel = {}));
var ViolationSeverity;
(function (ViolationSeverity) {
    ViolationSeverity["CRITICAL"] = "critical";
    ViolationSeverity["SERIOUS"] = "serious";
    ViolationSeverity["MODERATE"] = "moderate";
    ViolationSeverity["MINOR"] = "minor";
})(ViolationSeverity || (exports.ViolationSeverity = ViolationSeverity = {}));
var Technology;
(function (Technology) {
    Technology["WEBFLOW"] = "webflow";
    Technology["LARAVEL"] = "laravel";
    Technology["WORDPRESS"] = "wordpress";
})(Technology || (exports.Technology = Technology = {}));
var AuditStatus;
(function (AuditStatus) {
    AuditStatus["PENDING"] = "pending";
    AuditStatus["IN_PROGRESS"] = "in-progress";
    AuditStatus["COMPLETED"] = "completed";
    AuditStatus["FAILED"] = "failed";
})(AuditStatus || (exports.AuditStatus = AuditStatus = {}));
//# sourceMappingURL=index.js.map