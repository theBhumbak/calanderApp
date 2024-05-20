import {Text, TouchableOpacity, View} from 'react-native';

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
  onChangeValue,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
      }}>
      {data.map(item => {
        const isActive = value === item.value;
        return (
          <TouchableOpacity
            key={item.value}
            onPress={() => {
              onChangeValue(item.value);
            }}
            style={{
              borderColor: isActive ? 'black' : 'transparent',
              borderRadius: 8,
              padding: 4,
              borderWidth: 2,
              backgroundColor: categoryColorMap[item.value],
            }}>
            <Text style={{color: 'white'}}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
