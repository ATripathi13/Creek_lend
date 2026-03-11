"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankLookup = exports.submitApplication = void 0;
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const encryption_1 = require("../utils/encryption");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
const submitApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, loanAmount, ssn, dob, dlState, dlNumber, employerName, monthlyIncome, incomeFrequency, routingNumber, accountNumber, bankName, tcpaConsent, utmSource, utmMedium, utmCampaign, } = req.body;
        // 1. Create or find Borrower
        let borrower = yield prisma.borrower.findUnique({
            where: { email },
        });
        if (!borrower) {
            borrower = yield prisma.borrower.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                },
            });
        }
        // 2. Encrypt sensitive PII
        const encryptedSsn = (0, encryption_1.encrypt)(ssn);
        const encryptedDlNumber = (0, encryption_1.encrypt)(dlNumber);
        const encryptedAccountNum = (0, encryption_1.encrypt)(accountNumber);
        // 3. Create Application
        const application = yield prisma.application.create({
            data: {
                borrowerId: borrower.id,
                loanAmount,
                status: 'PENDING',
                encryptedSsn,
                encryptedDlNumber,
                encryptedAccountNum,
                dlState,
                dob,
                employerName,
                monthlyIncome,
                incomeFrequency,
                routingNumber,
                bankName,
                // UTM Tracking
                utmTracking: {
                    create: {
                        source: utmSource || 'direct',
                        medium: utmMedium || 'none',
                        campaign: utmCampaign || 'none',
                    },
                },
                // Consent Record
                consentRecords: {
                    create: {
                        type: 'TCPA',
                        agreed: tcpaConsent,
                        ipAddress: req.ip || '0.0.0.0',
                        userAgent: req.get('user-agent') || 'unknown',
                    },
                },
            },
            include: {
                utmTracking: true,
            },
        });
        // In production, we would trigger Meta CAPI or Email webhooks here
        res.status(201).json({
            success: true,
            applicationId: application.id,
            message: 'Application submitted and encrypted successfully.',
        });
    }
    catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({
            success: false,
            error: 'Inernal Server Error',
            message: error.message,
        });
    }
});
exports.submitApplication = submitApplication;
const bankLookup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { routingNumber } = req.params;
    if (!routingNumber || routingNumber.length !== 9) {
        return res.status(400).json({ error: 'Invalid routing number' });
    }
    try {
        // In a real scenario, we'd call a service like routingnumber.direct or a bank API
        // Mocking response for demo
        const mockBanks = {
            "123456789": "JPMORGAN CHASE BANK",
            "987654321": "BANK OF AMERICA",
            "111222333": "WELLS FARGO",
        };
        const bankName = mockBanks[routingNumber] || "FEDERAL RESERVE BANK";
        res.json({ routingNumber, bankName });
    }
    catch (error) {
        res.status(500).json({ error: 'Bank lookup failed' });
    }
});
exports.bankLookup = bankLookup;
