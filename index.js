import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://federaciondecafeteros.org/wp/';

async function obtenerPrecioCafe() {
  const reintentosMaximos = 3;
  let intento = 0;

  while (intento < reintentosMaximos) {
    try {
      const respuesta = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });

      const $ = cheerio.load(respuesta.data);
      
      const precioInterno = limpiarPrecio($('li:has(span.name:contains("Precio interno de referencia:")) strong').text());
      const pasillaFinca = limpiarPrecio($('li:has(span.name:contains("Pasilla de finca:")) strong').text());
      const bolsaNY = limpiarPrecio($('li:has(span.name:contains("Bolsa de NY:")) strong').text());
      const tasaCambio = limpiarPrecio($('li:has(span.name:contains("Tasa de cambio:")) strong').text());
      const meCIC = limpiarPrecio($('li:has(span.name:contains("MeCIC:")) strong').text());

      if (!precioInterno || !pasillaFinca || !bolsaNY || !tasaCambio || !meCIC) {
        throw new Error('No se encontró toda la información esperada en el HTML. Verifica la estructura.');
      }

      return {
        precioInterno,
        pasillaFinca,
        bolsaNY,
        tasaCambio,
        meCIC
      };
    } catch (error) {
      intento++;
      console.error(`Error en el intento ${intento}: ${error.message}`);
      if (intento >= reintentosMaximos) {
        throw new Error('No se pudo obtener el precio después de varios intentos.');
      }
    }
  }
}

function limpiarPrecio(texto) {
  const regex = /([^\d,]*(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)[^\d,]*)/;
  const resultado = texto.match(regex);
  return resultado ? resultado[2] : texto.trim();
}

export default obtenerPrecioCafe;