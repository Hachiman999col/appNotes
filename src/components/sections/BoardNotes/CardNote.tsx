import {
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

const def = `Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).`;
export default function CardNote(props: {
  colums: number;
  color: string;
  title: string;
}) {
  const { colums, color, title } = props;

  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: color, height: width / colums - 40 },
      ]}
    >
      <Text style={styles.title}>
        {title.slice(0, 10) + (title.length > 10 ? '...' : '')}
      </Text>
      <Text style={styles.info}>
        {def.slice(0, 120) + (def.length > 149 ? '...' : '')}
      </Text>

      <Text style={[styles.info, styles.date]}>Hoy</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 8,
    padding: 8,

    borderRadius: 15,
    // Sombra suave (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevación (Android)
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    opacity: 0.78,
    marginBottom: 4,
  },

  info: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.78,
  },
  date: {
    opacity: 0.6,
    marginTop: 16,
  },
});
