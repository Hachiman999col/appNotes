import {
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useContext } from 'react';
import { getColor } from '../../../styles/color';
import { formatRelativeDate } from '../../../core/utils/date';
import { RouterContext } from '../../../context/routerContext';
import { GeneralContext } from '../../../context/generalContext';

export default function CardNote(props: {
  id: number;
  colums: number;
  color: string;
  content: string;
  title: string;
  time: string;
}) {
  const { colums, color, content, title, time, id } = props;
  const { navigate } = useContext(RouterContext);
  const { setIdNoteDb } = useContext(GeneralContext);
  const { width } = useWindowDimensions();

  const realColor = getColor(color).main;
  const realTime = formatRelativeDate(time);

  const rHeight = width / colums - 40;
  return (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: realColor, height: width / colums - 40 },
      ]}
      onPress={() => {
        setIdNoteDb(id);
        navigate('note');
      }}
    >
      <Text style={styles.title}>
        {title.slice(0, 10) + (title.length > 10 ? '...' : '')}
      </Text>
      <Text
        style={[
          styles.info,
          {
            height: rHeight - 90,
          },
        ]}
        numberOfLines={Math.floor((rHeight - 90) / 20)}
        ellipsizeMode="tail"
      >
        {content}
      </Text>

      <Text style={[styles.info, styles.date]}>{realTime}</Text>
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
