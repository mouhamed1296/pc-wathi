import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function POST(req: Request) {
    
    try {
        await client.connect();
        const db = client.db("wathi_pc_management");
        const collection = db.collection("pcs");

        const data = await req.json();

        const findPc = await collection.findOne({ serialNumber: data.serialNumber });

        if (findPc) {
            if (findPc.status === "In Use") {
                return new Response(JSON.stringify({ success: false, message: "PC déjà en cours d'utilisation" }), {
                    headers: { "Content-Type": "application/json" },
                });
            }
        }

        const result = await collection.insertOne(data);
        return new Response(JSON.stringify({ success: true, data: result }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, message: "Failed to save data." }), {
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        await client.close();
    }
}

export async function GET() {
    try {
        await client.connect();
        const db = client.db("wathi_pc_management");
        const pcs = await db.collection("pcs").find({}).toArray();
        return new Response(JSON.stringify({ pcs }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch PCs" }), {
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        await client.close();
    }
}

export async function PUT(req: Request) {
    try {
        await client.connect();
        const db = client.db("wathi_pc_management");
        const collection = db.collection("pcs");

        const data = await req.json();
        
        delete data._id;

        const result = await collection.updateOne({ serialNumber: data.serialNumber }, { $set: data });
        return new Response(JSON.stringify({ success: true, data: result }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, message: "Failed to update data." }), {
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        await client.close();
    }
}
