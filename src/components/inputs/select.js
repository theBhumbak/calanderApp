import {Text, TouchableOpacity, View} from 'react-native';
import {s} from 'react-native-size-matters';

const categoryColorMap = {
  Health: 'green',
  Office: 'orange',
  Home: 'blue',
};

export const Select = ({
  data = [
    {label: 'Health', value: 'Health'},
    {label: 'Office', value: 'Office'},
    {label: 'Home', value: 'Home'},
  ],
  value,
  editable = true,
  onChangeValue,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: s(8),
      }}>
      {data.map(item => {
        const isActive = value === item.value;
        return (
          <TouchableOpacity
            key={item.value}
            disabled={!editable}
            onPress={() => {
              editable && onChangeValue(item.value);
            }}
            style={{
              borderColor: isActive ? 'black' : 'transparent',
              paddingVertical: s(4),
              paddingHorizontal: s(8),
              borderWidth: s(2),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: categoryColorMap[item.value],
            }}>
            <Text style={{color: 'black'}}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
