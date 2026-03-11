import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { encrypt } from '../utils/encryption';
import fs from 'fs';
import path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter: adapter as any });

console.log('Controller initialized.');

const logError = (msg: string, err: any) => {
    const timestamp = new Date().toISOString();
    const logMsg = `\n[${timestamp}] ${msg}\n${err?.stack || err}\n`;
    fs.appendFileSync(path.join(process.cwd(), 'debug.log'), logMsg);
};

export const submitApplication = async (req: Request, res: Response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            loanAmount,
            ssn,
            dob,
            dlState,
            dlNumber,
            employerName,
            monthlyIncome,
            incomeFrequency,
            routingNumber,
            accountNumber,
            bankName,
            tcpaConsent,
            utmSource,
            utmMedium,
            utmCampaign,
        } = req.body;


        // 1. Create or find Borrower
        let borrower = await prisma.borrower.findUnique({
            where: { email },
        });

        if (!borrower) {
            borrower = await prisma.borrower.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                },
            });
        }

        // 2. Encrypt sensitive PII
        const encryptedSsn = encrypt(ssn);
        const encryptedDlNumber = encrypt(dlNumber);
        const encryptedAccountNum = encrypt(accountNumber);

        // 3. Create Application
        const application = await prisma.application.create({
            data: {
                borrowerId: borrower.id,
                loanAmount: Number(loanAmount),
                status: 'PENDING',
                encryptedSsn,
                encryptedDlNumber,
                encryptedAccountNum,
                dlState,
                dob,
                employerName,
                monthlyIncome: Number(monthlyIncome),
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
                        ipAddress: (req as any).ip || '0.0.0.0',
                        userAgent: (req as any).get?.('user-agent') || 'unknown',
                    },
                },
            },
            include: {
                utmTracking: true,
            },
        });

        res.status(201).json({
            success: true,
            applicationId: application.id,
            message: 'Application submitted and encrypted successfully.',
        });
    } catch (error: any) {
        console.error('Error submitting application:', error);
        logError('Submission failed', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};

export const bankLookup = async (req: Request, res: Response) => {
    const { routingNumber } = req.params;

    if (!routingNumber || routingNumber.length !== 9) {
        return res.status(400).json({ error: 'Invalid routing number' });
    }

    try {
        // In a real scenario, we'd call a service like routingnumber.direct or a bank API
        // Mocking response for demo
        const mockBanks: Record<string, string> = {
            "123456789": "JPMORGAN CHASE BANK",
            "987654321": "BANK OF AMERICA",
            "111222333": "WELLS FARGO",
        };

        const bankName = mockBanks[routingNumber as string] || "FEDERAL RESERVE BANK";

        res.json({ routingNumber, bankName });
    } catch (error) {
        res.status(500).json({ error: 'Bank lookup failed' });
    }
};
