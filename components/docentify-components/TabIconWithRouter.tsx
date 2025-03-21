import React from 'react';
import { useRouter } from 'expo-router';  // Importando o hook useRouter
import { IconSymbol } from '@/components/ui/IconSymbol';  // Seu componente de ícone
import { SFSymbols6_0 } from 'sf-symbols-typescript';

interface TabIconWithRouterProps {
  name: SFSymbols6_0;
  size: number;
  color: string;
}

const TabIconWithRouter: React.FC<TabIconWithRouterProps> = ({ name, size, color }) => {
  const router = useRouter();  // Hook useRouter usado corretamente aqui

  return (
    <IconSymbol
      name={name}
      size={size}
      color={color}
      onPress={() => router.push('../../app/(tabs)/index')}  // Navegação quando o ícone for pressionado
    />
  );
};

export default TabIconWithRouter;
