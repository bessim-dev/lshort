import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body)
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

    const data = await prisma.shortLink.create({
        data: {
            slug: randomSlug,
            url
        }
    })
    res.status(200).json(data);

}
export default Handler;