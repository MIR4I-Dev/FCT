📚 El Reto: Buscador de Libros "OpenLib"
Vas a crear una mini-app que busque libros usando la API pública gratuita de Open Library.
Endpoint a usar: <https://openlibrary.org/search.json?title=el_señor_de_los_anillos>

Tus Objetivos Técnicos:

1. El Input y el Debouncer (useEffect, useRef)

Crea un input de texto.

Usa un useRef para hacer que el input se enfoque automáticamente (autofocus) nada más cargar la página.

Implementa tu lógica de debounce: el estado de la búsqueda solo debe actualizarse cuando el usuario deje de escribir durante al menos 500ms.

1. El Custom Hook (useBooks)

Crea un hook useBooks({ search }) que encapsule toda la lógica del fetching.

Debe devolver tres cosas: books (el array de resultados), loading (boolean) y error (string o null).

Truco de la vida real: Usa un useRef dentro del hook para guardar la última búsqueda realizada. Si el usuario borra una letra y la vuelve a escribir rápido (buscando exactamente lo mismo de nuevo), no hagas una nueva petición a la API.

1. Renderizado Condicional

Muestra un texto de "Cargando..." mientras la petición esté en vuelo.

Muestra un mensaje rojo de "Error" si la petición falla.

Muestra "No se encontraron libros" si la API devuelve un array vacío pero la búsqueda ya terminó.

Si hay resultados, renderiza una lista sencilla con el title, el author_name (suele ser un array, coge el primer elemento) y el first_publish_year.

1. Optimización (useMemo, useCallback)

Añade un botón de "Ordenar por año más antiguo".

Usa useCallback para la función que maneja el clic de ordenar, asegurando que no se re-cree en cada renderizado de la app.

Usa useMemo para la lista de libros renderizada. La lista de libros solo debe volver a ordenarse y calcularse si cambia el array original de la API o si cambia el estado del botón de "ordenar".

1. El Test End-to-End (Playwright)
Escribe un test muy sencillo (un solo archivo search.spec.js) que:

Abra la página.

Escriba "Harry Potter" en el input.

Espere a que desaparezca el texto "Cargando...".

Verifique que hay al menos un elemento en la lista de resultados.
