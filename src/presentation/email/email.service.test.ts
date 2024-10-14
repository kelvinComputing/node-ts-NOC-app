import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from "./email.service";

describe('emailService.ts', () => { 

    const mockSendMail = jest.fn();

    //Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    test('should send email', async() => { 


        const options: SendMailOptions = {
            to: 'kelvincontrera1@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        }

        const emailSent = await emailService.sendEmail(options)

        expect(emailSent).toBe(true);

        expect( mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "kelvincontrera1@gmail.com",
        })
    })

    test('should send email with attachements', async() => { 

        const email = 'kelvincontrera1@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ])
        })
     })
 })