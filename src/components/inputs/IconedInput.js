import {View} from 'react-native';

export const IconedInput = ({icon, children}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 50,
      }}>
      {icon}
      <View style={{flex: 1}}>{children}</View>
    </View>
  );
};
