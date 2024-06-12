# meat-0235

Welcome...

<hr>

## Deploy with docker

1. Copy all environment variables from `.env.example` files in `client` and `backend` to `.env` files

2. ```npm run deploy``` (docker-compose needed)
3. Enjoy! - http://localhost:4001 (client) + http://localhost:4000 (backend)
<hr>

## backend (Express.js + Typescript)
Install deps
```bash
npm i 
```

Run dev
``` bash
npm run dev
```

Run prod
``` bash
npm run prod
```
<hr>

## client (Nuxt3 + TaiwldindCSS + DaisyUI)

Install deps
```bash
npm i 
```

Run dev
```bash
npm run dev
```

Run prod
```
npm run build && npm run preview
```