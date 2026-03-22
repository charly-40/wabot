# 🤖 WABot — WhatsApp Bot Modular con IA

Bot de WhatsApp desarrollado en Node.js usando Baileys, diseñado con arquitectura modular, sistema de comandos dinámico y herramientas avanzadas como generación de prompts e imágenes.

---

## 🚀 Características

* 📦 Arquitectura modular por comandos (`/commands`)
* 🧠 Generador de prompts IA (general, técnico, creativo)
* 🎮 Juegos integrados (impostor, verdad, reto, etc.)
* 🛡️ Sistema de moderación automática con warns persistentes
* 🧾 Sistema de menú dinámico por categorías
* 🖼️ Generador de imágenes (`!img`, `!img pro`)
* 👋 Sistema de saludos automáticos con cooldown
* ⚙️ Preparado para uso con PM2

---

## 📁 Estructura del proyecto

```
wabot/
├── commands/        # Comandos del bot
├── config/          # Configuraciones
├── data/            # Templates y datos persistentes
├── handler/         # Lógica principal
├── index.js         # Entrada principal
├── package.json
```

---

## ⚙️ Instalación

### 1. Clonar repositorio

```
git clone https://github.com/charly-40/wabot.git
cd wabot
```

---

### 2. Instalar dependencias

```
npm install
```

---

### 3. Ejecutar el bot

```
node index.js
```

---

## 📌 Requisitos

* Node.js (versión 18 o superior recomendada)
* Conexión a internet
* WhatsA
