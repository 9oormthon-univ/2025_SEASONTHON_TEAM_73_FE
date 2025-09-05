import { COLORS, FONT_SIZE } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageBubbleProps {
  text: string;
  isOwn: boolean;
  time: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isOwn, time }) => {
    return (
        <View
        style={[
            styles.container,
            { justifyContent: isOwn ? 'flex-end' : 'flex-start' },
        ]}
        >
        {isOwn ? (
            <>
            <Text style={styles.time}>{time}</Text>
            <View style={[styles.bubble, styles.ownBubble]}>
                <Text style={[styles.text, styles.ownText]}>{text}</Text>
            </View>
            </>
        ) : (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5 }}>
            <View style={[styles.bubble, styles.otherBubble]}>
                <Text style={[styles.text, styles.otherText]}>{text}</Text>
            </View>
            <Text style={styles.time}>{time}</Text>
            </View>
        )}
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    alignSelf: 'stretch',
  },
  bubble: {
    maxWidth: '70%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  ownBubble: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,
    backgroundColor: COLORS.primary[80],
  },
  otherBubble: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    backgroundColor: COLORS.gray[5],
  },
  text: {
    fontSize: FONT_SIZE.b2,
    lineHeight: 21,
  },
  ownText: { color: COLORS.white },
  otherText: { color: COLORS.black },
  time: {
    color: COLORS.gray[40],
    fontSize: FONT_SIZE.c1,
    lineHeight: 18,
  },
});
