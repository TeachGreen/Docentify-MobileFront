import { FontAwesome6 } from '@expo/vector-icons';
//import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

const MAPPING = {
  //Tabs icon mapping
  'house': 'house',
  'book-open': 'book-open',
  'ranking-star': 'ranking-star',
  'user-large': 'user-large',

  //Menu icon mapping
  'gear': 'gear',
  'bell': 'bell',
  'arrow-left': 'arrow-left',
  'arrow-right': 'arrow-right',
  'ellipsis-vertical': 'ellipsis-vertical',
  'magnifying-glass': 'magnifying-glass',

  //Input icon mapping
  'eye': 'eye',
  'eye-slash': 'eye-slash',

  //Various icon mapping
  'heart': 'heart',
  'message': 'message',
  'hourglass': 'hourglass',
  'image': 'image',
  'book-bookmark': 'book-bookmark',
  'chart-pie': 'chart-pie',
  'door-open': 'door-open',
  'circle-exclamation': 'circle-exclamation',
  'key': 'key',
  'video': 'video',
  'shield': 'shield',
  'pen-to-square': 'pen-to-square',
  'filter': 'filter',

  //Rate app icon mapping
  'face-frown': 'face-frown',
  'face-meh': 'face-meh',
  'face-smile': 'face-smile',
  'face-grin-hearts': 'face-grin-hearts'
  
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof FontAwesome6>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  iconStyle,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  iconStyle?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return <FontAwesome6 color={color} size={size} name={MAPPING[name]} iconStyle={iconStyle} />;
}
