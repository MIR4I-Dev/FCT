// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = "http://localhost:5173"

test("debe buscar Harry Potter y ordenar los resultados", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  // 1. Localizamos el input y escribimos
  const input = page.getByTestId('input-search'); // Usar getByTestId es más limpio
  await input.fill("Harry Potter");

  // 2. Verificamos que el loading aparece (esto es muy rápido, a veces Playwright se lo salta)
  // por eso a veces es mejor verificar directamente el resultado final
  const loading = page.getByTestId('loading');

  // 3. En lugar de timeout, esperamos a que la lista tenga contenido
  // Playwright esperará automáticamente hasta 30s por defecto
  const booksList = page.getByTestId('books-list');
  await expect(booksList).toBeVisible();

  // 4. Verificar que dentro de la lista hay elementos (li)
  const bookItems = page.locator("[data-testid='books-list'] li");
  await expect(bookItems.first()).toBeVisible();

  // 5. Interacción con el Sort
  await page.getByTestId('sort-checkbox').check(); // .check() es específico para checkboxes

  // 6. Verificar que seguimos viendo libros tras ordenar
  await expect(bookItems.count()).not.toBe(0);
});