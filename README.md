# Acertijos

Juego web de acertijos. El administrador carga acertijos y los usuarios intentan adivinar la respuesta.

## Cómo desplegar en Vercel

### 1. Crear base de datos en Neon (gratis)

1. Creá una cuenta en [neon.tech](https://neon.tech)
2. Creá un nuevo proyecto
3. En el dashboard, copiá las dos URLs de conexión:
   - **Pooled connection** (tiene `-pooler` en el hostname) → será tu `DATABASE_URL`
   - **Direct connection** (sin `-pooler`) → será tu `DIRECT_URL`

### 2. Subir el código a GitHub

```bash
git init
git add .
git commit -m "initial commit"
# Creá un repo en GitHub y luego:
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### 3. Desplegar en Vercel

1. Entrá a [vercel.com](https://vercel.com) → **New Project** → importá tu repo de GitHub
2. En **Environment Variables**, agregá estas 5 variables:

   | Variable | Valor |
   |---|---|
   | `DATABASE_URL` | Tu Neon pooled connection string |
   | `DIRECT_URL` | Tu Neon direct connection string |
   | `ADMIN_USERNAME` | El usuario administrador que elijas |
   | `ADMIN_PASSWORD` | Una contraseña segura |
   | `SESSION_SECRET` | Una cadena aleatoria de 32+ caracteres (ver abajo) |

3. En **Build Command**, reemplazá el comando por:
   ```
   prisma db push && next build
   ```
   Esto aplica el esquema de base de datos en cada deploy.

4. Hacé click en **Deploy**.

### Generar SESSION_SECRET

Ejecutá esto en tu terminal:
```bash
openssl rand -hex 32
```
Copiá el resultado como valor de `SESSION_SECRET`.

---

## Uso

### Administrador

1. Visitá `https://tu-app.vercel.app/admin/login`
2. Ingresá con las credenciales que configuraste en las variables de entorno
3. Desde el panel podés:
   - **Crear** un acertijo (pregunta + palabra respuesta)
   - **Actualizar** el acertijo existente
   - **Eliminar** el acertijo actual

Solo puede existir un acertijo a la vez.

### Jugadores

1. Visitán `https://tu-app.vercel.app`
2. Leen el acertijo e intentan la palabra respuesta
3. La comparación ignora mayúsculas/minúsculas
4. Al acertar aparece el mensaje de felicitación

---

## Desarrollo local

```bash
# 1. Cloná el repo
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO

# 2. Instalá dependencias
npm install

# 3. Configurá variables de entorno
cp .env.example .env.local
# Editá .env.local con tus valores reales

# 4. Aplicá el esquema a la base de datos
npx prisma db push

# 5. Corré el servidor de desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.
