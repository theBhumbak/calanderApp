import {useForm} from '../../hooks/useFrom';
import {IconedInput, Select} from '../../components/inputs';
import {TextInput} from 'react-native-gesture-handler';
import {Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {s} from 'react-native-size-matters';
import {DatePicker} from '../../components/inputs/datePicker';

export const TaskDetail = ({route = {}}) => {
  const {
    startDate,
    title = '',
    endDate,
    description = '',
  } = route?.params || {};
  const {onChangeValue, onSubmit, formState} = useForm({
    defaultValues: {
      startDate: startDate ? startDate : new Date(),
      title: title,
      endDate: endDate ? endDate : moment(startDate).add(1, 'h').toDate(),
      category: 'Health',
      description,
    },
  });

  return (
    <View style={{flex: 1, margin: 20, justifyContent: 'space-between'}}>
      <View style={{}}>
        <IconedInput icon={<Text>1</Text>}>
          <TextInput
            style={{height: 40}}
            value={formState.title}
            placeholder="Title"
            onChangeText={value => {
              onChangeValue({
                field: 'title',
                value,
              });
            }}
          />
        </IconedInput>
        <IconedInput icon={<Text>2</Text>}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 8,
            }}>
            <DatePicker
              value={formState.startDate}
              mode="date"
              onChangeValue={value => {
                let endDate = new Date(formState?.endDate);
                endDate.setDate(value.getDate());
                endDate.setMonth(value.getMonth());
                endDate.setFullYear(value.getFullYear());
                onChangeValue({
                  values: {
                    startDate: value,
                    endDate,
                  },
                });
              }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <DatePicker
                mode="time"
                value={formState.startDate}
                onChangeValue={value => {
                  onChangeValue({field: 'startDate', value});
                }}
              />
              <DatePicker
                mode="time"
                value={formState.endDate}
                onChangeValue={value => {
                  onChangeValue({field: 'endDate', value});
                }}
              />
            </View>
          </View>
        </IconedInput>
        <Select
          onChangeValue={value => {
            onChangeValue({field: 'category', value});
          }}
          value={formState.label}
        />
        <IconedInput icon={<Text>3</Text>}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text
              style={{
                color: 'grey',
              }}>
              Select
            </Text>
            <View
              style={{backgroundColor: '#f6f6f6', padding: 4, borderRadius: 4}}>
              <Text>{formState.label}</Text>
            </View>
          </TouchableOpacity>
        </IconedInput>
        <IconedInput icon={<Text>4</Text>}>
          <TextInput
            style={{height: 40}}
            value={formState.description}
            placeholder="Description"
            onChangeText={value => {
              onChangeValue({
                field: 'description',
                value,
              });
            }}
          />
        </IconedInput>
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        style={{
          paddingVertical: s(15),
          backgroundColor: 'lightblue',
          borderRadius: s(10),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
