import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query;
    if (!slug) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    const data = await prisma.shortLink.findUnique({
        where: {
            slug: slug as string
        }
    })
    if (!data) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    res.redirect(data.url);
}
export default Handler;
