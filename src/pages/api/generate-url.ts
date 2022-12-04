import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import chromium from 'chrome-aws-lambda';
import { UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';
const cloudinary = require('cloudinary').v2;
console.log(cloudinary.config())
const uploadImage = async (image: Buffer): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                upload_preset: 'lshorten',
            },
            (error: Error, result: UploadApiResponse) => {
                if (result) resolve(result);
                else reject(error);
            },
        );
        streamifier.createReadStream(image).pipe(uploadStream);
    });
}
const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
];
async function generateScreenshotAndTitle(url: string) {
    const executablePath = await chromium.executablePath;
    console.log(executablePath);
    if (!executablePath) {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({
            args: minimal_args,
            headless: true,
            ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });
        await page.goto(url);
        const screenshot = await page.screenshot({ type: 'jpeg', quality: 100 });
        const title = await page.title();
        await browser.close();
        return { screenshot, title };
    }
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url);
    const screenshot = await page.screenshot({ type: 'jpeg', quality: 100 });
    const title = await page.title();
    await browser.close();
    return { screenshot, title };

}

const prisma = new PrismaClient()
const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ message: "Bad request" });
        return;
    }
    const randomSlug = Math.random().toString(6).substring(2, 4) + Math.random().toString(6).substring(2, 4);
    const { screenshot, title } = await generateScreenshotAndTitle(url);
    const image = await uploadImage(screenshot);
    const data = await prisma.shortLink.create({
        data: {
            slug: randomSlug,
            url,
            screenshot: image.secure_url,
            title,
        }
    })
    res.status(200).json({ slug: data.slug });
}

export default Handler;