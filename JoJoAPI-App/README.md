# ✨ JoJo Stats Application

Un proyecto fullstack diseñado para visualizar las estadísticas de los Stands de *JoJo's Bizarre Adventure* de forma estética, clara y moderna. A diferencia de las wikis tradicionales, este proyecto prioriza la experiencia visual y la legibilidad de los atributos de cada Stand.

## 🚀 Características Principales

### 📊 Visualización de Stands

- **Catálogo Inicial**: Muestra a los protagonistas y antagonistas de cada parte de la serie.
- **Información Detallada**: Cada tarjeta incluye nombre, usuario, descripción, parte de origen y un panel visual de estadísticas (Power, Speed, Range, etc.).
- **Diseño Estético**: Interfaz optimizada para evitar tablas confusas, facilitando la lectura de los "Stand Stats".

### 🔍 Filtros y Navegación

- **Filtrado por Partes**: Selector para segmentar Stands según las partes animadas de la historia (por ahora) (desde Stardust Crusaders hasta Stone Ocean).
- **Búsqueda en Tiempo Real**: Input de texto para localizar Stands por nombre.
- **Ordenación Dinámica**: Checkbox para alternar entre orden ascendente y descendente.
- **Paginación numérica**: Paginación para una navegación sin interrupciones.

### 🔐 Sistema de Usuarios y Feedback

- **Autenticación Híbrida**:
  - Registro e inicio de sesión local (User/Password).
  - Integración con **Google OAuth2** para un acceso rápido.
- **Sugerencias**: Los usuarios autenticados pueden enviar propuestas de mejora para la plataforma.

## 🛠️ Stack Tecnológico

- **Frontend**: [React](https://reactjs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Base de Datos**: [MySQL](https://www.mysql.com/)
- **Autenticación**: [Passport.js](https://www.passportjs.org/) (Google Strategy) + [JWT](https://jwt.io/) (Access & Refresh Tokens)

## 🗄️ Estructura de la Base de Datos

El sistema cuenta actualmente con tres tablas principales:

1. `stands`: Almacena la información técnica, descriptiva y estadística de cada entidad.
2. `users`: Gestiona los perfiles locales y vinculados mediante Google.
3. `submissions`: Recopila las sugerencias enviadas por la comunidad.

## 🎨 Valor Añadido

El corazón de este proyecto es la **estética**. Mientras que otros sitios utilizan tablas de datos densas, este proyecto transforma esos datos en componentes visuales intuitivos, permitiendo que cualquier fan de JoJo identifique el potencial de un Stand de un solo vistazo.

---
Producido con el poder de un Stand de tipo **Fullstack**.
