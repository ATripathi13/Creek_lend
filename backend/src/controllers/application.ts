import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { encrypt } from '../utils/encryption';

const prisma = new PrismaClient();

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
                loanAmount,
                status: 'PENDING',
                encryptedSsn,
                encryptedDlNumber,
                encryptedAccountNum,
                dlState,
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
    } catch (error: any) {
        console.error('Error submitting application:', error);
        res.status(500).json({
            success: false,
            error: 'Inernal Server Error',
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
