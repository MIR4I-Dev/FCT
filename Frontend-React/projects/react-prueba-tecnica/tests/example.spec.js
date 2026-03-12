import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173/'
const CAT_IMAGE_ENDPOINT = 'https://cataas.com'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  // 1. Localizamos los elementos (sin extraer el texto aún)
  const text = page.getByRole('paragraph');
  const image = page.getByRole('img');

  // 2. Aserciones web-first: Playwright esperará a que aparezcan
  await expect(text).not.toBeEmpty(); // Espera a que el párrafo tenga texto
  await expect(image).toBeVisible();  // Espera a que la imagen se renderice

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute('src');

  // Comprobamos la URL de la imagen
  expect(imageSrc?.startsWith(CAT_IMAGE_ENDPOINT)).toBeTruthy();

  // 3. Probamos el cambio al hacer clic
  await page.getByRole('button').click();

  // ... después del clic

  // 1. Verificamos que el TEXTO cambie (esto ya lo tienes y suele funcionar bien)
  await expect(text).not.toHaveText(textContent || '');

  // 2. Verificamos que el SRC de la imagen cambie
  // Playwright se quedará esperando (reintentando) hasta que el atributo 'src' 
  // sea distinto al que guardamos al principio.
  await expect(image).not.toHaveAttribute('src', imageSrc || '');
});