import {
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useContext } from 'react';
import { getCardColor } from '../../../styles/theme';
import { formatRelativeDate } from '../../../core/utils/date';
import { RouterContext } from '../../../context/routerContext';
import { GeneralContext } from '../../../context/generalContext';
import { palette, tokens } from '../../../styles/theme';

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

  const colorData = getCardColor(color);
  const realTime = formatRelativeDate(time);

  const rHeight = width / colums - 40;
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: palette.bg.surface,
          borderLeftColor: colorData.main,
          height: width / colums - 40,
        },
      ]}
      onPress={() => {
        setIdNoteDb(id);
        navigate('note');
      }}
    >
      <Text style={[styles.title, { color: palette.text.primary }]}>
        {title.slice(0, 10) + (title.length > 10 ? '...' : '')}
      </Text>
      <Text
        style={[
          styles.info,
          {
            height: rHeight - 90,
            color: palette.text.secondary,
          },
        ]}
        numberOfLines={Math.floor((rHeight - 90) / 20)}
        ellipsizeMode="tail"
      >
        {content}
      </Text>

      <Text style={[styles.info, styles.date, { color: colorData.main }]}>
        {realTime}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: tokens.spacing.sm,
    padding: tokens.spacing.sm,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: palette.border.DEFAULT,
    // Sombra sutil (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevación (Android)
    elevation: 3,
  },
  title: {
    fontSize: tokens.typography.size.lg,
    fontWeight: tokens.typography.weight.semibold,
    marginBottom: tokens.spacing.xs,
  },

  info: {
    fontSize: tokens.typography.size.sm,
    fontWeight: tokens.typography.weight.medium,
  },
  date: {
    marginTop: tokens.spacing.md,
    fontSize: tokens.typography.size.xs,
    fontWeight: tokens.typography.weight.semibold,
    opacity: 0.9,
  },
});
