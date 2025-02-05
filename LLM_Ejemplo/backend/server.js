/*
require('dotenv').config();
const express = require('express');
//const fetch = require('node-fetch');
import fetch from 'node-fetch';
const cors = require('cors');
*/


import 'dotenv/config';  // Cargar variables de entorno
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const apiKey = process.env.OPENAI_API_KEY; // Usa una variable de entorno para la API Key

app.post('/api/chatgpt', async (req, res) => {
    try {
        const { mensaje } = req.body;

        console.log("Mensaje recibido:", mensaje); // Para ver qué mensaje está llegando
        console.log("API Key:", apiKey);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: "user", content: mensaje }],
                max_tokens: 100,
                temperature: 0.7
            })
        });

        // Si la respuesta no es correcta, muestra el código de error
        if (!response.ok) {
            const errorText = await response.text();
            console.log("Error en la respuesta de OpenAI:", errorText);  // Log del error de OpenAI
            throw new Error("Error en la solicitud a OpenAI");
        }

        const data = await response.json();
        console.log("Respuesta de OpenAI:", data); // Log de la respuesta de OpenAI

        res.json(data);
    } catch (error) {
        console.log("Error en la solicitud al backend:", error);  // Log del error general
        res.status(500).json({ error: "Error al llamar a OpenAI" });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));


import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
    store: true,
});

console.log(completion.choices[0].message);