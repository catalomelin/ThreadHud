# Textile CRM (Expo, React Native)
Pequeño CRM para una empresa textil hecho con **React Native (Expo)**.  
Login "quemado": usuario `admin` / contraseña `admin123`.  
Base de datos embebida en el código en `data/db.js`.

## Requisitos
- Node.js (v16+)
- npm
- Expo CLI (`npm install -g expo-cli`) opcional si usas `npx expo` 

## Instalación
1. `cd textile-crm-expo`
2. `npm install`
3. `npx expo start` (o `expo start` si tienes CLI global)

## Estructura principal
- App.js - punto de entrada con navegación
- screens/ - pantallas: Login, Home, Inventory, Sales
- data/db.js - "base de datos" en memoria (JSON)
- components/ - componentes reutilizables

Puedes subir esta carpeta a GitHub directamente.

