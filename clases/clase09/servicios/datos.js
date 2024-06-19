import { MongoClient } from 'mongodb';
// const uri = "mongodb+srv://adibattista:pasa2024@tup.3qnmgei.mongodb.net/?retryWrites=true&w=majority&appName=tup"
const uri = "mongodb://localhost:27017";

let cliente = null;
let contactos = null;

export default class Datos {

    static async conectar() {
        if (contactos) return;

        cliente = new MongoClient(uri);
        await cliente.connect();
        contactos = cliente.db("tup").collection("contactos");
    }

    static async readAll() {
        await Datos.conectar();
        return await contactos.find().toArray();
    }

    static async create(data) {
        await Datos.conectar();
        let resultado = await contactos.insertOne(data);
        return {...data, _id: resultado.insertedId}
    }

    static async read(id) {
        await Datos.conectar();
        return await contactos.findOne({ _id: id });
    }

    static async update(id, data) {
        await Datos.conectar();
        return await contactos.updateOne(
            { _id: id },
            { $set: data });
    }

    static async delete(id) {
        await Datos.conectar();
        return await contactos.deleteOne({ _id: id });
    }

    static async deleteAll() {
        await Datos.conectar();
        return await contactos.deleteMany({});
    }

    static async close() {
        await cliente.close();
        cliente   = null 
        contactos = null
    }

    static async getEdad(edad) {
        return contactos.find({ edad: edad }).toArray();
    }
}

